import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { RequestMethod } from "../constants";
import {
  handleOptions,
  getCorsHeaders,
  rateLimitExceeded,
  sendResponse,
  HttpStatusCode
} from "../utils";
import { get } from "./get";
import { post } from "./post";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (await rateLimitExceeded(context)) {
    return;
  }
  context.res.headers = { ...getCorsHeaders() };
  handleOptions(context, req);

  // Handle GET requests
  if (req.method === RequestMethod.GET) {
    get(context, req);
    return;
  }

  // Handle POST requests
  if (req.method === RequestMethod.POST) {
    await post(context, req);
    return;
  }

  sendResponse(context, HttpStatusCode.NOT_FOUND, {
    error: true,
    message: "The resource you requested cannot be found"
  });
  return;
};

export default httpTrigger;
