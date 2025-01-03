import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.get("/:documentID", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:documentID", userController.updateUser);
router.delete("/:documentID", userController.deleteUser);

export default router;