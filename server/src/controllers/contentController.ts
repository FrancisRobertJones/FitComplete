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
      response.status(500).json({ error: "failed to get contents." });
    }
  }

  async getSingleContent(request: Request, response: Response) {
    try {
      const type = request.query.type as string;
      const id = request.params.id as string;
      const content = await contentService.getSingleContent(type, id);
      response.status(200).json(content);
    } catch (error) {
      response.status(500).json({ error: "failed to get content." });
    }
  }

  async editContent(request: Request, response: Response) {
    try {
      const type = request.query.type as string;
      const id = request.params.id as string;
      const updatedContent = await contentService.editContent(
        type,
        id,
        request.body
      );
      response.status(201).json(updatedContent);
    } catch (error) {
      response.status(500).json({ error: "failed to edit content." });
    }
  }

  async deleteContent(request: Request, response: Response) {
    try {
      const type = request.query.type as string;
      const id = request.params.id as string;
      const deletedContent = await contentService.deleteContent(type, id);
      response.status(201).json(deletedContent);
    } catch (error) {
      response.status(500).json({ error: "failed to delete content." });
    }
  }
}

export default new ContentController();
