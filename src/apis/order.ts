import { baseApi } from "configs/store-query.ts";
import { ORDER } from "constants/tags.ts";
import { OrderListApiRequest, OrderListApiResponse } from "types/order-api.ts";

export const BASE_URL = "/subsidiary/dashboard/orders";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderListApiResponse, OrderListApiRequest>({
      query: (config) => ({
        url: `${BASE_URL}`,
        ...config,
      }),
      providesTags: [ORDER],
    }),
  }),
});
