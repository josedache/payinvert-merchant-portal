import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreState } from "configs/store";

export const useStoreSelector = useSelector as TypedUseSelectorHook<StoreState>;

export default useStoreSelector;
