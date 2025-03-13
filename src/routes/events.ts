import { Router } from "express";
import { createEventCtrl, getEventsCtrl, getEventCtrl, updateEventCtrl, deleteEventCtrl } from "../controllers/events.ctrl";
import { ValidateSession } from "../middlewares/sesion.md";
import { createEventValidation, updateEventValidation, getEventValidation } from "../validations/joi/event.valid";

const router = Router();

router.get("/", ValidateSession, getEventsCtrl);
router.get("/:id", ValidateSession, getEventValidation, getEventCtrl);
router.post("/", ValidateSession, createEventValidation, createEventCtrl);
router.put("/:id", ValidateSession, updateEventValidation, updateEventCtrl);
router.delete("/:id", ValidateSession, getEventValidation, deleteEventCtrl);

export { router };
