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

interface IIngredient {
  name: string;
  amount: string;
}

export interface IRecipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  status: string;
  level: number;
}