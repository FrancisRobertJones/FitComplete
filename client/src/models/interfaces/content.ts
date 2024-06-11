import { WorkoutExercise } from "../classes/Exercises";

export interface IWorkout {
  _id: string;
  title: string;
  exercises: WorkoutExercise[]; //TODO fix description
  thumbnail: string
}

export interface IVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  status: string;
  level: number;
}
export interface IRecipe {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  status: string;
  level: number;
}