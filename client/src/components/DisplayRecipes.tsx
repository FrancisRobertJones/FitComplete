import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IRecipe } from "@/models/interfaces/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { HeartIcon } from "./svg/hearticon";
import { CheckIconCurrent } from "./svg/checkicon";

interface IDisplayRecipesProps {
  recipes: IRecipe[];
}

export default function DisplayRecipes({ recipes }: IDisplayRecipesProps) {
  const [likedRecipes, setLikedRecipes] = useState([""]);
  const [completedRecipes, setCompletedRecipes] = useState([""]);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [currentRecipeInstructions, setCurrentRecipeInstructions] = useState<
    string[]
  >([]);
  const [currentRecipeIngredients, setCurrentRecipeIngredients] = useState<
    string[]
  >([]);
  const [currentRecipeName, setCurrentRecipeName] = useState<string>();

  const handleShowInstructions = (instructions: string[], name: string, ingredients: string[]) => {
    setCurrentRecipeInstructions(instructions);
    setCurrentRecipeName(name);
    setCurrentRecipeIngredients(ingredients)
    setShowInstructionsModal(true);
  };

  const handleLike = (id: string) => {
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter((recipe) => recipe !== id));
    } else {
      setLikedRecipes([...likedRecipes, id]);
    }
  };
  const handleComplete = (id: string) => {
    if (completedRecipes.includes(id)) {
      setCompletedRecipes(completedRecipes.filter((recipe) => recipe !== id));
    } else {
      setCompletedRecipes([...completedRecipes, id]);
    }
  };

  console.log(recipes);
  


  const handleCloseInstructionsModal = () => {
    setShowInstructionsModal(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48 md:h-64">
              <img
                src={recipe.imageUrl}
                alt="Workout Thumbnail"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(recipe.title)}
                    className={`w-auto h-auto flex items-center ${
                      likedRecipes.includes(recipe.title)
                        ? "text-red-500 dark:text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    className={`${
                      completedRecipes.includes(recipe.title)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                    onClick={() => handleComplete(recipe.title)}
                  >
                    <CheckIconCurrent className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                </div>
                <h1 className="text-4xl underline">{recipe.title}</h1>
                <p>{recipe.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleShowInstructions(recipe.instructions, recipe.title, recipe.ingredients)
                  }
                >
                  Instructions
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showInstructionsModal && (
        <Dialog
          open={showInstructionsModal}
          onOpenChange={setShowInstructionsModal}
        >
          <DialogContent className="max-w-fit w-full h-fit px-16 py-10">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {currentRecipeName}
              </DialogTitle>
              <DialogDescription>Do the following:</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-6 *:flex *:flex-col *:gap-4">
              <ul>
                {currentRecipeIngredients.map((ingredient) => {
                  return <li className="list-disc">{ingredient}</li>;
              })}
              </ul>
              <ul>
                {currentRecipeInstructions.map((instruction) => {
                  return <li className="list-decimal">{instruction}</li>;
                })}
              </ul>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowInstructionsModal(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
