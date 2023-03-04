import { CORS_ALLOWED_DOMAINS, CORS_ALLOWED_METHODS } from "../constants";

export const getCorsHeaders = () => {
  return {
    "Access-Control-Allow-Origin": CORS_ALLOWED_DOMAINS,
    "Access-Control-Allow-Methods": CORS_ALLOWED_METHODS
  };
};
