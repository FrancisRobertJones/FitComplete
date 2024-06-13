import userRepository from "../repositories/userRepository";
import userService from "../services/userService";
import { Request, Response } from "express";

class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const user = await userService.createUser(request.body);
      response.status(201).json(user);
    } catch (error) {
      response.status(500).json({ error: "failed to create user." });
    }
  }

  async login(request: Request, response: Response) {
    try {
      const loginSuccesfull = await userService.login(request.body, request);
      if (!loginSuccesfull) {
        response.status(401).send("Credentials incorrect");
      } else {
        response.status(201).json(loginSuccesfull);
      }
    } catch (error) {
      response.status(500).json({ error: "failed to log in." });
    }
  }

  async getAllUsers(request: Request, response: Response) {
    try {
      const users = await userRepository.getAll();
      response.status(200).json({ users: users });
    } catch (error) {
      response.status(500).json({ error: "failed to get users." });
    }
  }

  async switchRole(request: Request, response: Response) {
    try {
      const { email, role } = request.body;
      const updatedUser = await userService.switchRole(email, role);
      response.status(200).json({ updatedUser: updatedUser });
    } catch (error) {
      response.status(500).json({ error: "failed to switch user role." });
    }
  }

  async requestCreator(request: Request, response: Response) {
    const { email, name } = request.body;
    try {
      const result = await userService.requestCreator(email, name);
      if (result) {
        if (result.success) {
          return response.status(200).json({ message: result.message });
        } else {
          return response.status(400).json({ message: result.message });
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
