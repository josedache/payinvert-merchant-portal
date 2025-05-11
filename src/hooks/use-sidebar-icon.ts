import { slice } from "configs/store-slice";
import { useStoreSelector } from "./use-store-selector";
import { useStoreDispatch } from "./use-store-dispatch";

function useSidebarIcon() {
  const dispatch = useStoreDispatch();
  const isOpen = useStoreSelector((state) => state.global.isIconSidebar);

  function toggle(payload?: boolean) {
    dispatch(
      slice.actions.toggleIconSidebar(
        typeof payload === "boolean" ? payload : undefined
      )
    );
  }

  function set(payload: boolean) {
    dispatch(slice.actions.toggleIconSidebar(payload));
  }

  return { isOpen, toggle, set };
}

export default useSidebarIcon;
