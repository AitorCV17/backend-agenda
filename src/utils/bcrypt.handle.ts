import { hash, compare } from "bcryptjs";

/**
 * Función para encriptar una contraseña.
 */
export const encrypt = async (pass: string) => {
    const passwordHash = await hash(pass, 8);
    return passwordHash;
};

/**
 * Función para verificar que una contraseña coincide con el hash.
 */
export const verified = async (pass: string, passHash: string) => {
    const isCorrect = await compare(pass, passHash);
    return isCorrect;
};
