import { Schema, model, Document } from "mongoose";
interface IInstruction {
  text: string;
}

interface IExercise extends Document {
  name: string;
  description: string;
  type: string;
  instructions: IInstruction[];
  videoUrl: string;
  category: string
}

const InstructionsSchema = new Schema<IInstruction>({
  text: { type: String, required: true },
});

const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  instructions: { type: [InstructionsSchema], required: true },
  videoUrl: { type: String, required: true },
  category: { type: String, required: true },
});

const Exercise = model<IExercise>("Exercise", ExerciseSchema);

export default Exercise;
export { IExercise };
