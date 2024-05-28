import { Schema, model, Document } from "mongoose";

interface IWorkout extends Document {
  title: string;
  description: string;
  imageUrl: string;
  status: string;
  level: number;
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, required: true },
  level: { type: Number, required: true },
});

const Workout = model<IWorkout>("Workout", WorkoutSchema);

export default Workout;
export { IWorkout };
