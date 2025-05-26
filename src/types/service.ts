export interface Currency {
  name: string;
  shortName: string;
  isAllowed: boolean;
  symbol: string | null;
  id: number;
  dateCreated: string;
  dateUpdated: string | null;
  dateDeleted: string | null;
  createdBy: number;
  updatedBy: number | null;
  deletedBy: number | null;
}

export interface Country {
  name: string;
  countryCode: string;
  currency: string;
  currencyId: number;
  shortName: string;
  countryIso3: string;
  isOfac: boolean;
  isEuro: boolean;
  allowed: boolean;
  id: number;
  dateCreated: string;
  dateUpdated: string | null;
  dateDeleted: string | null;
  createdBy: number;
  updatedBy: number | null;
  deletedBy: number | null;
}
