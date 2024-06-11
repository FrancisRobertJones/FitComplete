import { WorkoutExercise } from "./Exercises";

export class NewWorkout {
    constructor(
        public title: string,
        public exercises: WorkoutExercise[],
        public thumbnail: string,
    ){}
}
