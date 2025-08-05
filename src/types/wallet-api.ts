import { ApiPaginationResponse, ApiRequest } from "types/api";

export type WalletTransactionListApiRequest = ApiRequest;

export type WalletTransactionListApiResponse = ApiPaginationResponse<{
  Wallet;
}>;
