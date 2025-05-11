import { useStore as useRStore } from "react-redux";
import { Store } from "configs/store";

export const useStore = useRStore as () => Store;

export default useStore;
