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
        public id: string | undefined,
        public name: string,
        public type: string,
        public reps: string,
        public sets: string,
        public duration?: string | null,
    ) {}
}
