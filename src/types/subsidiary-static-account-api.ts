import { ApiRequest, ApiResponse } from "types/api";

export type SubsidiaryStaticAccountDefaultWebhookViewApiRequest = ApiRequest;

export type SubsidiaryStaticAccountDefaultWebhookViewApiResponse = ApiResponse<{
  callbackUrl: string;
}>;

export type SubsidiaryStaticAccountDefaultWebhookCreateApiRequest = ApiRequest<{
  defaultWebhook: string;
  subsidiaryId?: number;
  businessId: number;
}>;

export type SubsidiaryStaticAccountDefaultWebhookCreateApiResponse =
  ApiResponse;
