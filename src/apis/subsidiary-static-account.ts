import { baseApi } from "configs/store-query.ts";
import { WEBHOOK } from "constants/tags.ts";
import {
  SubsidiaryStaticAccountDefaultWebhookCreateApiRequest,
  SubsidiaryStaticAccountDefaultWebhookCreateApiResponse,
  SubsidiaryStaticAccountDefaultWebhookViewApiRequest,
  SubsidiaryStaticAccountDefaultWebhookViewApiResponse,
} from "types/subsidiary-static-account-api.ts";

export const BASE_URL = "/subsidiary/static/account";

export const subsidiaryStaticAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubsidiaryStaticAccountDefaultWebhookViewNew: builder.query<
      SubsidiaryStaticAccountDefaultWebhookViewApiResponse,
      SubsidiaryStaticAccountDefaultWebhookViewApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/default/webhook/view/new`,
        ...config,
      }),
      providesTags: [WEBHOOK],
    }),
    updateSubsidiaryStaticAccountDefaultWebhookNew: builder.mutation<
      SubsidiaryStaticAccountDefaultWebhookCreateApiResponse,
      SubsidiaryStaticAccountDefaultWebhookCreateApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/default/webhook/new`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [WEBHOOK],
    }),
  }),
});
