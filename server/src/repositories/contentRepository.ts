import Recipe, { IRecipe } from "../models/recipe";
import Exercise, { IExercise } from "../models/exercise";
import Workout, { IWorkout } from "../models/workout";

class ContentRepository {
  async create(content: IExercise | IRecipe | IWorkout) {
    switch (content.category) {
      case "exercise":
        return Exercise.create(content);
      case "recipe":
        return Recipe.create(content);
      case "workout":
        return Workout.create(content);
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
      case "workouts":
        return Workout.find()
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
