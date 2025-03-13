import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Middleware para requerir un rol específico.
 * Verifica el token enviado en la cabecera, obtiene el usuario y
 * permite continuar solo si el usuario tiene el rol requerido.
 */
export const rolRequired = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const jwtBearer = req.headers.authorization || "";
      const token = jwtBearer.split(" ")[1];
      if (!token) {
        res.status(401).json({ msg: "Token no proporcionado" });
        return;
      }
      const decoded = verifyToken(token) as { id: number };
      if (!decoded) {
        res.status(401).json({ msg: "Token no válido" });
        return;
      }
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        res.status(404).json({ msg: "Usuario no encontrado" });
        return;
      }
      if (user.role !== requiredRole) {
        res.status(403).json({ msg: "No autorizado" });
        return;
      }
      // Guardamos el usuario en req.body para uso posterior si se requiere
      req.body.user = user;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token no válido" });
    }
  };
};
