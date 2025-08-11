export interface SubsidiaryDashboardRole {
  name: string;
  status: number;
  roleTypeId: number | null;
  permissionId: number | null;
  subsidiaryId: number | null;
  businessId: number;
  description: string;
  isActive: boolean | null;
  id: number;
  dateCreated: string;
  dateUpdated: string | null;
  dateDeleted: string | null;
  createdBy: number;
  updatedBy: number | null;
  deletedBy: number | null;
}

export interface SubsidiaryDashboardRolePermission {
  moduleEnum: number;
  actions: {
    action: number;
    value: boolean;
  }[];
}

export type SubsidiaryDashboardRoleDetails = {
  role: SubsidiaryDashboardRole;
  permission: SubsidiaryDashboardRolePermission[];
};
