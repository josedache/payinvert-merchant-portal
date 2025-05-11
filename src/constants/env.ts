export const PRODUCTION = import.meta.env.PROD;
export const DEVELOPMENT = import.meta.env.DEV;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const VIRTUAL_ENV = import.meta.env.VITE_VIRTUAL_ENV;
export const IS_VIRTUAL_DEVELOPMENT = VIRTUAL_ENV === "development";
