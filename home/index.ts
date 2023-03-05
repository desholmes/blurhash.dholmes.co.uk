import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { handleOptions, rateLimitExceeded, HttpStatusCode } from "../utils";

import * as Pug from "pug";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if (await rateLimitExceeded(context)) {
      context.res = {
        body: Pug.renderFile("./views/rate-limit.pug"),
        headers: {
          "Content-Type": "text/html"
        }
      };
      return;
    }
    await handleOptions(context, req);
    context.res = {
      status: HttpStatusCode.OK,
      body: Pug.renderFile("./views/index.pug"),
      headers: {
        "Content-Type": "text/html"
      }
    };
    return;
  } catch (error) {
    context.res = {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR
    };
    return;
  }
};

export default httpTrigger;
