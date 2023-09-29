import { Router } from "express";
import { getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get('/login', getUser);
router.post('/create', createUser);
router.put('/events', updateUser);
router.delete('/events', deleteUser);

export default router;