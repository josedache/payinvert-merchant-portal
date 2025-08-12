import { baseApi } from "configs/store-query";
import {
  VerificationBvnRequestApiRequest,
  VerificationBvnRequestApiResponse,
  VerificationBvnValidateApiRequest,
  VerificationBvnValidateApiResponse,
  VerificationEmailRequestApiRequest,
  VerificationEmailRequestApiResponse,
  VerificationEmailValidateApiRequest,
  VerificationEmailValidateApiResponse,
  VerificationNameEnquiryApiRequest,
  VerificationNameEnquiryApiResponse,
  VerificationPhoneRequestApiRequest,
  VerificationPhoneRequestApiResponse, VerificationPhoneValidateApiRequest,
  VerificationPhoneValidateApiResponse,
  VerificationRcNumberValidateApiRequest,
  VerificationRcNumberValidateApiResponse,
} from "types/verification-api";
import { COMPLIANCE, USER } from "constants/tags";

export const BASE_URL = "/verification";

export const verificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestBvnVerification: builder.mutation<
      VerificationBvnRequestApiResponse,
      VerificationBvnRequestApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/bvn/request`,
        method: "post",
        ...config,
      }),
    }),
    validateBvnVerification: builder.mutation<
      VerificationBvnValidateApiResponse,
      VerificationBvnValidateApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/bvn/validate`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    requestEmailVerification: builder.mutation<
      VerificationEmailRequestApiResponse,
      VerificationEmailRequestApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/email/request/${path.email}`,
        method: "post",
        ...config,
      }),
    }),
    validateEmailVerification: builder.mutation<
      VerificationEmailValidateApiResponse,
      VerificationEmailValidateApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/email/validate/${path.otp}`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    requestPhoneVerification: builder.mutation<
      VerificationPhoneRequestApiResponse,
      VerificationPhoneRequestApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/phone/request/${path.mobileNumber}`,
        method: "post",
        ...config,
      }),
    }),
    validatePhoneVerification: builder.mutation<
      VerificationPhoneValidateApiResponse,
      VerificationPhoneValidateApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/phone/validate/${path.otp}`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
    getNameEnquiryVerification: builder.query<
      VerificationNameEnquiryApiResponse,
      VerificationNameEnquiryApiRequest
    >({
      query: (config) => ({
        url: `${BASE_URL}/name-enquiry`,
        method: "post",
        ...config,
      }),
    }),
    validateRcNumberVerification: builder.mutation<
      VerificationRcNumberValidateApiResponse,
      VerificationRcNumberValidateApiRequest
    >({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/business/validate/${path.rcNumber}`,
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }, { type: COMPLIANCE }],
    }),
  }),
});
