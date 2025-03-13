import { Router } from "express";
import { createTaskCtrl, getTasksCtrl, getTaskCtrl, updateTaskCtrl, deleteTaskCtrl } from "../controllers/tasks.ctrl";
import { ValidateSession } from "../middlewares/sesion.md";
import { createTaskValidation, updateTaskValidation, getTaskValidation } from "../validations/joi/task.valid";

const router = Router();

router.get("/", ValidateSession, getTasksCtrl);
router.get("/:id", ValidateSession, getTaskValidation, getTaskCtrl);
router.post("/", ValidateSession, createTaskValidation, createTaskCtrl);
router.put("/:id", ValidateSession, updateTaskValidation, updateTaskCtrl);
router.delete("/:id", ValidateSession, getTaskValidation, deleteTaskCtrl);

export { router };
