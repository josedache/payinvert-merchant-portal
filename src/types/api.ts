import { FetchArgs } from "@reduxjs/toolkit/query";

export type ApiRequest<
  B = any,
  P = Record<string, any>,
  Q = Record<string, any>,
> = {
  path?: P;
  params?: Q;
  body?: B;
} & Omit<Partial<FetchArgs>, "params" | "body">;

export type ApiResponse<T = any> = {
  statusCode: number;
  message: string;
  data: T;
  token: string;
  total: number;
  filtered: number;
  size: number;
  pages: number;
};

export type ApiPaginationResponse<T = any> = {
  items: T[];
  page: {
    total: number;
    size: number;
    totalPage: number;
    currentPage: number;
    previousPage: number;
    nextPage: number;
    todayDate: string;
  };
};
