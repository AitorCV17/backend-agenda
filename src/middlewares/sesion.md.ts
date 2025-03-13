import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";

export const ValidateSession = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const jwtBearer = req.headers.authorization || "";
    const token = jwtBearer.split(" ")[1];
    if (!token) {
      res.status(401).json({ statusCode: 401, msg: "Token no proporcionado" });
      return;
    }
    const decoded = verifyToken(token) as { id: number; email: string; name: string };
    if (!decoded) {
      res.status(401).json({ statusCode: 401, msg: "Token no válido" });
      return;
    }
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ statusCode: 401, msg: "Error en la validación de la sesión" });
  }
};
