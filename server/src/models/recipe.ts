import { Schema, model, Document } from "mongoose";

interface IIngredient {
  name: string,
  amount: string
}

interface IRecipe extends Document {
  title: string;
  imageUrl: string;
  ingredients: IIngredient[];
  instructions: string[];
  category: string;
}

const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  amount: { type: String, required: true },
});

const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: {type: [IngredientSchema], required: true},
  instructions: { type: [String], required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
});

const Recipe = model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
export { IRecipe };
