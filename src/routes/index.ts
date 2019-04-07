import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import UsersController from "../controllers/users.controller";
import DefaultController from "../controllers/default.controller";

const router = Router();

router.get("/", DefaultController.index);
router.post("/auth/login", AuthController.login);

router.get("/users", UsersController.getAll);
router.get("/users/:id", UsersController.getOne);
router.post("/users", UsersController.create);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.delete);

export default router;
