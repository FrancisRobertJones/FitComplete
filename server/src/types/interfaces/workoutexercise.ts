export interface IWorkoutExercise {
    exerciseId: string | undefined,
    name: string,
    type: string,
    reps: string,
    sets: string,
    duration?: string | null,
}