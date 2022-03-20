require('dotenv-flow').config({
  purge_dotenv: true,
});
const joi = require('joi');

const validationSchema = joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'production')
    .default('development'),
  PORT: joi.number().default(3000),
  DATABASE_URL: joi.string().required(),
  MAPBOX_KEY: joi.string().required(),
});

const validatedEnvironment = validationSchema.validate(process.env, {
  stripUnknown: true,
  abortEarly: false,
});

if (validatedEnvironment.error) {
  throw validatedEnvironment.error;
}

module.exports = validatedEnvironment.value;
