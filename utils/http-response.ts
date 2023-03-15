import { Context } from "@azure/functions";

interface ResponseBody {
  error: boolean;
  message?: string;
  data?: unknown;
}

export const sendResponse = (context: Context, status: number, responseBody: ResponseBody) => {
  context.res = {
    status,
    body: responseBody,
    headers: {
      "Content-Type": "application/json"
    }
  };
  return;
};
