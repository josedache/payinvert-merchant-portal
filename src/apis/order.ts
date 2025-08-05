import { baseApi } from "configs/store-query";
import { ORDER } from "constants/tags";
import { OrderListApiRequest, OrderListApiResponse } from "types/order-api";

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
