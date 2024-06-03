import ContentAdminInterFace from "@/components/ContentAdminInterface";
import WorkoutAdminInterface from "@/components/workoutAdminInterface";
import { NewExercise } from "@/models/classes/Exercises";
import { useState } from "react";

const ContentAdminPage = () => {
  const [state, setState] = useState("workout");
  const [newExercise, setNewExercise] = useState<NewExercise>(
    new NewExercise("", "", [""], "", "")
  );
  return (
    <div>
      <ContentAdminInterFace
        state={state}
        setState={setState}
        newExercise={newExercise}
        setNewExercise={setNewExercise}
      />
      {state === "workout" && (
        <WorkoutAdminInterface newExercise={newExercise} />
      )}
    </div>
  );
};

export default ContentAdminPage;
