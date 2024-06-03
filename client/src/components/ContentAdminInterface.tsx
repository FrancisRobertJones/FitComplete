/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7fQwUXj5qNd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NewExercise } from "@/models/classes/Exercises"
import CreateRecipe from "./CreateRecipe"
import CreateExercise from "./CreateExercise"

interface IContentadminInterfaceProps {
    newExercise: NewExercise
    setNewExercise: React.Dispatch<React.SetStateAction<NewExercise>>;
}

export default function ContentAdminInterFace({ newExercise, setNewExercise }: IContentadminInterfaceProps) {
    const [state, setState] = useState("workout")


    return (
        <div className="flex flex-col gap-8 p-6 md:p-10">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
            {state === "workout" && <CreateExercise
                newExercise={newExercise}
                setNewExercise={setNewExercise}
            />
            }
            {state === "recipes" && <CreateRecipe
            />
            }
        </div>
    );
}

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}