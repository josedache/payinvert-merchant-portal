import { baseApi } from "configs/store-query";
import { PREFERENCE } from "constants/tags";
import {
  SubsidiaryDashboard2faLoginSetApiRequest,
  SubsidiaryDashboard2faLoginSetApiResponse,
  SubsidiaryDashboard2faLoginViewNewApiRequest,
  SubsidiaryDashboard2faLoginViewNewApiResponse,
  SubsidiaryDashboardPaymentOptionsSetAllApiRequest,
  SubsidiaryDashboardPaymentOptionsSetAllApiResponse,
  SubsidiaryDashboardPaymentOptionsSetApiRequest,
  SubsidiaryDashboardPaymentOptionsSetApiResponse,
  SubsidiaryDashboardPaymentOptionsViewNewApiRequest,
  SubsidiaryDashboardPaymentOptionsViewNewApiResponse,
} from "types/subsidiary-dashboard-api";

export const BASE_URL = "/subsidiary/dashboard";

export const subsidiaryDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setAllSubsidiaryDashboardPaymentOptions: builder.mutation<
      SubsidiaryDashboardPaymentOptionsSetAllApiResponse,
      SubsidiaryDashboardPaymentOptionsSetAllApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/payment-options/set/all`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [PREFERENCE],
    }),
    setSubsidiaryDashboardPaymentOptions: builder.mutation<
      SubsidiaryDashboardPaymentOptionsSetApiResponse,
      SubsidiaryDashboardPaymentOptionsSetApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/payment-options/set`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [PREFERENCE],
    }),
    getSubsidiaryDashboardPaymentOptions: builder.query<
      SubsidiaryDashboardPaymentOptionsViewNewApiResponse,
      SubsidiaryDashboardPaymentOptionsViewNewApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/payment-options/view`,
        ...config,
      }),
      providesTags: [PREFERENCE],
    }),
    setSubsidiaryDashboard2faLogin: builder.mutation<
      SubsidiaryDashboard2faLoginSetApiResponse,
      SubsidiaryDashboard2faLoginSetApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/2fa/login/set`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [PREFERENCE],
    }),
    getSubsidiaryDashboard2faLogin: builder.query<
      SubsidiaryDashboard2faLoginViewNewApiResponse,
      SubsidiaryDashboard2faLoginViewNewApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/2fa/login/view/new`,
        ...config,
      }),
      providesTags: [PREFERENCE],
    }),
  }),
});
