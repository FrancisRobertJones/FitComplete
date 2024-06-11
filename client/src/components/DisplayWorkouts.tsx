import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IWorkout } from "@/models/interfaces/content";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckIconCurrent } from "./svg/checkicon";
import { ClockIcon } from "./svg/clockicon";
import { HeartIcon } from "./svg/hearticon";
import { PlayIcon } from "./svg/playicon";
import { AuthContext } from "@/context/authContext";
import { RepeatIcon } from "./svg/repeaticon";

interface IDisplayWorkoutsProps {
  workouts: IWorkout[];
}

export default function DisplayWorkouts({ workouts }: IDisplayWorkoutsProps) {
  const [likedWorkouts, setLikedWorkouts] = useState([""]);
  const [completedWorkouts, setCompletedWorkouts] = useState([""]);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [currentWorkoutInstructions, setCurrentWorkoutInstructions] = useState<
    string[]
  >([]);
  const [currentWorkoutName, setCurrentWorkoutName] = useState<string>();
  const { authedUser } = useContext(AuthContext);

  const handleShowInstructions = (instructions: string[], name: string) => {
    setCurrentWorkoutInstructions(instructions);
    setCurrentWorkoutName(name);
    setShowInstructionsModal(true);
  };

  const handleLike = (id: string) => {
    if (likedWorkouts.includes(id)) {
      setLikedWorkouts(likedWorkouts.filter((workout) => workout !== id));
    } else {
      setLikedWorkouts([...likedWorkouts, id]);
    }
  };
  const handleComplete = (id: string) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts(
        completedWorkouts.filter((workout) => workout !== id)
      );
    } else {
      setCompletedWorkouts([...completedWorkouts, id]);
    }
  };

  const handleCloseInstructionsModal = () => {
    setShowInstructionsModal(false);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Workout Routines</h1>
      <div className="grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-8">
        {workouts.map((workout) => (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={workout.thumbnail}
                alt="Workout Thumbnail"
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="grid gap-8">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(workout.title)}
                    className={`w-auto h-auto flex items-center ${
                      likedWorkouts.includes(workout.title)
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
                      completedWorkouts.includes(workout.title)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                    onClick={() => handleComplete(workout.title)}
                  >
                    <CheckIconCurrent className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                </div>
                <h1 className="text-4xl underline ">{workout.title}</h1>
                {workout.exercises.map((exercise) => (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">{exercise.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      {exercise.type === "cardio" ||
                      exercise.type === "warmup" ||
                      exercise.type === "cooldown" ? (
                        <>
                          <ClockIcon className="w-4 h-4" />
                          <span>{exercise.duration} minutes </span>
                        </>
                      ) : (
                        <>
                          <RepeatIcon className="w-4 h-4" />
                          <span>
                            {exercise.reps} reps {exercise.sets} sets
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm">{exercise.description}</p>
                    <div className="flex gap-2">
                      <Link
                        to={
                          authedUser.level && authedUser.level > 1
                            ? exercise.videoURL
                            : "/unauthorised"
                        }
                        target="_blank"
                      >
                        <Button variant="outline" size="sm">
                          <PlayIcon className="w-4 h-4 mr-2" />
                          Watch Video
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleShowInstructions(
                            exercise.instructions,
                            exercise.name
                          )
                        }
                      >
                        Instructions
                      </Button>
                    </div>
                  </div>
                ))}
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
              <DialogTitle>{currentWorkoutName} instructions</DialogTitle>
              <DialogDescription>Do the following:</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col mx-6">
              <ul>
                {currentWorkoutInstructions.map((instruction) => {
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
