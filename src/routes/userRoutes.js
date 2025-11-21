import { Router } from "express";
import { getMe, login, register } from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.post("/register", register);
userRoutes.get("/login", login);
userRoutes.get("/login/:id", getMe);

export default userRoutes;
