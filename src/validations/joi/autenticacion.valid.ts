import Joi from "joi";

/**
 * Esquema de validación con Joi para el login.
 */
export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
