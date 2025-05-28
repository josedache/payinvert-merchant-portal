export interface Bank {
  id: number;
  name: string;
  countryId: number;
  bankCode: string;
  isMicrofinance: null | boolean;
  isMortgage: null | boolean;
}
