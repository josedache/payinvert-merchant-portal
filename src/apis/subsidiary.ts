import { baseApi } from "configs/store-query";
import { COMPLIANCE, USER } from "constants/tags.ts";
import { ApiRequest } from "types/api";
import {
  GetSubsidiaryBankApiResponse,
  GetSubsidiaryBusinessCategoryListApiResponse,
  GetSubsidiaryBusinessChartApiResponse,
  GetSubsidiaryComplianceInfoApiResponse,
  GetSubsidiaryDashboardUserDetailsApiResponse,
  GetSubsidiaryDropdownApiResponse,
  GetSubsidiaryDropdownEnumsApiResponse,
  GetSubsidiaryResolveBankApiRequest,
  GetSubsidiaryResolveBankApiResponse,
  SubsidiaryBusinessEmailVerifyResendApiRequest,
  SubsidiaryBusinessEmailVerifyResendApiResponse,
  SubsidiaryCompleteForgotPasswordApiRequest,
  SubsidiaryCompleteForgotPasswordApiResponse,
  SubsidiaryForgotPasswordApiRequest,
  SubsidiaryForgotPasswordApiResponse,
  SubsidiaryLoginApiRequest,
  SubsidiaryLoginApiResponse,
  SubsidiaryLoginCompleteApiRequest,
  SubsidiaryLoginCompleteApiResponse,
  SubsidiaryMeApiRequest,
  SubsidiaryMeApiResponse,
  SubsidiaryOtpResendApiRequest,
  SubsidiaryOtpResendApiResponse,
  SubsidiarySignupApiRequest,
  SubsidiarySignupApiResponse,
  SubsidiaryVerificationEmailResendApiRequest,
  SubsidiaryVerificationEmailResendApiResponse,
  UpdateSubsidiaryComplianceBankApiRequest,
  UpdateSubsidiaryComplianceBankApiResponse,
  UpdateSubsidiaryComplianceDirectorApiRequest,
  UpdateSubsidiaryComplianceDirectorApiResponse,
  UpdateSubsidiaryComplianceKycDetailsApiRequest,
  UpdateSubsidiaryComplianceKycDetailsApiResponse,
  UpdateSubsidiaryComplianceProfileApiRequest,
  UpdateSubsidiaryComplianceProfileApiResponse,
} from "types/subsidiary-api.ts";
import objectToFormData from "utils/object/object-to-formdata";

export const BASE_URL = "/subsidiary";

export const subsidiaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginSubsidiary: builder.mutation<
      SubsidiaryLoginApiResponse,
      SubsidiaryLoginApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/business/login",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    completeSubsidiaryLogin: builder.mutation<
      SubsidiaryLoginCompleteApiResponse,
      SubsidiaryLoginCompleteApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/complete/login",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    resendSubsidiaryOtp: builder.mutation<
      SubsidiaryOtpResendApiResponse,
      SubsidiaryOtpResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/otp-resend",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    signupSubsidiary: builder.mutation<
      SubsidiarySignupApiResponse,
      SubsidiarySignupApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/business-signup",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    resendSubsidiaryVerificationEmail: builder.mutation<
      SubsidiaryVerificationEmailResendApiResponse,
      SubsidiaryVerificationEmailResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/resend/verification/email",
        method: "get",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    verifySubsidiaryBusinessEmail: builder.mutation<
      SubsidiaryBusinessEmailVerifyResendApiResponse,
      SubsidiaryBusinessEmailVerifyResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/verify/business/email",
        method: "get",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    forgotPasswordSubsidiary: builder.mutation<
      SubsidiaryForgotPasswordApiResponse,
      SubsidiaryForgotPasswordApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/forgot-password",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    completeSubsidiaryForgotPassword: builder.mutation<
      SubsidiaryCompleteForgotPasswordApiResponse,
      SubsidiaryCompleteForgotPasswordApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/complete/forgot-password",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    getSubsidiaryMe: builder.query<
      SubsidiaryMeApiResponse,
      SubsidiaryMeApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/me",
        method: "get",
        ...config,
      }),
      providesTags: [{ type: USER }],
    }),

    //Compliance
    updateSubsidiaryComplianceProfile: builder.mutation<
      UpdateSubsidiaryComplianceProfileApiResponse,
      UpdateSubsidiaryComplianceProfileApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/profile",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    updateSubsidiaryComplianceBank: builder.mutation<
      UpdateSubsidiaryComplianceBankApiResponse,
      UpdateSubsidiaryComplianceBankApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/bank",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    updateSubsidiaryComplianceDirector: builder.mutation<
      UpdateSubsidiaryComplianceDirectorApiResponse,
      UpdateSubsidiaryComplianceDirectorApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/director",
        method: "post",
        ...config,
        body: objectToFormData(config.body),
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    updateSubsidiaryComplianceKycDetails: builder.mutation<
      UpdateSubsidiaryComplianceKycDetailsApiResponse,
      UpdateSubsidiaryComplianceKycDetailsApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/kyc-details",
        method: "post",
        ...config,
        body: objectToFormData(config.body),
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    getSubsidiaryComplianceInfo: builder.query<
      GetSubsidiaryComplianceInfoApiResponse,
      void
    >({
      query: () => `${BASE_URL}/dashboard/compliance`,
      providesTags: [{ type: COMPLIANCE }],
    }),

    getSubsidiaryBanks: builder.query<GetSubsidiaryBankApiResponse, void>({
      query: () => `${BASE_URL}/dashboard/banks`,
    }),
    getSubsidiaryBankResolve: builder.mutation<
      GetSubsidiaryResolveBankApiResponse,
      GetSubsidiaryResolveBankApiRequest
    >({
      query: () => `${BASE_URL}/payout/account/resolve`,
    }),
    getSubsidiaryBusinessCategories: builder.query<
      GetSubsidiaryBusinessCategoryListApiResponse,
      void
    >({
      query: () => `${BASE_URL}/dashboard/business/categories`,
    }),
    getSubsidiaryDashboardChart: builder.query<
      GetSubsidiaryBusinessChartApiResponse,
      ApiRequest<void, void, { ChartFilter: "Week" | "Month" | "Year" }>
    >({
      query: (config) => ({
        url: `${BASE_URL}/dashboard/business/chart`,
        ...config,
      }),
    }),

    getSubsidiaryDropdownEnums: builder.query<
      GetSubsidiaryDropdownEnumsApiResponse,
      void
    >({
      query: () => `${BASE_URL}/enums/dropdown-lookup`,
    }),
    getSubsidiaryDropdown: builder.query<
      GetSubsidiaryDropdownApiResponse,
      ApiRequest<void, { codeId: number }>
    >({
      query: ({ path }) => `${BASE_URL}/dashboard/dropdown/${path?.codeId}`,
    }),

    getSubsidiaryDashboardUserDetails: builder.query<
      GetSubsidiaryDashboardUserDetailsApiResponse,
      void
    >({
      query: () => ({
        url: `${BASE_URL}/dashboard/user-details`,
      }),
      providesTags: [{ type: USER }],
    }),
  }),
});
