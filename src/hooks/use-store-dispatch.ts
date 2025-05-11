import { useDispatch } from "react-redux";
import { StoreDispatch } from "configs/store";

export const useStoreDispatch = useDispatch as () => StoreDispatch;

export default useStoreDispatch;
