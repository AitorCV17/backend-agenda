// src/routes/usuario.ts
import { Router } from "express";
import { 
  registerCtrl, 
  updateSelfCtrl, 
  adminGetListUsuarioCtrl, 
  adminGetUsuarioCtrl, 
  adminUpdateUsuarioCtrl, 
  adminDeleteUsuarioCtrl 
} from "../controllers/usuario.ctrl";
import { validateBodyDto, validateParamsDto } from "../middlewares/validate-dto";
import { rolRequired } from "../middlewares/rol.md";
import { 
  RegisterUserDto, 
  UpdateSelfUserDto, 
  UpdateUserDto, 
  GetUserDto, 
  Role 
} from "../validations/dtos/usuario.dto";
import { ValidateSession } from "../middlewares/sesion.md";

const router = Router();

// Registro público: se puede usar directamente o vía DTO
router.post("/", registerCtrl);
router.post("/register", validateBodyDto(RegisterUserDto), registerCtrl);
router.put("/update", ValidateSession, validateBodyDto(UpdateSelfUserDto), updateSelfCtrl);

// Rutas para ADMIN
router.get("/list", rolRequired(Role.ADMIN), adminGetListUsuarioCtrl);
router.get("/only/:id", rolRequired(Role.ADMIN), validateParamsDto(GetUserDto), adminGetUsuarioCtrl);
router.put("/admin-update", rolRequired(Role.ADMIN), validateBodyDto(UpdateUserDto), adminUpdateUsuarioCtrl);
router.delete("/:id", rolRequired(Role.ADMIN), validateParamsDto(GetUserDto), adminDeleteUsuarioCtrl);

export { router };
