import Recipe, { IRecipe } from "../models/recipe";
import Exercise, { IExercise } from "../models/exercise";

class ContentRepository {
  async create(content: IExercise | IRecipe) {
    switch (content.category) {
      case "exercise":
        //TODO change from workout to exercise
        return Exercise.create(content);
      case "recipe":
        return Recipe.create(content);
        //TODO add workout create 
      default:
        throw new Error("Unknown category");
    }
  }

  async getAll(type: string) {
    switch (type) {
      case "exercise":
        return Exercise.find();
      case "recipes":
        return Recipe.find();
      default:
        throw new Error("Unknown type");
    }
  }

  async getSingle(type: string, id: string) {
    switch (type) {
      case "exercise":
        return Exercise.findOne({ _id: id });
      case "recipes":
        return Recipe.findOne({ _id: id });
      default:
        throw new Error("Unknown type");
    }
  }

  async update(
    type: string,
    id: string,
    newContent: IExercise | IRecipe
  ) {
    switch (type) {
      case "exercise":
        return Exercise.updateOne({ _id: id }, newContent);
      case "recipes":
        return Recipe.updateOne({ _id: id }, newContent);
      default:
        throw new Error("Unknown type");
    }
  }

  async delete(type: string, id: string) {
    switch (type) {
      case "exercise":
        return Exercise.deleteOne({ _id: id });
      case "recipes":
        return Recipe.deleteOne({ _id: id });
      default:
        throw new Error("Unknown type");
    }
  }
}

export default new ContentRepository();
