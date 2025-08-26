import { baseApi } from "configs/store-query";
import { COMPLIANCE, KEY, PAYMENT_LINK, USER, WALLET } from "constants/tags";
import { ApiRequest } from "types/api";
import {
  GetSubsidiaryBankApiResponse,
  GetSubsidiaryBusinessCategoryListApiResponse,
  GetSubsidiaryBusinessChartApiResponse,
  GetSubsidiaryComplianceCheckerApiResponse,
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
  SubsidiaryDashboardKeyCreateNewAuthApiRequest,
  SubsidiaryDashboardKeyCreateNewAuthApiResponse,
  SubsidiaryDashboardKeysNewApiRequest,
  SubsidiaryDashboardKeysNewApiResponse,
  SubsidiaryDashboardPaymentLinkStatusUpdateApiRequest,
  SubsidiaryDashboardPaymentLinkStatusUpdateApiResponse,
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
  UpdateSubsidiaryComplianceAgreementApiRequest,
  UpdateSubsidiaryComplianceAgreementApiResponse,
  UpdateSubsidiaryComplianceBankApiRequest,
  UpdateSubsidiaryComplianceBankApiResponse,
  UpdateSubsidiaryComplianceContactApiRequest,
  UpdateSubsidiaryComplianceContactApiResponse,
  UpdateSubsidiaryComplianceDirectorApiRequest,
  UpdateSubsidiaryComplianceDirectorApiResponse,
  UpdateSubsidiaryComplianceKybDetailsApiRequest,
  UpdateSubsidiaryComplianceKybDetailsApiResponse,
  UpdateSubsidiaryComplianceOwnerApiRequest,
  UpdateSubsidiaryComplianceOwnerApiResponse,
  UpdateSubsidiaryComplianceProfileApiRequest,
  UpdateSubsidiaryComplianceProfileApiResponse,
} from "types/subsidiary-api";
import objectToFormData from "utils/object/object-to-formdata";

export const BASE_URL = "/subsidiary";

export const subsidiaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logoutSubsidiary: builder.mutation({
      query: (config) => ({
        url: BASE_URL + "/dashboard/logout/new",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
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
    resendSubsidiaryVerificationEmailNew: builder.mutation<
      SubsidiaryVerificationEmailResendApiResponse,
      SubsidiaryVerificationEmailResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/resend/verification/email/new",
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
    verifySubsidiaryBusinessEmailNew: builder.mutation<
      SubsidiaryBusinessEmailVerifyResendApiResponse,
      SubsidiaryBusinessEmailVerifyResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/verify/business/email/new",
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
    updateSubsidiaryComplianceContact: builder.mutation<
      UpdateSubsidiaryComplianceContactApiResponse,
      UpdateSubsidiaryComplianceContactApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/contact",
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
    updateSubsidiaryComplianceOwner: builder.mutation<
      UpdateSubsidiaryComplianceOwnerApiResponse,
      UpdateSubsidiaryComplianceOwnerApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/owner",
        method: "post",
        ...config,
        body: objectToFormData(config.body),
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    updateSubsidiaryComplianceKybDetails: builder.mutation<
      UpdateSubsidiaryComplianceKybDetailsApiResponse,
      UpdateSubsidiaryComplianceKybDetailsApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/kyb-details",
        method: "post",
        ...config,
        body: objectToFormData(config.body),
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    updateSubsidiaryComplianceAgreement: builder.mutation<
      UpdateSubsidiaryComplianceAgreementApiResponse,
      UpdateSubsidiaryComplianceAgreementApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/agreement",
        method: "post",
        ...config,
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
    getSubsidiaryComplianceChecker: builder.query<
      GetSubsidiaryComplianceCheckerApiResponse,
      void
    >({
      query: () => `${BASE_URL}/dashboard/compliance/checker`,
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
      providesTags: [WALLET],
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
    getSubsidiaryDashboardKeysNew: builder.query<
      SubsidiaryDashboardKeysNewApiResponse,
      SubsidiaryDashboardKeysNewApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/dashboard/subsidiary/get-keys/new`,
        ...config,
      }),
      providesTags: [KEY],
    }),
    createSubsidiaryDashboardKeyAuthNew: builder.mutation<
      SubsidiaryDashboardKeyCreateNewAuthApiResponse,
      SubsidiaryDashboardKeyCreateNewAuthApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/dashboard/auth/new-key/new`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [KEY],
    }),
    updateSubsidiaryDashboardPaymentLinkStatus: builder.mutation<
      SubsidiaryDashboardPaymentLinkStatusUpdateApiResponse,
      SubsidiaryDashboardPaymentLinkStatusUpdateApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/dashboard/payment/link/update-status`,
        method: "put",
        ...config,
      }),
      invalidatesTags: [{ type: PAYMENT_LINK }],
    }),
    regenerateSubsidiaryDashboardAuthNewKeyNew: builder.mutation<
      SubsidiaryDashboardKeyCreateNewAuthApiResponse,
      SubsidiaryDashboardKeyCreateNewAuthApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/dashboard/auth/new-key/new`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [KEY],
    }),
  }),
});
