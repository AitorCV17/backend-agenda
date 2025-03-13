import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createTaskValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    userId: Joi.number().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

export const updateTaskValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    userId: Joi.number().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

export const getTaskValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });
  const { error } = schema.validate(req.params);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};
