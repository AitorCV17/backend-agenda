import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { verified } from "../utils/bcrypt.handle";
import { verify } from "jsonwebtoken";
import { generateTokenLimitTime } from "../utils/jwt.handle";

export const refreshTokenLimit = async (token: string) => {
    try {
        const payload = verify(token, process.env.JWT_SECRET || "Tokenprueba", { ignoreExpiration: true }) as any;
        const { id, email, name } = payload;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return "NOT_FOUND_USER";
        const newToken = await generateTokenLimitTime(user.email, user.name, user.id);
        return { name: user.name, email: user.email, token: newToken };
    } catch (error) {
        return "TOKEN_NO_VALID";
    }
};

export const loginUser = async ({ email, password }: any) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return;
    const isCorrect = await verified(password, user.password);
    if (!isCorrect) return;
    const token = await generateTokenLimitTime(user.email, user.name, user.id);
    return { name: user.name, email: user.email, token };
};
