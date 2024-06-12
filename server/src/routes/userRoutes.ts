import express from 'express'
import UserController from '../controllers/userController'
import userController from "../controllers/userController";

const router = express.Router()

router.post("/create", UserController.createUser)
router.post("/login", UserController.login)
router.get("/get-all-users", userController.getAllUsers)
router.post("/switch-role", userController.switchRole)

export default router;