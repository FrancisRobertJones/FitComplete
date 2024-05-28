import { Express } from "express";
import express from 'express'
import UserController from '../controllers/userController'

const router = express.Router()

router.post("/create", UserController.createUser)


export default router;