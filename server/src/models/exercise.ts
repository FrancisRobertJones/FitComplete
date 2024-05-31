import { Schema, model, Document } from "mongoose";


interface IExercise extends Document {
  name: string;
  description: string;
  type: string;
  instructions: string[];
  videoUrl: string;
  category: string
}


const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  instructions: { type: [String], required: true },
  videoUrl: { type: String, required: true },
  category: { type: String, required: true },
});

const Exercise = model<IExercise>("Exercise", ExerciseSchema);

export default Exercise;
export { IExercise };
