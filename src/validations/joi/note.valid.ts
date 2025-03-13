import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createNoteValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    userId: Joi.number().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

export const updateNoteValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    userId: Joi.number().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  next();
};

export const getNoteValidation = (req: Request, res: Response, next: NextFunction) => {
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
