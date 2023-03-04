import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { handleOptions, rateLimit } from "../utils";

import { sendResponse, HttpStatusCode } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  rateLimit(context);
  handleOptions(context, req);

  context.log.info("v1HeathCheck: Sending health check response");

  sendResponse(context, HttpStatusCode.OK, {
    error: false,
    message: "Service is available"
  });
  return;
};

export default httpTrigger;
