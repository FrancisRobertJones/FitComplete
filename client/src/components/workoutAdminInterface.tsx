/**
 * v0 by Vercel.
 * @see https://v0.dev/t/i6Xz0xJPDfs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ExerciseFromDB, NewExercise, WorkoutExercise } from "@/models/classes/Exercises"
import axios from "axios"

interface IWorkoutAdminInterface {
  newExercise: NewExercise
}

export default function WorkoutAdminInterface({ newExercise }: IWorkoutAdminInterface) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedExercise, setSelectedExercise] = useState<WorkoutExercise>()
  const [reps, setReps] = useState<string>("0")
  const [sets, setSets] = useState<string>("0")
  const [duration, setDuration] = useState("0")
  const [showModal, setShowModal] = useState(false)
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([])
  const [exercisesFromDb, setExercisesFromDb] = useState<ExerciseFromDB[]>([])


  const getAllWorkouts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/content?type=exercise");
      const exercisesFromDb = res.data
      console.log(exercisesFromDb)
      return exercisesFromDb
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExercisesAndTransformToWorkoutExercises = useCallback(async () => {
    const exercisesFromDb = await getAllWorkouts()
    setExercisesFromDb(exercisesFromDb)
  }, [newExercise])



  useEffect(() => {
    fetchExercisesAndTransformToWorkoutExercises()
  }, [fetchExercisesAndTransformToWorkoutExercises]);


  const transformToWorkoutExercise = (exercise: ExerciseFromDB) => {
    let repsForWorkout = "";
    let setsForWorkout = "";
    let duration: string | null = null;

    if (exercise.type === "cardio" || exercise.type === "warmup" || exercise.type === "cooldown") {
      repsForWorkout = "0",
        setsForWorkout = "0",
        duration = "10"
    } else {
      repsForWorkout = "12",
        setsForWorkout = "3",
        duration = "0"
    }
    return new WorkoutExercise(
      exercise._id,
      exercise.name,
      exercise.type,
      repsForWorkout,
      setsForWorkout,
      duration
    );
  }

  const workoutExercisesFromDb = useMemo(() => {
    if (exercisesFromDb) {
      return exercisesFromDb.map(transformToWorkoutExercise);
    }

  }, [exercisesFromDb]);


  const handleExerciseSelect = (exercise: WorkoutExercise) => {
    setSelectedExercise(exercise)
    if (exercise.type === "warmup" || exercise.type === "cooldown" || exercise.type === "cardio") {
      setReps("0")
      setSets("0")
      setDuration(duration)
    } else {
      setReps(exercise.reps)
      setSets(exercise.sets)
      setDuration("0")
    }
    setShowModal(true)
  }

  useEffect(() => {
    console.log(workoutExercisesFromDb, "here are the transformed exerices>>>>")
  }, [workoutExercisesFromDb])

  const filteredExercises = workoutExercisesFromDb?.filter((exercise) => {
    return (
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTypes.length === 0 || selectedTypes.includes(exercise.type))
    )
  })
  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleAddExercise = () => {
    if (selectedExercise) {
      const exerciseToAdd = new WorkoutExercise(
        selectedExercise.exerciseId,
        selectedExercise.name,
        selectedExercise.type,
        reps,
        sets,
        duration,
      );
      setSelectedExercises([...selectedExercises, exerciseToAdd]);
      setShowModal(false);
    }
  };


  const handleRemoveExercise = (index: number) => {
    const updatedExercises = [...selectedExercises]
    updatedExercises.splice(index, 1)
    setSelectedExercises(updatedExercises)
  }
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1 p-8">
        <div className="flex items-center mb-6">
          <Input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 mr-4"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter by type <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {["pull", "push", "legs", "cardio", "cooldown", "warmup", "core", "arms"].map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredExercises?.map((exercise) => (
            <Card
              key={exercise.exerciseId}
              className={`cursor-pointer ${selectedExercise?.exerciseId === exercise.exerciseId
                ? "border-2 border-blue-500"
                : "border border-gray-200 dark:border-gray-800"
                }`}
              onClick={() => handleExerciseSelect(exercise)}
            >
              <CardHeader>
                <CardTitle>{exercise.name}</CardTitle>
                <CardDescription>{exercise.type}</CardDescription>
              </CardHeader>
              <CardContent />
              <CardFooter>
                <Button onClick={() => handleExerciseSelect(exercise)}>Add to Workout</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {showModal && (
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add {selectedExercise?.name} to Workout</DialogTitle>
                <DialogDescription>Set the reps, sets, or duration for this exercise.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {selectedExercise?.type === "warmup" || selectedExercise?.type === "cooldown" || selectedExercise?.type === "cardio" ? (
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor={`duration-${selectedExercise?.exerciseId}`} className="text-right">
                      Duration
                    </Label>
                    <Input
                      id={`duration-${selectedExercise?.exerciseId}`}
                      type="number"
                      min="0"
                      max="60"
                      step="10"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor={`reps-${selectedExercise?.exerciseId}`} className="text-right">
                        Reps
                      </Label>
                      <Input
                        id={`reps-${selectedExercise?.exerciseId}`}
                        type="number"
                        min="0"
                        max="20"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                      <Label htmlFor={`sets-${selectedExercise?.exerciseId}`} className="text-right">
                        Sets
                      </Label>
                      <Input
                        id={`sets-${selectedExercise?.exerciseId}`}
                        type="number"
                        min="0"
                        max="4"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleAddExercise}>Add to Workout</Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-8 w-[300px] border-l border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Selected Exercises</h2>
        {selectedExercises.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No exercises selected yet.</p>
        ) : (
          <div className="space-y-4">
            {selectedExercises.map((exercise, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{exercise.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {exercise.type === "warmup" || exercise.type === "cooldown" || exercise.type === "cardio"
                      ? `Duration: ${exercise.duration} minutes`
                      : `Reps: ${exercise.reps}, Sets: ${exercise.sets}`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  onClick={() => handleRemoveExercise(index)}
                >
                  <TrashIcon className="w-5 h-5" />
                  <span className="sr-only">Remove exercise</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}