// src/validations/joi/task.valid.ts
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Validación para crear una tarea.
 * Se añade "completed" como boolean opcional.
 */
export const createTaskValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    userId: Joi.number().required(),
    completed: Joi.boolean().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

/**
 * Validación para actualizar una tarea.
 * También incluye "completed" como boolean opcional.
 */
export const updateTaskValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    userId: Joi.number().required(),
    completed: Joi.boolean().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

/**
 * Validación para obtener una tarea por ID.
 */
export const getTaskValidation = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};
