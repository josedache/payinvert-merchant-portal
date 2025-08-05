import { ApiRequest, ApiResponse } from "types/api";
import { Customer } from "types/customer";

export type CustomerListApiRequest = ApiRequest;

export type CustomerListApiResponse = ApiResponse<{
  page: {
    total: number;
    size: number;
    totalPage: number;
    currentPage: number;
    previousPage: number;
    nextPage: number;
    todayDate: string;
  };
  items: Customer[];
}>;
