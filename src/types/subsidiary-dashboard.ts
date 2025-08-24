export interface SubsidiaryDashboardPaymentOptions {
  isEnabled: boolean;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  id: number;
  dateCreated: string;
  dateUpdated: string | null;
  dateDeleted: string | null;
  createdBy: number;
  updatedBy: number | null;
  deletedBy: number | null;
}
