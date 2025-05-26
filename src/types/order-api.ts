import { ApiRequest, ApiResponse } from "types/api.ts";
import { Order } from "types/order.ts";

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
