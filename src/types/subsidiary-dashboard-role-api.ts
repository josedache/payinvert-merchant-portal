import { ApiRequest, ApiResponse } from "types/api";
import {
  SubsidiaryDashboardRole,
  SubsidiaryDashboardRoleDetails,
} from "types/subsidiary-dashboard-role";

export type SubsidiaryDashboardRoleCreateApiRequest = ApiRequest<{
  name: string;
  permissionModel: {
    moduleEnum: number | string;
    action: number | string;
    value: boolean;
  }[];
}>;

export type SubsidiaryDashboardRoleCreateApiResponse =
  ApiResponse<SubsidiaryDashboardRole>;

export type SubsidiaryDashboardRoleUpdateApiRequest = ApiRequest<
  {
    name: string;
    permissionModel: {
      moduleEnum: number | string;
      action: number | string;
      value: boolean;
    }[];
  },
  {
    roleId: number | string;
  }
>;

export type SubsidiaryDashboardRoleUpdateApiResponse =
  ApiResponse<SubsidiaryDashboardRole>;

export type SubsidiaryDashboardRoleListApiRequest = ApiRequest<
  void,
  {
    roleId: number | string;
  }
>;

export type SubsidiaryDashboardRoleListApiResponse = ApiResponse<
  SubsidiaryDashboardRole[]
>;

export type SubsidiaryDashboardRoleApiRequest = ApiRequest;

export type SubsidiaryDashboardRoleApiResponse =
  ApiResponse<SubsidiaryDashboardRoleDetails>;
