import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { handleOptions, getCorsHeaders, rateLimit, sendResponse, HttpStatusCode } from "../utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.res["header"] = getCorsHeaders();
    rateLimit(context);
    handleOptions(context, req);

    // check for GET request to decode and return image

    // check for POST request to encode and return image

    // sendResponse(context, HttpStatusCode.OK, {
    //   error: false,
    //   message: "Property accepted for processing"
    // });
    // return;
  } catch (error) {
    context.log.error("v1BlurHash: Error", error);
    sendResponse(context, HttpStatusCode.INTERNAL_SERVER_ERROR, {
      error: true,
      message: "There was an error processing the request"
    });
    return;
  }
};

export default httpTrigger;
