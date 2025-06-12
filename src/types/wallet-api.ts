import { ApiPaginationResponse, ApiRequest } from "types/api.ts";

export type WalletTransactionListApiRequest = ApiRequest;

export type WalletTransactionListApiResponse = ApiPaginationResponse<{
  Wallet;
}>;
