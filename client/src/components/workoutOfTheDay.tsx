/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2R25hiJt9l4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
/* "use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [likedExercises, setLikedExercises] = useState([])
  const toggleExpansion = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }
  const toggleLike = (index) => {
    if (likedExercises.includes(index)) {
      setLikedExercises(likedExercises.filter((i) => i !== index))
    } else {
      setLikedExercises([...likedExercises, index])
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto p-4 md:p-8">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <div className="p-4 md:p-6 border-b dark:border-gray-800">
            <h1 className="text-2xl font-bold">Workout Exercises - {today}</h1>
          </div>
          <div className="space-y-4 p-4 md:p-6">
            <Card>
              <img
                src="/placeholder.svg"
                alt="Pushups"
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Pushups</h3>
                    <p className="text-gray-500 dark:text-gray-400">3 sets of 15 reps</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-6 h-6 hover:bg-transparent ${
                        likedExercises.includes(0)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => toggleLike(0)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpansion(0)}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                {expandedIndex === 0 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Pushups are a classic exercise that work the chest, shoulders, and triceps. They are a great way to
                    build upper body strength and endurance.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <img
                src="/placeholder.svg"
                alt="Squats"
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Squats</h3>
                    <p className="text-gray-500 dark:text-gray-400">4 sets of 12 reps</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-6 h-6 hover:bg-transparent ${
                        likedExercises.includes(1)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => toggleLike(1)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpansion(1)}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                {expandedIndex === 1 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Squats are a compound exercise that work the quadriceps, hamstrings, and glutes. They are a
                    fundamental exercise for building lower body strength and power.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <img
                src="/placeholder.svg"
                alt="Lunges"
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Lunges</h3>
                    <p className="text-gray-500 dark:text-gray-400">3 sets of 10 reps per leg</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-6 h-6 hover:bg-transparent ${
                        likedExercises.includes(2)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => toggleLike(2)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpansion(2)}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                {expandedIndex === 2 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Lunges are a unilateral exercise that target the quadriceps, hamstrings, and glutes. They help
                    improve balance, stability, and lower body strength.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <img
                src="/placeholder.svg"
                alt="Bicep Curls"
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Bicep Curls</h3>
                    <p className="text-gray-500 dark:text-gray-400">4 sets of 12 reps</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-6 h-6 hover:bg-transparent ${
                        likedExercises.includes(3)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => toggleLike(3)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpansion(3)}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                {expandedIndex === 3 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Bicep curls are an isolation exercise that target the biceps brachii muscle. They are a great way to
                    build arm strength and definition.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <img
                src="/placeholder.svg"
                alt="Shoulder Press"
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Shoulder Press</h3>
                    <p className="text-gray-500 dark:text-gray-400">3 sets of 10 reps</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-6 h-6 hover:bg-transparent ${
                        likedExercises.includes(4)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => toggleLike(4)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpansion(4)}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                {expandedIndex === 4 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    The shoulder press is a compound exercise that works the deltoids, triceps, and core. It's a great
                    exercise for building overhead pressing strength.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <img
                src="/placeholder.svg"
                alt="Deadlifts"
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Deadlifts</h3>
                    <p className="text-gray-500 dark:text-gray-400">5 sets of 8 reps</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-6 h-6 hover:bg-transparent ${
                        likedExercises.includes(5)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                      onClick={() => toggleLike(5)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpansion(5)}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                {expandedIndex === 5 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Deadlifts are a compound exercise that work the entire posterior chain, including the hamstrings,
                    glutes, and lower back. They are a fundamental exercise for building overall strength and power.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 sticky top-4 overflow-auto">
        <h2 className="font-bold text-xl mb-4">Workout Progress</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400" />
              <span>Liked Exercises</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">{likedExercises.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 fill-primary" />
              <span>Workout Completed</span>
            </div>
            <Button variant="outline" size="sm">
              Mark as Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props) {
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


function ChevronDownIcon(props) {
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


function HeartIcon(props) {
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
} */