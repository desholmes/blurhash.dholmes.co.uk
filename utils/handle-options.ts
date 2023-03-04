import { Context, HttpRequest } from "@azure/functions";

import { RequestMethod } from "../constants";
import { HttpStatusCode } from ".";

export const handleOptions = async (context: Context, req: HttpRequest) => {
  if (req.method === RequestMethod.OPTIONS) {
    context.res.status = HttpStatusCode.OK;
    return;
  }
};
