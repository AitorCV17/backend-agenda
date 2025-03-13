// src/controllers/usuario.ctrl.ts
import { Request, Response } from "express";
import {
  deleteUsuario,
  getListUsuario,
  getUsuario,
  registerUsuario,
  updateUsuario,
} from "../services/usuario.srv";

/**
 * REGULAR: Registro de un nuevo usuario.
 * Se espera que req.body tenga { name, email, password, role }.
 */
export const registerCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await registerUsuario(req.body);
    if (response === "ALREADY EXIST") {
      res.status(400).json({ msg: "El usuario ya existe", exito: false });
      return;
    }
    res.status(200).json({ msg: "Usuario registrado correctamente", datos: response, exito: true });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Error al registrar el usuario: " + error, exito: false });
    return;
  }
};

/**
 * REGULAR: Actualización de datos del usuario logueado.
 * Se asume que ValidateSession añade req.body.userId.
 */
export const updateSelfCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenUserId = req.body.userId;
    if (req.body.id && req.body.id !== tokenUserId) {
      res.status(403).json({ msg: "No puede actualizar otros usuarios", exito: false });
      return;
    }
    req.body.id = tokenUserId;
    const response = await updateUsuario(req.body);
    if (response === "NO_EXISTE") {
      res.status(404).json({ msg: "El usuario no existe", exito: false });
      return;
    }
    res.status(200).json({ msg: "Usuario actualizado correctamente", datos: response, exito: true });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el usuario: " + error, exito: false });
    return;
  }
};

/* Rutas de ADMIN */

/**
 * ADMIN: Listar todos los usuarios.
 */
export const adminGetListUsuarioCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await getListUsuario();
    res.status(200).json({ msg: "Lista de usuarios obtenida correctamente", datos: response, exito: true });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener la lista de usuarios: " + error, exito: false });
    return;
  }
};

/**
 * ADMIN: Obtener un usuario por id.
 */
export const adminGetUsuarioCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await getUsuario(Number(id));
    if (!response) {
      res.status(404).json({ msg: "El usuario no existe", exito: false });
      return;
    }
    res.status(200).json({ msg: "Usuario obtenido correctamente", datos: response, exito: true });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el usuario: " + error, exito: false });
    return;
  }
};

/**
 * ADMIN: Actualizar cualquier usuario.
 */
export const adminUpdateUsuarioCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await updateUsuario(req.body);
    if (response === "NO_EXISTE") {
      res.status(404).json({ msg: "El usuario no existe", exito: false });
      return;
    }
    res.status(200).json({ msg: "Usuario actualizado correctamente", datos: response, exito: true });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el usuario: " + error, exito: false });
    return;
  }
};

/**
 * ADMIN: Eliminar un usuario por id.
 */
export const adminDeleteUsuarioCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await deleteUsuario(Number(id));
    res.status(200).json({ msg: "Usuario eliminado correctamente", datos: response, exito: true });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el usuario: " + error, exito: false });
    return;
  }
};
