import { ApiRequest, ApiResponse } from "types/api";
import { PaymentLink, PaymentLinkType } from "types/payment-link";

export type PaymentLinkListApiRequest = ApiRequest<
  void,
  void,
  {
    Type?: string;
    SubsidiaryId?: string;
    BusinessId?: string;
    Id?: string;
    Status?: string;
    Page?: number;
    Limit?: number;
    Size?: string;
    fromDate?: string;
    toDate?: string;
  }
>;

export type PaymentLinkListApiResponse = {
  items: PaymentLink[];
  nextPage: number;
  previousPage: number | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
};

export type PaymentLinkCreateApiRequest = ApiRequest<{
  name: string;
  description: string;
  paymentType: string;
  amount: number;
  mobile: string;
  backgroundImage: string;
  website: string;
  currency: string;
  limit: number;
}>;

export type PaymentLinkCreateApiResponse = ApiResponse;

export type PaymentLinkTypesApiRequest = ApiRequest;

export type PaymentLinkTypesApiResponse = ApiResponse & {
  paymentLinkTypes: PaymentLinkType[];
};

export type UpdatePaymentLinkStatusApiResponse = ApiResponse;

export type UpdatePaymentLinkStatusApiRequest = ApiRequest<
  void,
  void,
  {
    Action: "Activate" | "Deactivate";
    Reference: string;
  }
>;
