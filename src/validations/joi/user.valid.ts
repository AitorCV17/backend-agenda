import Joi from "joi";

/**
 * Esquema de validación para crear un usuario.
 */
export const createUserValidation = Joi.object({
    nombres: Joi.string().required(),
    correo: Joi.string().email().required(),
    contraseña: Joi.string().required(),
});

/**
 * Esquema de validación para actualizar un usuario.
 */
export const updateUserValidation = Joi.object({
    id: Joi.number().required(),
    nombres: Joi.string().required(),
    correo: Joi.string().email().required(),
    contraseña: Joi.string(),
});

/**
 * Esquema de validación para obtener un usuario.
 */
export const getUserValidation = Joi.object({
    id: Joi.number().required()
});

/**
 * Esquema de validación para eliminar un usuario.
 */
export const deleteUserValidation = Joi.object({
    id: Joi.number().required()
});
