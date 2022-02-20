import * as Joi from 'joi';

export default class ProductValidators {
  createProductSchema = Joi.object({
    id: Joi.string().min(1).required(),
    name: Joi.string().length(2).required(),
  });

  updateProductNameSchema = Joi.object({
    name: Joi.string().length(2).required(),
  });
}