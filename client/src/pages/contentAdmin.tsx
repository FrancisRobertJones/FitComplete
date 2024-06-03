import ContentAdminInterFace from "@/components/ContentAdminInterface"
import WorkoutAdminInterface from "@/components/workoutAdminInterface"
import { NewExercise } from "@/models/classes/Exercises";
import { useState } from "react";



const ContentAdminPage = () => {
  const [newExercise, setNewExercise] = useState<NewExercise>(
    new NewExercise("", "", [""], "", "")
  );
  return (
    <div>
      <ContentAdminInterFace
        newExercise={newExercise}
        setNewExercise={setNewExercise}
      />
      <WorkoutAdminInterface
        newExercise={newExercise}
      />
    </div>
  )
}

export default ContentAdminPage