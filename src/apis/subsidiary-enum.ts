import { baseApi } from "configs/store-query.ts";
import { SubsidiaryEnum } from "types/subsidiary-enum.ts";
import { ApiRequest } from "types/api.ts";

export const BASE_URL = "/subsidiary/enums";

export const subsidiaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubsidiaryCollectionBankEnums: builder.query<
      SubsidiaryEnum[],
      ApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/collection-bank`,
        ...config,
      }),
    }),
  }),
});
