import userService from "../services/userService";
import { Request, Response } from "express";

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            console.log(req.body)
            const user = await userService.createUser(req.body)
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "failed to create user." })
        }
    }
}


export default new UserController();