import { baseApi } from "configs/store-query";
import { SubsidiaryEnum } from "types/subsidiary-enum";
import { ApiRequest } from "types/api";

export const BASE_URL = "/subsidiary/enums";

export const subsidiaryEnumApi = baseApi.injectEndpoints({
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
    getModuleEnums: builder.query<SubsidiaryEnum[], ApiRequest>({
      query: (config) => ({
        url: `${BASE_URL}/module`,
        ...config,
      }),
    }),
    getRoleActionsEnums: builder.query<SubsidiaryEnum[], ApiRequest>({
      query: (config) => ({
        url: `${BASE_URL}/role-actions`,
        ...config,
      }),
    }),
  }),
});
