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
      const contents = await contentRepository.get(type);
      console.log("Contents fetched:", contents);
      return contents;
    } catch (error) {
      console.error(`Error fetching content: ${error}`);
      throw new Error("Error fetching content");
    }
  }
}

export default new ContentService();
