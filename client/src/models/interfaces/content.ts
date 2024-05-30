export interface IWorkout {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
  level: number;
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
  ingredients: IIngredient[];
  instruction: string;
  status: string;
  level: number;
}