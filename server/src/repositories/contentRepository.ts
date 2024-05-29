import Recipe, { IRecipe } from "../models/recipe";
import Video, { IVideo } from "../models/video";
import Workout, { IWorkout } from "../models/workout";

class ContentRepository {
  async create(content: IWorkout | IVideo | IRecipe) {
    switch (content.level) {
      case 1:
        return Workout.create(content);
      case 2:
        return Video.create(content);
      case 3:
        return Recipe.create(content);
      default:
        throw new Error("Unknown level");
    }
  }

  async getAll(type: string) {
    switch (type) {
      case "workouts":
        return Workout.find();
      case "videos":
        return Video.find();
      case "recipes":
        return Recipe.find();
      default:
        throw new Error("Unknown type");
    }
  }

  async getSingle(type: string, id: string) {
    switch (type) {
      case "workouts":
        return Workout.findOne({ _id: id });
      case "videos":
        return Video.findOne({ _id: id });
      case "recipes":
        return Recipe.findOne({ _id: id });
      default:
        throw new Error("Unknown type");
    }
  }

  async update(type: string, id: string, newContent: IWorkout | IVideo | IRecipe) {
    switch (type) {
      case "workouts":
        return Workout.updateOne({ _id: id }, newContent);
      case "videos":
        return Video.updateOne({ _id: id }, newContent);
      case "recipes":
        return Recipe.updateOne({ _id: id }, newContent);
      default:
        throw new Error("Unknown type");
    }
  }

  async delete(type: string, id: string) {
    switch (type) {
      case "workouts":
        return Workout.deleteOne({ _id: id });
      case "videos":
        return Video.deleteOne({ _id: id });
      case "recipes":
        return Recipe.deleteOne({ _id: id });
      default:
        throw new Error("Unknown type");
    }
  }
}

export default new ContentRepository();
