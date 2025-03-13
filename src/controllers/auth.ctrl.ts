// src/controllers/auth.ctrl.ts
import { Request, Response } from "express";
import { refreshTokenLimit, loginUser } from "../services/auth.srv";

/**
 * Controlador para refrescar el token.
 */
export const refreshTokenLimitCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { token } = body;
    const response = await refreshTokenLimit(token);
    if (response === "TOKEN_NO_VALID" || response === "NOT_FOUND_USER") {
      res.status(403).json({
        success: false,
        msg: response === "TOKEN_NO_VALID" ? "Token no válido" : "Usuario no encontrado",
      });
      return;
    }
    res.status(200).json({ success: true, ...response });
    return;
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error al refrescar el token: " + error });
    return;
  }
};

/**
 * Controlador para el login de usuario.
 */
export const loginCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    // Se espera que req.body contenga { email, password }
    const response = await loginUser(body);
    if (!response) {
      res.status(403).json({ success: false, msg: "Credenciales incorrectas" });
      return;
    }
    res.status(200).json({ success: true, ...response });
    return;
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error al iniciar sesión: " + error });
    return;
  }
};
