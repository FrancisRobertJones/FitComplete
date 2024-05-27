import { Express } from "express";
import express from 'express'

const router = express.Router()

router.post("/create", createUser)