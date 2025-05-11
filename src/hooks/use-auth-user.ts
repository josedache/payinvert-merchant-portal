import { useStoreSelector } from "./use-store-selector";

function useAuthUser() {
  return useStoreSelector((state) => state.global.authUser);
}

export default useAuthUser;
