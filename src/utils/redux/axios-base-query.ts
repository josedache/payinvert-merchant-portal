import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

/**
 *
 * @param {import("axios").AxiosRequestConfig} baseConfig
 * @param {import("axios").AxiosInstance} http
 */
export function axiosBaseQuery(
  baseConfig: AxiosRequestConfig,
  http: AxiosInstance
) {
  /**
   *
   * @param {import("axios").AxiosRequestConfig} config
   */
  async function request(config: AxiosRequestConfig) {
    const url = config.url
      ? (baseConfig.url || "") + config.url
      : baseConfig.url;

    try {
      const response = await http.request({ ...baseConfig, ...config, url });
      return {
        data: response.data || null,
        meta: { request: response.request, response },
      };
    } catch (error: any) {
      return {
        error: error.response
          ? error?.response?.data
          : { message: "Something went wrong" },
      };
    }
  }
  return request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>;
}

export default axiosBaseQuery;
