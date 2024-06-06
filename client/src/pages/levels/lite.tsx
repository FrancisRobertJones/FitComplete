import DisplayWorkouts from "@/components/DisplayWorkouts";
import { IWorkout } from "@/models/interfaces/content";
import axios from "axios";
import { useEffect, useState } from "react";

const Lite = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await axios.get<IWorkout[]>(
        "http://localhost:3000/content?type=workouts"
      );
      console.log(response.data);
      setWorkouts(response.data);
    };
    fetchContents();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      <DisplayWorkouts workouts={workouts} />
    </div>
  );
};

export default Lite;
