import { Schema, model, Document, Date } from "mongoose";
import { IExercise } from "./exercise";
import { IWorkoutExercise } from "../types/interfaces/workoutexercise";


interface IWorkout extends Document {
    title: string;
    exercises: IWorkoutExercise[];
    createdOn: Date;
    category: string;
}

const WorkoutExerciseSchema = new Schema<IWorkoutExercise>({
    exerciseId: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    reps: { type: String, required: false },
    sets: { type: String, required: false },
    duration: { type: String, required: false },
    videoURL: { type: String, required: true },
    instructions: { type: [String], required: true }
});

const WorkoutSchema = new Schema<IWorkout>({
    title: { type: String, required: true },
    exercises: { type: [WorkoutExerciseSchema], required: true },
    createdOn: { type: Date, default: Date.now() },
    category: { type: String, required: true },
});

const Workout = model<IWorkout>("Workout", WorkoutSchema);

export default Workout;
export { IWorkout };


