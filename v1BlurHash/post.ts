import { Context, HttpRequest } from "@azure/functions";
import { encode } from "blurhash";
import { createCanvas, Image, ImageData } from "canvas";

import { HttpStatusCode, sendResponse } from "../utils";
import { postValidator } from "./validation";

const functionName = "v1BlurHash post";

const loadImage = async (src: string): Promise<Image> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image: Image): ImageData => {
  const imageResizedWidth = Math.floor(image.width / 100);
  const imageResizedHeight = Math.floor(image.height / 100);
  const imageCanvas = createCanvas(image.width, image.height);
  const imageContext = imageCanvas.getContext("2d");
  imageContext.drawImage(image, 0, 0, imageResizedWidth, imageResizedHeight);
  return imageContext.getImageData(0, 0, imageResizedWidth, imageResizedHeight);
};

export const post = async (context: Context, req: HttpRequest) => {
  const queryValidationData = {
    imageUrl: req?.body?.imageUrl || null
  };

  const { error } = postValidator.validate(queryValidationData);

  if (error) {
    context.log.info(`${functionName}: Request invalid`, error.details[0].message);
    sendResponse(context, HttpStatusCode.BAD_REQUEST, {
      error: true,
      message: `Invalid request: ${error.details[0].message}`
    });
    return;
  }

  const imageUrl = req.body.imageUrl;
  let image = new Image();

  try {
    image = await loadImage(imageUrl);
  } catch (error) {
    context.log.info(`${functionName}: Image not found ${imageUrl}`);
    sendResponse(context, HttpStatusCode.NOT_FOUND, {
      error: true,
      message: `imageUrl ${imageUrl} could not be loaded`
    });
    return;
  }

  const imageData = getImageData(image);
  const blueHash = encode(imageData.data, imageData.width, imageData.height, 4, 4);

  context.log.info(
    `${functionName}: Image encoded ${imageUrl}, width: ${imageData.width}, height:${imageData.height}`
  );

  sendResponse(context, HttpStatusCode.OK, {
    error: false,
    data: {
      blueHash: blueHash,
      width: image.width,
      height: image.height
    }
  });
  return;
};
