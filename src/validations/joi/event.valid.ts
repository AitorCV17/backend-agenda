import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createEventValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    location: Joi.string().optional(),  // Nuevo campo
    userId: Joi.number().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

export const updateEventValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
    location: Joi.string().optional(),  // Nuevo campo
    userId: Joi.number().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

export const getEventValidation = (req: Request, res: Response, next: NextFunction) => {
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
