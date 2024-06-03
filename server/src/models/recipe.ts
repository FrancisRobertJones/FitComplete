import { Schema, model, Document } from "mongoose";

interface IRecipe extends Document {
  title: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  category: string;
}

const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: {type: [String], required: true},
  instructions: { type: [String], required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
});

const Recipe = model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
export { IRecipe };
