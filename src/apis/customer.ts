import { baseApi } from "configs/store-query";
import { CUSTOMER } from "constants/tags";
import {
  CustomerListApiRequest,
  CustomerListApiResponse,
} from "types/customer-api";

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
