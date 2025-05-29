import { baseApi } from "configs/store-query.ts";
import { PAYMENT_LINK } from "constants/tags.ts";
import {
  ServiceBusinessSizesListApiRequest,
  ServiceBusinessSizesListApiResponse,
  ServiceCountryListApiRequest,
  ServiceCountryListApiResponse,
  ServiceCurrencyListApiRequest,
  ServiceCurrencyListApiResponse,
} from "types/service-api.ts";

export const BASE_URL = "/subsidiary/dashboard/service";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<
      ServiceCountryListApiResponse,
      ServiceCountryListApiRequest
    >({
      query: () => `${BASE_URL}/countries`,
      providesTags: [PAYMENT_LINK],
    }),
    getCurrencies: builder.query<
      ServiceCurrencyListApiResponse,
      ServiceCurrencyListApiRequest
    >({
      query: () => `${BASE_URL}/currencies`,
      providesTags: [PAYMENT_LINK],
    }),
    getBusinessSizes: builder.query<
      ServiceBusinessSizesListApiResponse,
      ServiceBusinessSizesListApiRequest
    >({
      query: () => `${BASE_URL}/business-sizes`,
      providesTags: [PAYMENT_LINK],
    }),
  }),
});
