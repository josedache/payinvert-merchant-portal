import { Provider } from "react-redux";
import store from "configs/store";

/**
 *
 * @param {ReduxStoreProviderProps} props
 * @returns
 */
export function ReduxStoreProvider(props) {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
}

export default ReduxStoreProvider;

/**
 * @typedef {{ children: import("react").ReactNode }} ReduxStoreProviderProps
 */
