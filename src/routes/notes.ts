import { Router } from "express";
import { createNoteCtrl, getNotesCtrl, getNoteCtrl, updateNoteCtrl, deleteNoteCtrl } from "../controllers/notes.ctrl";
import { ValidateSession } from "../middlewares/sesion.md";
import { createNoteValidation, updateNoteValidation, getNoteValidation } from "../validations/joi/note.valid";

const router = Router();

router.get("/", ValidateSession, getNotesCtrl);
router.get("/:id", ValidateSession, getNoteValidation, getNoteCtrl);
router.post("/", ValidateSession, createNoteValidation, createNoteCtrl);
router.put("/:id", ValidateSession, updateNoteValidation, updateNoteCtrl);
router.delete("/:id", ValidateSession, getNoteValidation, deleteNoteCtrl);

export { router };
