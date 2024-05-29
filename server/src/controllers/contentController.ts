import contentService from "../services/contentService";
import { Request, Response } from "express";

class ContentController {
  async createContent(request: Request, response: Response) {
    try {
      const content = await contentService.createContent(request.body);
      response.status(201).json(content);
    } catch (error) {
      response.status(500).json({ error: "failed to create content." });
    }
  }
}

export default new ContentController();
