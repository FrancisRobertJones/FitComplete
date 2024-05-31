export class Exercise {
    constructor(
        public type: string,
        public title: string,
        public instructions: string,
        public video: string,
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
