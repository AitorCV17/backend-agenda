import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

/**
 * Middleware para validar el cuerpo de la solicitud contra un DTO.
 */
export const validateBodyDto = (DtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(DtoClass, req.body);
        const errors = await validate(instance);
        if (errors.length > 0) {
            res.status(400).json({
                exito: false,
                statusCode: 400,
                errors: errors.map(err => err.constraints),
            });
            return;
        }
        next();
    };
};

/**
 * Middleware para validar los parámetros (req.params) contra un DTO.
 */
export const validateParamsDto = (DtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const paramsInstance: any = plainToInstance(DtoClass, req.params, {
            enableImplicitConversion: true,
        });
        const errors = await validate(paramsInstance);
        if (errors.length > 0) {
            res.status(400).json({
                exito: false,
                statusCode: 400,
                errors: errors.map(err => err.constraints),
            });
            return;
        }
        next();
    };
};
