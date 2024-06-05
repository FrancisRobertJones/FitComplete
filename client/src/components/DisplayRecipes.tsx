import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IRecipe } from "@/models/interfaces/content";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";

interface IDisplayRecipesProps {
  recipes: IRecipe[];
}

export default function DisplayRecipes({ recipes }: IDisplayRecipesProps) {
  const [likedRecipes, setLikedRecipes] = useState([""]);
  const [completedRecipes, setCompletedRecipes] = useState([""]);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [currentRecipeInstructions, setCurrentRecipeInstructions] = useState<string[]>([]);
  const [currentRecipeIngredients, setCurrentRecipeIngredients] = useState<string[]>([]);
  const [currentRecipeName, setCurrentRecipeName] = useState<string>();

  const handleShowInstructions = (instructions: string[], name: string) => {
    setCurrentRecipeInstructions(instructions);
    setCurrentRecipeName(name);
    setShowInstructionsModal(true);
  };


  const handleLike = (id: string) => {
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter((workout) => workout !== id));
    } else {
      setLikedRecipes([...likedRecipes, id]);
    }
  };
  const handleComplete = (id: string) => {
    if (completedRecipes.includes(id)) {
      setCompletedRecipes(completedRecipes.filter((workout) => workout !== id));
    } else {
      setCompletedRecipes([...completedRecipes, id]);
    }
  };

  console.log("liked recipes >>>>>>", likedRecipes);
  console.log("completed recipes >>>>>>", completedRecipes);
  

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
                src="/placeholder.svg"
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
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                </div>
                <h1 className="text-4xl underline">{recipe.title}</h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleShowInstructions(recipe.instructions, recipe.title)
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentRecipeName} instructions</DialogTitle>
              <DialogDescription>Do the following:</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col mx-6">
              <ul>
                {currentRecipeInstructions.map((instruction) => {
                  return <li className="list-decimal">{instruction}</li>;
                })}
              </ul>
            </div>
            <div className="flex flex-col mx-6">
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
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function RepeatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
