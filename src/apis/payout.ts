import { baseApi } from "configs/store-query.ts";
import { COMPLIANCE, USER } from "constants/tags.ts";

import {
  initiateNewPayoutRequest,
  initiateNewPayoutResponse,
  verifyNewPayoutRequest,
  verifyNewPayoutResponse,
} from "types/payout";

export const BASE_URL = "/subsidiary/payout";

export const payoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateNewPayout: builder.mutation<
      initiateNewPayoutResponse,
      initiateNewPayoutRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/initiate/new`,
        method: "POST",
        ...config,
      }),
    }),
    verifyNewPayout: builder.mutation<
      verifyNewPayoutResponse,
      verifyNewPayoutRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/verify/new`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: [COMPLIANCE, USER],
    }),
  }),
});
