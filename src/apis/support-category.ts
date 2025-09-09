import { supportApi } from "configs/store-query";
import { SUPPORT_CATEGORY } from "constants/tags";
import { SUPPORT_APPLICATION_ID } from "constants/env";
import {
  SupportCategoryHierarchyApiRequest,
  SupportCategoryHierarchyApiResponse,
} from "types/support-category-api";

export const BASE_URL = "/categories";

export const supportCategoryApi = supportApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryHierarchy: builder.query<
      SupportCategoryHierarchyApiResponse,
      SupportCategoryHierarchyApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/hierarchy/${SUPPORT_APPLICATION_ID}`,
        ...config,
      }),
      providesTags: [SUPPORT_CATEGORY],
    }),
  }),
});
