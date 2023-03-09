import { Joi } from 'express-validation';

const registerValidation = {
  body: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\+?(34|34[1-9]\d)\d{9}$/),
    imgUrl: Joi.string(),
  }),
};
export default registerValidation;
