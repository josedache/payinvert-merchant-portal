import { ApiRequest, ApiResponse } from "types/api";
import { Order } from "types/order";

export type OrderListApiRequest = ApiRequest;

export type OrderListApiResponse = ApiResponse<{
  page: {
    total: number;
    size: number;
    totalPage: number;
    currentPage: number;
    previousPage: number;
    nextPage: number;
    todayDate: string;
  };
  items: Order[];
}>;
