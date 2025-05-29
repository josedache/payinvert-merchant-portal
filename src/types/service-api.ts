import { ApiRequest, ApiResponse } from "types/api.ts";
import { Country, Currency } from "types/service.ts";

export type ServiceCountryListApiRequest = void;

export type ServiceCountryListApiResponse = ApiResponse<Country[]>;

export type ServiceCurrencyListApiRequest = void;

export type ServiceCurrencyListApiResponse = ApiResponse<Currency[]>;

export type ServiceBusinessSizesListApiRequest = ApiRequest;

export type ServiceBusinessSizesListApiResponse = ApiResponse<
  {
    name: string;
    description: string | null;
    isActive: boolean | null;
    id: number;
    dateCreated: string;
    dateUpdated: string | null;
    dateDeleted: string | null;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;
  }[]
>;
