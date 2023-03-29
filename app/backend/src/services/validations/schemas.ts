import Joi = require('joi');

const loginSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export default loginSchema;