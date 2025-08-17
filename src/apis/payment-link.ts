import { baseApi } from "configs/store-query";
import { PAYMENT_LINK } from "constants/tags";
import {
  PaymentLinkCreateApiRequest,
  PaymentLinkCreateApiResponse,
  PaymentLinkEditNewApiRequest,
  PaymentLinkEditNewApiResponse,
  PaymentLinkListApiRequest,
  PaymentLinkListApiResponse,
  PaymentLinkTypesApiRequest,
  PaymentLinkTypesApiResponse,
  UpdatePaymentLinkStatusApiRequest,
  UpdatePaymentLinkStatusApiResponse,
} from "types/payment-link-api";

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
    updatePaymentLinkNew: builder.mutation<
      PaymentLinkEditNewApiResponse,
      PaymentLinkEditNewApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/edit/new`,
        method: "patch",
        ...config,
      }),
      invalidatesTags: [PAYMENT_LINK],
    }),
    updatePaymentLinkStatus: builder.mutation<
      UpdatePaymentLinkStatusApiResponse,
      UpdatePaymentLinkStatusApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/update-status`,
        method: "put",
        ...config,
      }),
      invalidatesTags: [PAYMENT_LINK],
    }),
  }),
});
