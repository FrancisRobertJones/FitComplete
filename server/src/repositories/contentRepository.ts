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

  async get(type: string) {
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
}

export default new ContentRepository();
