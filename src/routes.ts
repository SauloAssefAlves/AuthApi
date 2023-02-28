import { Router } from "express";
import { UserController } from "./controller/UserControleer";
import { AuthController } from "./controller/AuthController";

const usercontroller = new UserController();
const authcontroller = new AuthController();

export const router = Router();

router.get("/users", usercontroller.index);
router.delete("/user_delete", usercontroller.delete);
router.post("/create", usercontroller.store);
router.post("/auth", authcontroller.autenticate);
