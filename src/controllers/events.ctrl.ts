import { Request, Response } from "express";
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from "../services/event.srv";

export const createEventCtrl = async (req: Request, res: Response) => {
    try {
        const response = await createEvent(req.body);
        if ("error" in response) {
            res.status(400).json({ success: false, msg: response.error });
            return;
        }
        res.status(201).json({ success: true, msg: "Evento creado", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al crear el evento: " + error });
    }
};

export const getEventsCtrl = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const events = await getEvents(userId);
        res.status(200).json({ success: true, msg: "Eventos obtenidos", data: events });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener eventos: " + error });
    }
};

export const getEventCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const event = await getEvent(Number(id), userId);
        if (!event) {
            res.status(404).json({ success: false, msg: "Evento no encontrado" });
            return;
        }
        res.status(200).json({ success: true, msg: "Evento obtenido", data: event });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener el evento: " + error });
    }
};

export const updateEventCtrl = async (req: Request, res: Response) => {
    try {
        const response = await updateEvent(req.body);
        if ("error" in response) {
            res.status(400).json({ success: false, msg: response.error });
            return;
        }
        res.status(200).json({ success: true, msg: "Evento actualizado", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al actualizar el evento: " + error });
    }
};

export const deleteEventCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const response = await deleteEvent(Number(id), userId);
        if ("error" in response) {
            res.status(404).json({ success: false, msg: response.error });
            return;
        }
        res.status(200).json({ success: true, msg: "Evento eliminado", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al eliminar el evento: " + error });
    }
};
