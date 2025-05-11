import { slice } from "configs/store-slice";
import { useStoreSelector } from "./use-store-selector";
import { useStoreDispatch } from "./use-store-dispatch";

function useSideNavigation() {
  const dispatch = useStoreDispatch();
  const isOpen = useStoreSelector((state) => state.global.isSideNavigation);

  function toggle(payload?: boolean) {
    dispatch(
      slice.actions.toggleSideNavigation(
        typeof payload === "boolean" ? payload : undefined
      )
    );
  }

  function set(payload: boolean) {
    dispatch(slice.actions.toggleSideNavigation(payload));
  }

  return { isOpen, toggle, set };
}

export default useSideNavigation;
