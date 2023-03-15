import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { handleOptions, rateLimitExceeded, sendResponse, HttpStatusCode } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (await rateLimitExceeded(context)) {
    return;
  }
  await handleOptions(context, req);

  context.log.info("v1HeathCheck: Sending health check response");

  sendResponse(context, HttpStatusCode.OK, {
    error: false,
    message: "Service is available"
  });
  return;
};

export default httpTrigger;
