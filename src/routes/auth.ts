import { Router } from "express";
import { loginCtrl, refreshTokenLimitCtrl } from "../controllers/auth.ctrl";
import { LoginDto, TokenDto } from "../validations/dtos/auth.dto";
import { validateBodyDto } from "../middlewares/validate-dto";

const router = Router();

router.post("/login", validateBodyDto(LoginDto), loginCtrl);
router.post("/refresh-token", validateBodyDto(TokenDto), refreshTokenLimitCtrl);

export { router };
