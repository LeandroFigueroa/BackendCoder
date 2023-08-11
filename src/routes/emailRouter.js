import { Router } from "express";
import { sendMailEthereal } from "../controllers/emailControllers.js";
const router = Router();
router.post('/send', sendMailEthereal);

export default router;