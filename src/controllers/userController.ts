import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { documentID } = req.params;
      const user = await userService.getUserById(documentID);
      res.json(user);
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { documentID } = req.params;
      const updatedUser = await userService.updateUser(documentID, req.body);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { documentID } = req.params;
      await userService.deleteUser(documentID);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
