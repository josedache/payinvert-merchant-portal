export interface PaymentLink {
  id: number;
  name: string;
  paymentType: string;
  logo: string | null;
  amount: number | null;
  dateCreated: string;
  reference: string;
  createdBy: string | null;
  creatorEmail: string | null;
  isActive: boolean;
  currency: string;
  limit: number | null;
  paymentLinkUrl: string;
  appEnvironmentId: number;
  paymentLinkType: string | null;
  paymentLinkCode: string | null;
  description: string | null;
  businessId: string | null;
}

export interface PaymentLinkType {
  paymentLinkName: string;
  description: string;
  status: boolean;
  code: string;
  id: number;
  dateCreated: string;
  dateUpdated: string | null;
  dateDeleted: string | null;
  createdBy: number;
  updatedBy: number | null;
  deletedBy: number | null;
}
