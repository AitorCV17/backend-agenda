import { PrismaClient, Event } from "@prisma/client";
const prisma = new PrismaClient();

export const createEvent = async (data: {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;  // Nuevo campo
  userId: number;
}): Promise<Event | { error: string }> => {
  if (!data.title) return { error: "El título es obligatorio" };
  if (new Date(data.startTime) >= new Date(data.endTime)) return { error: "La hora de inicio debe ser anterior a la de fin" };
  return await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      location: data.location,   // Se asigna la ubicación (puede ser undefined)
      user: { connect: { id: data.userId } }
    }
  });
};

export const getEvents = async (userId: number): Promise<Event[]> => {
  return await prisma.event.findMany({
    where: { userId },
    orderBy: { startTime: "asc" }
  });
};

export const getEvent = async (id: number, userId: number): Promise<Event | null> => {
  return await prisma.event.findFirst({
    where: { id, userId }
  });
};

export const updateEvent = async (data: {
  id: number;
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;   // Nuevo campo
  userId: number;
}): Promise<Event | { error: string }> => {
  const existing = await prisma.event.findFirst({
    where: { id: data.id, userId: data.userId }
  });
  if (!existing) return { error: "El evento no existe" };
  if (data.startTime && data.endTime && new Date(data.startTime) >= new Date(data.endTime)) {
    return { error: "La hora de inicio debe ser anterior a la de fin" };
  }
  return await prisma.event.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      startTime: data.startTime ? new Date(data.startTime) : existing.startTime,
      endTime: data.endTime ? new Date(data.endTime) : existing.endTime,
      // Si se envía "location", se actualiza; de lo contrario se mantiene el valor existente.
      location: data.location !== undefined ? data.location : existing.location
    }
  });
};

export const deleteEvent = async (id: number, userId: number): Promise<Event | { error: string }> => {
  const existing = await prisma.event.findFirst({
    where: { id, userId }
  });
  if (!existing) return { error: "El evento no existe" };
  return await prisma.event.delete({
    where: { id }
  });
};
