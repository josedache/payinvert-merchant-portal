import { configureStore } from "@reduxjs/toolkit";
import * as globalStore from "./store-slice";
import { baseApi } from "./store-query";
import { setupListeners } from "@reduxjs/toolkit/query";
import { isEmpty } from "utils/object/is-empty.ts";
import { mergeDeep } from "utils/object/merge-deep";
import { logout, refresh } from "./store-actions";
import { throttle } from "utils/function/throttle";
import * as tags from "constants/tags";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [globalStore.slice.reducerPath]: globalStore.slice.reducer,
  },
  preloadedState: loadState({
    [globalStore.slice.name]: globalStore.initialState,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      rtkqOnResetMiddleware(baseApi)
    ),
});

export default store;

setupListeners(store.dispatch);

store.subscribe(
  throttle(() => {
    const state = store.getState();
    saveState({
      [globalStore.slice.name]: globalStore.getStorageState(
        state[globalStore.slice.name]
      ),
    });
  }, 1000)
);

function saveState(state: Partial<{ [K in keyof StoreState]: any }>) {
  try {
    localStorage.setItem("@state", JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
}

function loadState(initialState = {}) {
  try {
    const newState = Object.assign({}, initialState);
    const storageState = getStorageState();
    if (storageState && !isEmpty(storageState)) {
      Object.assign(newState, mergeDeep(newState, storageState));
    }
    return newState;
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

function getStorageState() {
  const state = localStorage.getItem("@state");
  if (state) {
    return JSON.parse(state);
  }
  return null;
}

export function rtkqOnResetMiddleware(...apis: any[]): any {
  return (store: Store) => (next: StoreDispatch) => (action: any) => {
    const result = next(action);
    if (logout.match(action)) {
      for (const api of apis) {
        store.dispatch(api.util.resetApiState());
      }

      localStorage.clear();
      window?.postMessage?.({ type: "LOGOUT" }, window.location.origin);
    }
    if (refresh.match(action)) {
      for (const api of apis) {
        store.dispatch(api.util.invalidateTags(Object.values(tags)));
      }
    }
    return result;
  };
}

export type Store = typeof store;
export type StoreState = ReturnType<Store["getState"]>;
export type StoreDispatch = Store["dispatch"];
