import { sign, verify, decode } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "Tokenprueba";

/**
 * Función para generar un token con tiempo limitado (2 horas).
 */
export const generateTokenLimitTime = async (email: string, nombres: string, id: number) => {
    const jwt = await sign({ id, email, nombres, limit: "LIMIT" }, JWT_SECRET, { expiresIn: "2h" });
    return jwt;
};

/**
 * Función para generar un token sin límite de tiempo (o con otra configuración).
 */
export const generateTokenUnlimitTime = async (email: string, nombres: string, id: number) => {
    const jwt = await sign({ id, email, nombres, limit: "UNLIMIT" }, JWT_SECRET);
    return jwt;
};

/**
 * Función para verificar un token.
 */
export const verifyToken = (jwt: string) => {
    const isCorrect = verify(jwt, JWT_SECRET);
    return isCorrect;
};

/**
 * Función para decodificar un token y obtener su carga útil.
 */
export const getUserToken = (jwt: string) => {
    let getUser = decode(jwt);
    return getUser;
};
