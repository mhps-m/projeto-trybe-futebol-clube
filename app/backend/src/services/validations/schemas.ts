import Joi = require('joi');

export const loginSchema: Joi.ObjectSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export const updateMatchSchema: Joi.ObjectSchema = Joi.object().keys({
  homeTeamGoals: Joi.number(),
  awayTeamGoals: Joi.number(),
}).or('homeTeamGoals', 'awayTeamGoals');

export const newMatchSchema: Joi.ObjectSchema = Joi.object().keys({
  homeTeamId: Joi.number(),
  homeTeamGoals: Joi.number(),
  awayTeamId: Joi.number(),
  awayTeamGoals: Joi.number(),
}).required();
