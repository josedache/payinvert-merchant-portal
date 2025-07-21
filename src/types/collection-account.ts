export interface CollectionAccount {
  id: number;
  clientId: number;
  accountNumber: string;
  accountName: string;
  bankName: string;
  businessId: number;
  merchantSavingsAccountId: number;
  collectionSavingsAccountId: number;
  appEnvironmentId: number;
  dateCreated: string;
  dateUpdated: string | null;
  dateDeleted: string | null;
  createdBy: number;
  updatedBy: number | null;
  deletedBy: number | null;
}
