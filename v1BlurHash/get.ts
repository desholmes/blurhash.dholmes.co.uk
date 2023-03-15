import { Context, HttpRequest } from "@azure/functions";
import { decode, isBlurhashValid } from "blurhash";
import { createCanvas } from "canvas";

import { HttpStatusCode, sendResponse } from "../utils";
import { getValidator } from "./validation";

const functionName = "v1BlurHash get";

export const get = (context: Context, req: HttpRequest) => {
  const queryData = {
    blurhash: req?.query?.blurhash || null,
    width: parseInt(req?.query?.width) || null,
    height: parseInt(req?.query?.height) || null
  };

  const { error } = getValidator.validate(queryData);

  context.log.info(`${functionName}: Validation results`, getValidator.validate(queryData));

  if (error) {
    context.log.info(`${functionName}: Request invalid`, error.details[0].message);
    sendResponse(context, HttpStatusCode.BAD_REQUEST, {
      error: true,
      message: `Invalid request: ${error.details[0].message}`
    });
    return;
  }

  const { blurhash, width, height } = queryData;

  const blurhashIsValid = isBlurhashValid(blurhash);

  // check blurhash is invalid
  if (!blurhashIsValid.result) {
    context.log.info(`${functionName}: Blurhash is invalid `, blurhashIsValid.errorReason);
    sendResponse(context, HttpStatusCode.BAD_REQUEST, {
      error: true,
      message: `The blurhash is invalid - ${blurhashIsValid.errorReason}`
    });
    return;
  }

  // return image
  context.log.info(`${functionName}: Blurhash is valid, returning image`);

  const pixels = decode(blurhash, width, height);
  const imageCanvas = createCanvas(width, height);
  const imageContext = imageCanvas.getContext("2d");
  const imageData = imageContext.createImageData(width, height);
  imageData.data.set(pixels);
  imageContext.putImageData(imageData, 0, 0);

  context.res = {
    isRaw: true,
    status: HttpStatusCode.OK,
    body: imageCanvas.toBuffer()
  };
  context.res.headers = { ...{ "Content-Type": "image/jpeg" } };
  return;
};
