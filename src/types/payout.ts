import { ApiRequest, ApiResponse } from "types/api.ts";

export type initiateNewPayoutRequest = ApiRequest<{ amount: number }>;
export type initiateNewPayoutResponse = ApiResponse<{
  amount: number;
  transactionReference: string;
  appEnvironmentId: number;
  isUsed: boolean;
  id: number;
  dateCreated: string;
  dateUpdated: string | null;
  dateDeleted: string | null;
  createdBy: number;
  updatedBy: number | null;
  deletedBy: number | null;
}>;

export type verifyNewPayoutRequest = ApiRequest<{
  amount: number;
  otp: string;
  reference: string;
}>;
export type verifyNewPayoutResponse = ApiResponse<void>;
