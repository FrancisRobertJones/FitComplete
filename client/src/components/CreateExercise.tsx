import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NewExercise } from "@/models/classes/Exercises";
import { useState } from "react";
import { handleChange, handleSelect, handleSubmit } from "@/lib/utils";

interface ICreateExerciseProps {
  newExercise: NewExercise
  setNewExercise: React.Dispatch<React.SetStateAction<NewExercise>>
}

const CreateExercise = ({ newExercise, setNewExercise }: ICreateExerciseProps) => {
  const [exerciseInstructions, setExerciseInstructions] = useState<string[]>(
    []
  );
  const [currentExerciseInstruction, setCurrentExerciseInstruction] =
    useState("");


  console.log(newExercise);

  const addExerciseInstruction = () => {
    if (currentExerciseInstruction.trim() !== "") {
      setExerciseInstructions([
        ...exerciseInstructions,
        currentExerciseInstruction.trim(),
      ]);
      setCurrentExerciseInstruction("");
    }
  };

  const removeExerciseInstruction = (index: number) => {
    const updatedInstructions = [...exerciseInstructions];
    updatedInstructions.splice(index, 1);
    setExerciseInstructions(updatedInstructions);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Exercises</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your exercise content.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            onValueChange={(value) =>
              handleSelect(value, setNewExercise, newExercise)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warmup">Warmup</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="cooldown">Cooldown</SelectItem>
              <SelectItem value="pull">Pull</SelectItem>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="legs">Legs</SelectItem>
              <SelectItem value="back">Back</SelectItem>
              <SelectItem value="abs">Abs</SelectItem>
              <SelectItem value="arms">Arms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="exercise-video">Exercise Video</Label>
          <Input
            onChange={(e) => handleChange(e, setNewExercise, newExercise)}
            name="videoUrl"
            id="exercise-video"
            placeholder="Enter exercise video URL"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exercise-name">Name</Label>
          <Input
            onChange={(e) => handleChange(e, setNewExercise, newExercise)}
            name="name"
            id="exercise-name"
            placeholder="Enter exercise name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exercise-description">Description</Label>
          <Input
            onChange={(e) => handleChange(e, setNewExercise, newExercise)}
            name="description"
            id="exercise-description"
            placeholder="Enter exercise description"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recipe-instructions">Instructions</Label>
          <div className="flex flex-col gap-2">
            {exerciseInstructions.map((instruction, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="font-medium">{index + 1}.</span> {instruction}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExerciseInstruction(index)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <Input
                id="recipe-instructions"
                placeholder="Add instruction"
                value={currentExerciseInstruction}
                onChange={(e) => setCurrentExerciseInstruction(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addExerciseInstruction();
                  }
                }}
              />
              <Button onClick={addExerciseInstruction}>Add</Button>
            </div>
          </div>
          <Button
            onClick={() =>
              handleSubmit(newExercise, exerciseInstructions, [], "exercise")
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateExercise;
