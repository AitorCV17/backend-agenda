import { PrismaClient, Note } from "@prisma/client";
const prisma = new PrismaClient();

export const createNote = async (data: {
  title: string;
  content: string;
  userId: number;
}): Promise<Note | { error: string }> => {
  if (!data.title || !data.content) return { error: "El título y contenido son obligatorios" };
  return await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      user: { connect: { id: data.userId } }
    }
  });
};

export const getNotes = async (userId: number): Promise<Note[]> => {
  return await prisma.note.findMany({
    where: { userId },
    orderBy: { id: "desc" }
  });
};

export const getNote = async (id: number, userId: number): Promise<Note | null> => {
  return await prisma.note.findFirst({
    where: { id, userId }
  });
};

export const updateNote = async (data: {
  id: number;
  title?: string;
  content?: string;
  userId: number;
}): Promise<Note | { error: string }> => {
  const existing = await prisma.note.findFirst({
    where: { id: data.id, userId: data.userId }
  });
  if (!existing) return { error: "La nota no existe" };
  return await prisma.note.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content
    }
  });
};

export const deleteNote = async (id: number, userId: number): Promise<Note | { error: string }> => {
  const existing = await prisma.note.findFirst({
    where: { id, userId }
  });
  if (!existing) return { error: "La nota no existe" };
  return await prisma.note.delete({
    where: { id }
  });
};
