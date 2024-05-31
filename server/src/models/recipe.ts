import { Schema, model, Document } from "mongoose";

interface IIngredient {
  name: string,
  amount: string
}

interface IRecipe extends Document {
  title: string;
  image: string;
  ingredients: IIngredient[];
  instruction: string;
  category: string;
}

const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  amount: { type: String, required: true },
});

const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: {type: [IngredientSchema], required: true},
  instruction: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const Recipe = model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
export { IRecipe };
