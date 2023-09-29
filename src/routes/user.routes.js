import { Router } from "express";
import { getUser, createUser } from "../controllers/user.controller.js";

const router = Router();

router.get('/login', getUser);
router.post('/create', createUser);

export default router;