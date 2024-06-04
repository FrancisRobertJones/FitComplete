import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IWorkout } from "@/models/interfaces/content"

export default function DisplayWorkouts() {
    const [likedWorkouts, setLikedWorkouts] = useState([""])
    const [completedWorkouts, setCompletedWorkouts] = useState([""])
    const [showInstructionsModal, setShowInstructionsModal] = useState(false)
    const [currentWorkoutInstructions, setCurrentWorkoutInstructions] = useState([""])


    const handleShowInstructions = (instructions: [""]) => {
        setCurrentWorkoutInstructions(instructions)
        setShowInstructionsModal(true)
    }

    const handleLike = (id: string) => {
        if (likedWorkouts.includes(id)) {
            setLikedWorkouts(likedWorkouts.filter((workout) => workout !== id))
        } else {
            setLikedWorkouts([...likedWorkouts, id])
        }
    }
    const handleComplete = (id: string) => {
        if (completedWorkouts.includes(id)) {
            setCompletedWorkouts(completedWorkouts.filter((workout) => workout !== id))
        } else {
            setCompletedWorkouts([...completedWorkouts, id])
        }
    }


    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-8">Workout Routines</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    onClick={() => handleLike("burpees")}
                                    className={`w-auto h-auto flex items-center ${likedWorkouts.includes("burpees")
                                        ? "text-red-500 dark:text-red-500"
                                        : "text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    <HeartIcon className="w-4 h-4 mr-2" />
                                    Like
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`${completedWorkouts.includes("burpees")
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                                        }`}
                                    onClick={() => handleComplete("burpees")}
                                >
                                    <CheckIcon className="h-4 w-4 mr-2" />
                                    Completed
                                </Button>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Burpees</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <RepeatIcon className="w-4 h-4" />
                                    <span>3 sets of 10 reps</span>
                                </div>
                                <p className="text-sm mt-2">
                                    Burpees are a full-body exercise that work your arms, chest, legs, and core.
                                </p>
                                <div className="mt-2 flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <PlayIcon className="w-4 h-4 mr-2" />
                                        Watch Video
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleShowInstructions(
                                                ["pick up weight", "lift weight", "enjoy"],
                                            )
                                        }
                                    >
                                        Instructions
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Squats</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <RepeatIcon className="w-4 h-4" />
                                    <span>3 sets of 15 reps</span>
                                </div>
                                <p className="text-sm mt-2">Squats are a compound exercise that work your legs, glutes, and core.</p>
                                <div className="mt-2 flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <PlayIcon className="w-4 h-4 mr-2" />
                                        Watch Video
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleShowInstructions(
                                                "Stand with your feet shoulder-width apart, toes slightly turned out. Bend at the hips and knees to lower into a squat position, keeping your chest up and your weight in your heels. Pause, then drive through your heels to return to the starting position.",
                                            )
                                        }
                                    >
                                        Instructions
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Planks</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>3 sets of 60 seconds</span>
                                </div>
                                <p className="text-sm mt-2">Planks are a core exercise that work your abdominal muscles.</p>
                                <div className="mt-2 flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <PlayIcon className="w-4 h-4 mr-2" />
                                        Watch Video
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleShowInstructions(
                                                "Start in a push-up position, with your arms extended and your body in a straight line from your head to your heels. Engage your core by tightening your abdominal muscles. Hold this position for the desired time, breathing normally.",
                                            )
                                        }
                                    >
                                        Instructions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
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
    )
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
    )
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
    )
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
    )
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
    )
}