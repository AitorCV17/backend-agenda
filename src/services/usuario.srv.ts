import { PrismaClient, User } from "@prisma/client";
import { encrypt } from "../utils/bcrypt.handle";
const prisma = new PrismaClient();

/**
 * Función para registrar un nuevo usuario.
 * Verifica que no exista otro usuario con el mismo email.
 * Si no se envía el rol, se asigna "REGULAR" por defecto.
 */
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

/**
 * Función para actualizar un usuario.
 */
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

/**
 * Función para obtener la lista de usuarios.
 */
export const getListUsuario = async () => {
  return await prisma.user.findMany();
};

/**
 * Función para obtener un usuario por su id.
 */
export const getUsuario = async (id: number) => {
  const usuario = await prisma.user.findFirst({ where: { id } });
  return usuario;
};

/**
 * Función para eliminar un usuario por su id.
 */
export const deleteUsuario = async (id: number) => {
  const response = await prisma.user.delete({ where: { id } });
  return response;
};
