import { baseApi } from "configs/store-query.ts";
import { PAYMENT_LINK } from "constants/tags.ts";
import {
  PaymentLinkCreateApiRequest,
  PaymentLinkCreateApiResponse,
  PaymentLinkListApiRequest,
  PaymentLinkListApiResponse,
  PaymentLinkTypesApiRequest,
  PaymentLinkTypesApiResponse,
} from "types/payment-link-api.ts";

export const BASE_URL = "/subsidiary/dashboard/payment/link";

export const paymentLinkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentLinkTypes: builder.query<
      PaymentLinkTypesApiResponse,
      PaymentLinkTypesApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/types`,
        ...config,
      }),
      providesTags: [PAYMENT_LINK],
    }),
    getPaymentLinks: builder.query<
      PaymentLinkListApiResponse,
      PaymentLinkListApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/business`,
        ...config,
      }),
      providesTags: [PAYMENT_LINK],
    }),
    createPaymentLink: builder.mutation<
      PaymentLinkCreateApiResponse,
      PaymentLinkCreateApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/create`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [PAYMENT_LINK],
    }),
  }),
});
