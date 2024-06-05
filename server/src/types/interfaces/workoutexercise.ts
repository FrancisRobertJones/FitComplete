export interface IWorkoutExercise {
    exerciseId: string | undefined,
    name: string,
    type: string,
    reps: string,
    sets: string,
    duration?: string | null,
    description: string,
    videoURL: string,
    instructions: string[]
}