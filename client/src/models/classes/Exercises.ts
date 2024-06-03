export class NewExercise {
    constructor(
        public type: string,
        public name: string,
        public instructions: string[],
        public videoUrl: string,
        public description: string
    ) {}
}
export class WorkoutExercise{
    constructor(
        public exerciseId: string | undefined,
        public name: string,
        public type: string,
        public reps: string,
        public sets: string,
        public duration?: string | null,
    ) {}
}

export class ExerciseFromDB {
    constructor(
        public _id: string | undefined,
        public type: string,
        public name: string,
        public instructions: string[],
        public videoUrl: string,
        public description: string
    ) {}
}