/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7fQwUXj5qNd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NewExercise } from "@/models/classes/Exercises"
import axios from "axios"

export default function ContentAdminInterFace() {
    const [state, setState] = useState("workout")
    const [ingredients, setIngredients] = useState<string[]>([])
    const [recipeInstructions, setRecipeInstructions] = useState<string[]>([])
    const [currentInstruction, setCurrentInstruction] = useState("")
    const [exerciseInstructions, setExerciseInstructions] = useState<string[]>([])
    const [currentExerciseInstruction, setCurrentExerciseInstruction] = useState("")
    const [newExercise, setNewExercise] = useState<NewExercise>(new NewExercise("", "", [""], "", ""))


    const addIngredient = (ingredient: string): void => {
        setIngredients([...ingredients, ingredient])
    }
    const removeIngredient = (index: number) => {
        const updatedIngredients = [...ingredients]
        updatedIngredients.splice(index, 1)
        setIngredients(updatedIngredients)
    }

    const addInstruction = () => {
        if (currentInstruction.trim() !== "") {
            setRecipeInstructions([...recipeInstructions, currentInstruction.trim()])
            setCurrentInstruction("")
        }
    }
    const removeInstruction = (index: number) => {
        const updatedInstructions = [...recipeInstructions]
        updatedInstructions.splice(index, 1)
        setRecipeInstructions(updatedInstructions)
    }

    const addExerciseInstruction = () => {
        if (currentExerciseInstruction.trim() !== "") {
            setExerciseInstructions([...exerciseInstructions, currentExerciseInstruction.trim()])
            setCurrentExerciseInstruction("")
        }
    }
    const removeExerciseInstruction = (index: number) => {
        const updatedInstructions = [...exerciseInstructions]
        updatedInstructions.splice(index, 1)
        setExerciseInstructions(updatedInstructions)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewExercise({ ...newExercise, [e.target.name]: e.target.value })
        console.log(newExercise)
    }

    const handleSelect = (value: string) => {
        setNewExercise({ ...newExercise, type: value })
        console.log(newExercise)
    }

    const handleSubmit = async () => {
        const newExericseForSubmit = { ...newExercise, instructions: exerciseInstructions, category: "exercise" }
        try {
            const response = await axios.post("http://localhost:3000/content/create", { newExericseForSubmit })
            console.log(response.status)
            console.log(response, "<>>>>")
        } catch(error) {
            console.log(error)
        }
    }




    return (

        <div className="flex flex-col gap-8 p-6 md:p-10">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your exercises and workouts.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant={state === "workout" ? "default" : "secondary"} onClick={() => setState("workout")}>
                        Workout
                    </Button>
                    <Button variant={state === "recipes" ? "default" : "secondary"} onClick={() => setState("recipes")}>
                        Recipes
                    </Button>
                </div>
            </div>
            {state === "workout" && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold">Exercises</h2>
                        <p className="text-gray-500 dark:text-gray-400">Manage your exercise content.</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select onValueChange={(value) => handleSelect(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="warmup">Warmup</SelectItem>
                                    <SelectItem value="cardio">Cardio</SelectItem>
                                    <SelectItem value="cooldown">Cooldown</SelectItem>
                                    <SelectItem value="pull">Pull</SelectItem>
                                    <SelectItem value="push">Push</SelectItem>
                                    <SelectItem value="legs">Legs</SelectItem>
                                    <SelectItem value="back">Back</SelectItem>
                                    <SelectItem value="abs">Abs</SelectItem>
                                    <SelectItem value="arms">Arms</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="exercise-video">Exercise Video</Label>
                            <Input onChange={handleChange} name="videoUrl" id="exercise-video" placeholder="Enter exercise video URL" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="exercise-name">Name</Label>
                            <Input onChange={handleChange} name="name" id="exercise-name" placeholder="Enter exercise name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="exercise-description">Description</Label>
                            <Input onChange={handleChange} name="description" id="exercise-description" placeholder="Enter exercise description" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="recipe-instructions">Instructions</Label>
                            <div className="flex flex-col gap-2">
                                {exerciseInstructions.map((instruction, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        <span className="font-medium">{index + 1}.</span> {instruction}
                                        <Button variant="ghost" size="icon" onClick={() => removeExerciseInstruction(index)}>
                                            <XIcon className="w-4 h-4" />
                                        </Button>
                                    </div>


                                ))}
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="recipe-instructions"
                                        placeholder="Add instruction"
                                        value={currentExerciseInstruction}
                                        onChange={(e) => setCurrentExerciseInstruction(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                addExerciseInstruction()
                                            }
                                        }}
                                    />
                                    <Button onClick={addExerciseInstruction}>Add</Button>
                                </div>
                            </div>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            )
            }
            {
                state === "recipes" && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold">Recipes</h2>
                            <p className="text-gray-500 dark:text-gray-400">Manage your recipe content.</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="recipe-title">Title</Label>
                                <Input id="recipe-title" placeholder="Enter recipe title" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="recipe-description">Description</Label>
                                <Textarea id="recipe-description" placeholder="Enter recipe description" />
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
                                            <Button variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                                                <XIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Input
                                        id="recipe-ingredients"
                                        placeholder="Add ingredient"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                const target = e.target as HTMLInputElement
                                                addIngredient(target.value)
                                                target.value = ""
                                            }
                                        }}
                                    />
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
                                            <Button variant="ghost" size="icon" onClick={() => removeInstruction(index)}>
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
                                                    addInstruction()
                                                }
                                            }}
                                        />
                                        <Button onClick={addInstruction}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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