import { baseApi } from "configs/store-query.ts";
import { TRANSACTION, WALLET } from "constants/tags.ts";
import {
  WalletTransactionListApiRequest,
  WalletTransactionListApiResponse,
} from "types/wallet-api.ts";

export const BASE_URL = "/subsidiary/dashboard/wallet";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWalletTransactions: builder.query<
      WalletTransactionListApiResponse,
      WalletTransactionListApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/transactions`,
        ...config,
      }),
      providesTags: [WALLET, TRANSACTION],
    }),
  }),
});
