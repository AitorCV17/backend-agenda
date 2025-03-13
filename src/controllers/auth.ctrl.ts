import { Request, Response } from "express";
import { refreshTokenLimit, loginUser } from "../services/auth.srv";

/**
 * Controlador para refrescar el token.
 */
export const refreshTokenLimitCtrl = async ({ body }: Request, res: Response) => {
    try {
        const { token } = body;
        const response = await refreshTokenLimit(token);
        if (response === "TOKEN_NO_VALID" || response === "NOT_FOUND_USER") {
            res.status(403).send({ success: false, msg: response === "TOKEN_NO_VALID" ? "Token no válido" : "Usuario no encontrado" });
            return;
        }
        res.status(200).send({ success: true, ...response });
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error al refrescar el token: " + error });
    }
};

/**
 * Controlador para el login de usuario.
 */
export const loginCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await loginUser(body);
        if (!response) {
            res.status(403).send({ success: false, msg: "Credenciales incorrectas" });
            return;
        }
        res.status(200).send({ success: true, ...response });
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error al iniciar sesión: " + error });
    }
};
