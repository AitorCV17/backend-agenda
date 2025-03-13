import { Request, Response } from "express";
import { createNote, getNotes, getNote, updateNote, deleteNote } from "../services/note.srv";

export const createNoteCtrl = async (req: Request, res: Response) => {
    try {
        const response = await createNote(req.body);
        if ("error" in response) {
            res.status(400).json({ success: false, msg: response.error });
            return;
        }
        res.status(201).json({ success: true, msg: "Nota creada", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al crear la nota: " + error });
    }
};

export const getNotesCtrl = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const notes = await getNotes(userId);
        res.status(200).json({ success: true, msg: "Notas obtenidas", data: notes });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener notas: " + error });
    }
};

export const getNoteCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const note = await getNote(Number(id), userId);
        if (!note) {
            res.status(404).json({ success: false, msg: "Nota no encontrada" });
            return;
        }
        res.status(200).json({ success: true, msg: "Nota obtenida", data: note });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener la nota: " + error });
    }
};

export const updateNoteCtrl = async (req: Request, res: Response) => {
    try {
        const response = await updateNote(req.body);
        if ("error" in response) {
            res.status(400).json({ success: false, msg: response.error });
            return;
        }
        res.status(200).json({ success: true, msg: "Nota actualizada", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al actualizar la nota: " + error });
    }
};

export const deleteNoteCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const response = await deleteNote(Number(id), userId);
        if ("error" in response) {
            res.status(404).json({ success: false, msg: response.error });
            return;
        }
        res.status(200).json({ success: true, msg: "Nota eliminada", data: response });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al eliminar la nota: " + error });
    }
};
