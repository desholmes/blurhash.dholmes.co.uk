import { Interval } from "limiter";

export enum RequestMethod {
  GET = "GET",
  OPTIONS = "OPTIONS",
  POST = "POST"
}

export const NODE_ENV: string = process.env.NODE_ENV || "development";

// CORS
export const CORS_ALLOWED_DOMAINS = process.env.CORS_ALLOWED_DOMAINS || "blurhash.dholmes.co.uk";
export const CORS_ALLOWED_METHODS =
  process.env.CORS_ALLOWED_METHODS ||
  [RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS].join(",");

// Rate limiter
export const LIMITER_TOKENS = parseInt(process.env.LIMITER_TOKENS) || 150;
export const LIMITER_INTERVAL: Interval = parseInt(process.env.LIMITER_INTERVAL) || "hour";
