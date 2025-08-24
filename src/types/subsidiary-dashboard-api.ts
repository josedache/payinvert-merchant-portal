import { ApiRequest, ApiResponse } from "types/api";
import { SubsidiaryDashboardPaymentOptions } from "types/subsidiary-dashboard";

export type SubsidiaryDashboardPaymentOptionsSetAllApiRequest = ApiRequest<{
  paymentOptions: {
    paymentOption: string;
    enabled: boolean;
  }[];
  businessId: string | number;
}>;
export type SubsidiaryDashboardPaymentOptionsSetAllApiResponse =
  ApiResponse<any>;

export type SubsidiaryDashboardPaymentOptionsSetApiRequest = ApiRequest<{
  paymentOption: string;
  enabled: boolean;
  businessId: string;
}>;
export type SubsidiaryDashboardPaymentOptionsSetApiResponse = ApiResponse<any>;

export type SubsidiaryDashboardPaymentOptionsViewNewApiRequest = ApiRequest;
export type SubsidiaryDashboardPaymentOptionsViewNewApiResponse = ApiResponse<
  SubsidiaryDashboardPaymentOptions[]
>;

export type SubsidiaryDashboard2faLoginSetApiRequest = ApiRequest<{
  twoFA: boolean;
}>;
export type SubsidiaryDashboard2faLoginSetApiResponse = ApiResponse<any>;

export type SubsidiaryDashboard2faLoginViewNewApiRequest = ApiRequest;
export type SubsidiaryDashboard2faLoginViewNewApiResponse = ApiResponse<{
  isTwoFAEnabled: boolean;
}>;
