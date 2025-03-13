// src/services/usuario.srv.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { encrypt } from "../utils/bcrypt.handle";

export const registerUsuario = async ({ email, password, name, role }: any) => {
  const checkIs = await prisma.user.findFirst({ where: { email } });
  if (checkIs?.email) return "ALREADY EXIST";
  const passHash = await encrypt(password);
  const response = await prisma.user.create({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
    data: {
      email,
      name,
      password: passHash,
      role: role ? role : "REGULAR",
    },
  });
  return response;
};

export const updateUsuario = async ({ id, name, email, password, role }: any) => {
  const checkIs = await prisma.user.findFirst({ where: { id } });
  if (!checkIs) return "NO_EXISTE";
  const response = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      password: await encrypt(password),
      role,
    },
  });
  return response;
};

export const getListUsuario = async () => {
  return await prisma.user.findMany();
};

export const getUsuario = async (id: number) => {
  return await prisma.user.findFirst({ where: { id } });
};

export const deleteUsuario = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
