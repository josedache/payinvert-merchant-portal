import { ApiRequest, ApiResponse } from "types/api.ts";
import { CollectionAccount } from "types/collection-account.ts";

export type CollectionAccountListApiRequest = ApiRequest<
  void,
  void,
  {
    Page?: string | number;
    Limit?: string | number;
  }
>;

export type CollectionAccountListApiResponse = {
  page: {
    total: number;
    size: number;
    totalPage: number;
    currentPage: number;
    previousPage: number;
    nextPage: number;
    todayDate: string;
  };
  items: CollectionAccount[];
};

export type CollectionAccountCreateApiRequest = ApiRequest<{
  collectionAccountType: string;
  accountFirstName: string;
  accountLastName: string;
  mobileNumber: string;
  bvn: string;
  externalId: string;
}>;

export type CollectionAccountCreateApiResponse = ApiResponse;
