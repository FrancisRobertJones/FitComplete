import { Button } from "@/components/ui/button";
import { NewExercise } from "@/models/classes/Exercises";
import CreateRecipe from "./CreateRecipe";
import CreateExercise from "./CreateExercise";

interface IContentadminInterfaceProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  newExercise: NewExercise;
  setNewExercise: React.Dispatch<React.SetStateAction<NewExercise>>;
}

export default function ContentAdminInterFace({
  state,
  setState,
  newExercise,
  setNewExercise,
}: IContentadminInterfaceProps) {

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Creator Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your exercises and workouts.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={state === "workout" ? "default" : "secondary"}
            onClick={() => setState("workout")}
          >
            Workout
          </Button>
          <Button
            variant={state === "recipes" ? "default" : "secondary"}
            onClick={() => setState("recipes")}
          >
            Recipes
          </Button>
        </div>
      </div>
      {state === "workout" && (
        <CreateExercise
          newExercise={newExercise}
          setNewExercise={setNewExercise}
        />
      )}
      {state === "recipes" && <CreateRecipe />}
    </div>
  );
}
