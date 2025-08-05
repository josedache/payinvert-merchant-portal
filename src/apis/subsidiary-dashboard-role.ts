import { baseApi } from "configs/store-query.ts";
import { ROLE } from "constants/tags.ts";
import {
  SubsidiaryDashboardRoleApiRequest,
  SubsidiaryDashboardRoleApiResponse,
  SubsidiaryDashboardRoleCreateApiRequest,
  SubsidiaryDashboardRoleCreateApiResponse,
  SubsidiaryDashboardRoleListApiRequest,
  SubsidiaryDashboardRoleListApiResponse,
  SubsidiaryDashboardRoleUpdateApiRequest,
  SubsidiaryDashboardRoleUpdateApiResponse,
} from "types/subsidiary-dashboard-role-api.ts";

export const BASE_URL = "/subsidiary/dashboard/role";

export const subsidiaryDashboardRoleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubsidiaryDashboardRole: builder.mutation<
      SubsidiaryDashboardRoleCreateApiResponse,
      SubsidiaryDashboardRoleCreateApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [ROLE],
    }),
    updateSubsidiaryDashboardRole: builder.mutation<
      SubsidiaryDashboardRoleUpdateApiResponse,
      SubsidiaryDashboardRoleUpdateApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.roleId}`,
        method: "put",
        ...config,
      }),
      invalidatesTags: [ROLE],
    }),
    getSubsidiaryDashboardRoleList: builder.query<
      SubsidiaryDashboardRoleListApiResponse,
      SubsidiaryDashboardRoleListApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/list`,
        ...config,
      }),
      providesTags: [ROLE],
    }),
    getSubsidiaryDashboardRole: builder.query<
      SubsidiaryDashboardRoleApiResponse,
      SubsidiaryDashboardRoleApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.roleId}`,
        ...config,
      }),
      providesTags: [ROLE],
    }),
  }),
});
