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
      const contents = await contentService.getAllContents(type);
      response.status(200).json(contents);
    } catch (error) {
      response.status(500).json({ error: "failed to get content." });
    }
  }

  async getSingleContent(request: Request, response: Response) {
    try {
        console.log(request.params.id);
      const type = request.query.type as string;
      const id = request.params.id as string;
      const content = await contentService.getSingleContent(type, id);
      response.status(200).json(content);
    } catch (error) {
      response.status(500).json({ error: "failed to get content." });
    }
  }
}

export default new ContentController();
