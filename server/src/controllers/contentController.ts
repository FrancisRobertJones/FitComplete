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

  async getAllContents(request: Request, response: Response) {
    try {
      const type = request.query.type as string;
      console.log(type);
      const contents = await contentService.getAllContents(type);
      response.status(200).json(contents);
    } catch (error) {
      response.status(500).json({ error: "failed to get content." });
    }
  }
}

export default new ContentController();
