import userService from "../services/userService";
import { Request, Response } from "express";

class UserController {
    async createUser(request: Request, response: Response) {
        try {
            const user = await userService.createUser(request.body)
            response.status(201).json(user);
        } catch (error) {
            response.status(500).json({ error: "failed to create user." })
        }
    }

    async login(request: Request, response: Response) {
        try {
            const loginSuccesfull = await userService.login(request.body, request)
            if (!loginSuccesfull) {
                response.status(401).send("Credentials incorrect")
            } else {
                response.status(201).json(loginSuccesfull);
            }
        } catch (error) {
            response.status(500).json({ error: "failed to log in." })
        }
    }
}

export default new UserController();