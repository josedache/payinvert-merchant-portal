import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "constants/env";
import * as tags from "constants/tags";
import store from "./store";
import { logout } from "./store-actions";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customFetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    prepareHeaders(headers, { getState }) {
      headers = new Headers(headers);

      const { authUser } = (getState() as any)?.global ?? {};

      const token = authUser?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
