import { IRecipe } from "../models/recipe";
import { IVideo } from "../models/video";
import { IWorkout } from "../models/workout";
import contentRepository from "../repositories/contentRepository";

class ContentService {
  async createContent(contentData: IWorkout | IVideo | IRecipe) {
    try {
      const content = await contentRepository.create(contentData);
      console.log("Content created:", content);

      return content;
    } catch (error) {
      console.error(`Error creating content: ${error}`);
      throw new Error("Error creating content");
    }
  }

  async getAllContents(type: string) {
    try {
      const contents = await contentRepository.getAll(type);
      console.log("Contents fetched:", contents);
      return contents;
    } catch (error) {
      console.error(`Error fetching contents: ${error}`);
      throw new Error("Error fetching contents");
    }
  }

  async getSingleContent(type: string, id: string) {
    try {
      const content = await contentRepository.getSingle(type, id);
      console.log("Content fetched:", content);
      return content;
    } catch (error) {
      console.error(`Error fetching content: ${error}`);
      throw new Error("Error fetching content");
    }
  }

  async editContent(type: string, id: string, newData: IWorkout | IVideo | IRecipe) {
    try {
      const updatedContent = await contentRepository.update(type, id, newData);
      console.log("Content updated:", updatedContent);

      return updatedContent;
    } catch (error) {
      console.error(`Error updating content: ${error}`);
      throw new Error("Error updating content");
    }
  }

  async deleteContent(type: string, id: string) {
    try {
      const deletedContent = await contentRepository.delete(type, id);
      console.log("Content deleted:", deletedContent);
      return deletedContent;
    } catch (error) {
      console.error(`Error deleting content: ${error}`);
      throw new Error("Error deleting content");
    }
  }
}

export default new ContentService();
