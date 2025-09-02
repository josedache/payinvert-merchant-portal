import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  API_BASE_URL,
  SUPPORT_API_BASE_URL,
  SUPPORT_API_KEY,
} from "constants/env";
import * as tags from "constants/tags";
import store from "./store";
import { logout } from "./store-actions";
import { InitialState } from "configs/store-slice";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    prepareHeaders(headers, { getState }) {
      headers = new Headers(headers);

      const { authUser } = ((getState() as any)?.global ?? {}) as InitialState;

      const { accessToken, authSession } = authUser?.token ?? {};

      if (accessToken && authSession) {
        headers.set("Authorization", `Bearer ${accessToken}`);
        headers.set("Auth-Session", authSession);
      }

      headers.set("ngrok-skip-browser-warning", "true");

      return headers;
    },
    fetchFn: async (...arg) => {
      const response = await fetch(...arg);

      if (response.status == 401) {
        store.dispatch(logout());
        window.location.reload();
      }

      return response;
    },
  }),
  endpoints: () => ({}),
}).enhanceEndpoints({ addTagTypes: Object.values(tags) });

export const supportApi = createApi({
  reducerPath: "support",
  baseQuery: customFetchBaseQuery({
    baseUrl: `${SUPPORT_API_BASE_URL}/api`,
    prepareHeaders(headers) {
      headers = new Headers(headers);

      if (SUPPORT_API_KEY) {
        headers.set("x-api-key", `${SUPPORT_API_KEY}`);
      }

      headers.set("ngrok-skip-browser-warning", "true");

      return headers;
    },
    // fetchFn: async (...arg) => {
    //   const response = await fetch(...arg);
    //   return response;
    // },
  }),
  endpoints: () => ({}),
}).enhanceEndpoints({ addTagTypes: Object.values(tags) });

function customFetchBaseQuery({
  prepareArgs = (args) => args,
  ...baseArg
}: CustomFetchBaseQueryOptions) {
  const fetchQuery = fetchBaseQuery(baseArg);

  return (async (args, api, extraOptions) => {
    const newArgs = await prepareArgs(
      ((args) => {
        return {
          ...args,
          headers: args.headers ?? new Headers(baseArg?.headers),
        };
      })(typeof args == "string" ? { url: args } : args),
      api,
      extraOptions
    );
    return await fetchQuery(newArgs, api, extraOptions);
  }) as typeof fetchQuery;
}

type CustomFetchBaseQueryOptions = {
  prepareArgs?: (
    args: FetchArgs,
    api: BaseQueryApi,
    extraOptions: any
  ) => MaybePromise<FetchArgs>;
} & Parameters<typeof fetchBaseQuery>[0];

type MaybePromise<T> = T | PromiseLike<T>;
