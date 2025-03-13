import { Request, Response } from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../services/task.srv";

export const createTaskCtrl = async (req: Request, res: Response) => {
    try {
        const response = await createTask(req.body);
        if ("error" in response) {
            res.status(400).json({ success: false, msg: response.error });
            return;
        }
        res.status(201).json({ success: true, msg: "Tarea creada correctamente", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al crear la tarea: " + error });
    }
};

export const getTasksCtrl = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const tasks = await getTasks(userId);
        res.status(200).json({ success: true, msg: "Tareas obtenidas", data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener tareas: " + error });
    }
};

export const getTaskCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const task = await getTask(Number(id), userId);
        if (!task) {
            res.status(404).json({ success: false, msg: "Tarea no encontrada" });
            return;
        }
        res.status(200).json({ success: true, msg: "Tarea obtenida", data: task });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener la tarea: " + error });
    }
};

export const updateTaskCtrl = async (req: Request, res: Response) => {
    try {
        const response = await updateTask(req.body);
        if ("error" in response) {
            res.status(400).json({ success: false, msg: response.error });
            return;
        }
        res.status(200).json({ success: true, msg: "Tarea actualizada", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al actualizar la tarea: " + error });
    }
};

export const deleteTaskCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const response = await deleteTask(Number(id), userId);
        if ("error" in response) {
            res.status(404).json({ success: false, msg: response.error });
            return;
        }
        res.status(200).json({ success: true, msg: "Tarea eliminada", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al eliminar la tarea: " + error });
    }
};
