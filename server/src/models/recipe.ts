import { Schema, model, Document } from "mongoose";

interface IRecipe extends Document {
  title: string;
  image: string;
  ingredients: string[];
  instruction: string;
  status: string;
  level: number;
}

const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: {type: [String], required: true},
  instruction: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true },
  level: { type: Number, required: true },
});

const Recipe = model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
export { IRecipe };
