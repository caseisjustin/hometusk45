import { Router } from "express";
import {signUp, verifyOtp} from "../controllers/user.controller.js"

const router = Router()

router.post("/register", signUp)
router.post("/login", verifyOtp)

export default router;