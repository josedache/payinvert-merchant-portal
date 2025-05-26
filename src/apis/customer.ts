import { baseApi } from "configs/store-query.ts";
import { CUSTOMER } from "constants/tags.ts";
import {
  CustomerListApiRequest,
  CustomerListApiResponse,
} from "types/customer-api.ts";

export const BASE_URL = "/subsidiary/dashboard/customers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<
      CustomerListApiResponse,
      CustomerListApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}`,
        ...config,
      }),
      providesTags: [CUSTOMER],
    }),
  }),
});
