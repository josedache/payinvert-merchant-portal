import { baseApi } from "configs/store-query.ts";
import { COLLECTION_ACCOUNT } from "constants/tags.ts";
import {
  CollectionAccountCreateApiRequest,
  CollectionAccountCreateApiResponse,
  CollectionAccountListApiRequest,
  CollectionAccountListApiResponse,
} from "types/collection-account-api.ts";

export const BASE_URL = "/collection-account";

export const collectionAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollectionAccountsBusiness: builder.query<
      CollectionAccountListApiResponse,
      CollectionAccountListApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/business/`,
        ...config,
      }),
      providesTags: [COLLECTION_ACCOUNT],
    }),
    createCollectionAccountBusiness: builder.mutation<
      CollectionAccountCreateApiResponse,
      CollectionAccountCreateApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/business/`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [COLLECTION_ACCOUNT],
    }),
    createCollectionAccount: builder.mutation<
      CollectionAccountCreateApiResponse,
      CollectionAccountCreateApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [COLLECTION_ACCOUNT],
    }),
  }),
});
