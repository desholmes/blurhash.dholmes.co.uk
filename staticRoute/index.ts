import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as fs from "fs";

import { handleOptions, rateLimitExceeded, HttpStatusCode } from "../utils";

const getFileExtension = (fileName: string) => {
  const parts = fileName.split(".");
  return parts[parts.length - 1];
};

const getContentType = (fileName: string) => {
  const extensionContentTypeMap = { jpg: "image/jpg", css: "text/css", png: "image/png" };
  const extension = getFileExtension(fileName);
  let contentType = "text/html";
  if (extensionContentTypeMap.hasOwnProperty(extension)) {
    contentType = extensionContentTypeMap[extension];
  }
  return contentType;
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  if (await rateLimitExceeded(context)) {
    return;
  }
  await handleOptions(context, req);

  const { path, asset } = context.req.params;
  const contentType = getContentType(asset);
  const filePath = `static/${path}/${asset}`;

  if (
    !["images", "styles"].includes(path) ||
    !["css", "jpg", "png"].includes(getFileExtension(asset))
  ) {
    context.res = {
      status: HttpStatusCode.NOT_FOUND,
      body: "File not found"
    };
    return;
  }

  try {
    const file = fs.readFileSync(filePath);
    context.res = {
      status: HttpStatusCode.OK,
      body: file,
      headers: {
        "Content-Type": contentType
      }
    };
  } catch (err) {
    context.res = {
      status: HttpStatusCode.NOT_FOUND,
      body: "File not found"
    };
    return;
  }
};

export default httpTrigger;
