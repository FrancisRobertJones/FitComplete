import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { NewRecipe } from "@/models/classes/Recipe";
import { handleChange, handleSubmit } from "@/lib/utils";

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<string[]>([]);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [newRecipe, setNewRecipe] = useState<NewRecipe>(
    new NewRecipe("", "", [""], "", [""])
  );

  console.log(newRecipe);
  
  const addIngredient = (ingredient: string): void => {
    setIngredients([...ingredients, ingredient]);
  };
  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const addInstruction = () => {
    if (currentInstruction.trim() !== "") {
      setRecipeInstructions([...recipeInstructions, currentInstruction.trim()]);
      setCurrentInstruction("");
    }
  };
  const removeInstruction = (index: number) => {
    const updatedInstructions = [...recipeInstructions];
    updatedInstructions.splice(index, 1);
    setRecipeInstructions(updatedInstructions);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Recipes</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your recipe content.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="recipe-title">Title</Label>
          <Input
            id="recipe-title"
            name="title"
            placeholder="Enter recipe title"
            onChange={(e) => handleChange(e, setNewRecipe, newRecipe)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Image</Label>
          <Input
            id="recipe-image"
            name="imageUrl"
            type="file"
            onChange={(e) => handleChange(e, setNewRecipe, newRecipe)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipe-description">Description</Label>
          <Textarea
            id="recipe-description"
            name="description"
            placeholder="Enter recipe description"
            onChange={(e) => handleChange(e, setNewRecipe, newRecipe)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipe-ingredients">Ingredients</Label>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {ingredient}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Input
              id="recipe-ingredients"
              placeholder="Add ingredient name & amount"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.target as HTMLInputElement;
                  addIngredient(target.value);
                  target.value = "";
                }
              }}
            />
          </div>
        </div>
      </div>
        <div className="space-y-2">
          <Label htmlFor="recipe-instructions">Instructions</Label>
          <div className="flex flex-col gap-2">
            {recipeInstructions.map((instruction, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="font-medium">{index + 1}.</span> {instruction}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInstruction(index)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                id="recipe-instructions"
                placeholder="Add instruction"
                value={currentInstruction}
                onChange={(e) => setCurrentInstruction(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addInstruction();
                  }
                }}
              />
              <Button className="w-32" onClick={addInstruction}>Add</Button>
            </div>
          </div>
        </div>
        <Button
          onClick={() =>
            handleSubmit(newRecipe, recipeInstructions, ingredients, "recipe")
          }
        >
          Submit
        </Button>
    </div>
  );
};

export default CreateRecipe;
