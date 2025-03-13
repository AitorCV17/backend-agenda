// src/services/task.srv.ts
import { PrismaClient, Task } from "@prisma/client";
const prisma = new PrismaClient();

export const createTask = async (data: {
  title: string;
  description?: string;
  dueDate?: string;
  userId: number;
  completed?: boolean;
}): Promise<Task | { error: string }> => {
  if (!data.title) return { error: "El título es obligatorio" };
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      completed: data.completed ?? false, // Se guarda el valor enviado o false por defecto
      user: { connect: { id: data.userId } }
    }
  });
};

export const getTasks = async (userId: number): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { id: "desc" }
  });
};

export const getTask = async (id: number, userId: number): Promise<Task | null> => {
  return await prisma.task.findFirst({
    where: { id, userId }
  });
};

export const updateTask = async (data: {
  id: number;
  title?: string;
  description?: string;
  dueDate?: string;
  userId: number;
  completed?: boolean;
}): Promise<Task | { error: string }> => {
  const existing = await prisma.task.findFirst({
    where: { id: data.id, userId: data.userId }
  });
  if (!existing) return { error: "La tarea no existe" };
  return await prisma.task.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : existing.dueDate,
      completed: data.completed !== undefined ? data.completed : existing.completed,
    }
  });
};

export const deleteTask = async (id: number, userId: number): Promise<Task | { error: string }> => {
  const existing = await prisma.task.findFirst({
    where: { id, userId }
  });
  if (!existing) return { error: "La tarea no existe" };
  return await prisma.task.delete({
    where: { id }
  });
};
