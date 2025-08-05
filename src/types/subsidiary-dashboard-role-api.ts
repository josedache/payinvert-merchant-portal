import { ApiRequest, ApiResponse } from "types/api.ts";

export type SubsidiaryDashboardRoleCreateApiRequest = ApiRequest<{
  name: string;
  permissionModel: {
    moduleEnum: string;
    action: string;
    value: boolean;
  }[];
}>;

export type SubsidiaryDashboardRoleCreateApiResponse = ApiResponse;

export type SubsidiaryDashboardRoleUpdateApiRequest = ApiRequest<
  {
    name: string;
    permissionModel: {
      moduleEnum: string;
      action: string;
      value: boolean;
    }[];
  },
  {
    roleId: number | string;
  }
>;

export type SubsidiaryDashboardRoleUpdateApiResponse = ApiResponse;

export type SubsidiaryDashboardRoleListApiRequest = ApiRequest<
  void,
  {
    roleId: number | string;
  }
>;

export type SubsidiaryDashboardRoleListApiResponse = ApiResponse;

export type SubsidiaryDashboardRoleApiRequest = ApiRequest;

export type SubsidiaryDashboardRoleApiResponse = ApiResponse;
