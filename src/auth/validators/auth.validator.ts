import * as Joi from 'joi';

export default class AuthValidators {
  loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(25).required(),
  });

  registerUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(25).required(),
  });
}
