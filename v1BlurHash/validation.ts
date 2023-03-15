import * as Joi from "joi";

export const getValidator = Joi.object({
  blurhash: Joi.string().required().min(6),
  width: Joi.number().min(1).max(2000),
  height: Joi.number().min(1).max(2000)
});

export const postValidator = Joi.object({
  imageUrl: Joi.string().required().uri()
});
