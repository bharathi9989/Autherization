import { Router } from "express";
import { getMe, login, register } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const userRoutes = Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/login/:_id", verifyToken, getMe);

export default userRoutes;
