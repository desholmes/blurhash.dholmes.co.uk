import { Context } from "@azure/functions";
import { RateLimiter } from "limiter";

import { HttpStatusCode } from ".";
import { LIMITER_TOKENS, LIMITER_INTERVAL } from "../constants";

export const rateLimit = async (context: Context) => {
  const limiter = new RateLimiter({
    tokensPerInterval: LIMITER_TOKENS,
    interval: LIMITER_INTERVAL
  });
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests <= 0) {
    context.res.status = HttpStatusCode.TOO_MANY_REQUESTS;
    return;
  }
};
