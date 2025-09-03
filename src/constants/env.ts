export const PRODUCTION = import.meta.env.PROD;
export const DEVELOPMENT = import.meta.env.DEV;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const VIRTUAL_ENV = import.meta.env.VITE_VIRTUAL_ENV;
export const IS_VIRTUAL_DEVELOPMENT = VIRTUAL_ENV === "development";
export const SUPPORT_API_BASE_URL =
  import.meta.env.VITE_SUPPORT_API_BASE_URL ||
  "https://support-service.payinvert.com";
export const SUPPORT_API_KEY = (import.meta.env.VITE_SUPPORT_API_KEY =
  "pk_KCwFHhRJcJ.efNbO5zZyh8jwz6yr_0WpncWvs7z1mcdXvgJHTUwVcw");
export const SUPPORT_APPLICATION_ID =
  import.meta.env.VITE_SUPPORT_APPLICATION_ID || 1;
