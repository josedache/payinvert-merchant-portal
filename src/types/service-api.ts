import { ApiRequest, ApiResponse } from "types/api.ts";
import { Country, Currency } from "types/service.ts";

export type ServiceCountryListApiRequest = ApiRequest;

export type ServiceCountryListApiResponse = ApiResponse<Country[]>;

export type ServiceCurrencyListApiRequest = ApiRequest;

export type ServiceCurrencyListApiResponse = ApiResponse<Currency[]>;
