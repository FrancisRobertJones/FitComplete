import DisplayRecipes from "@/components/DisplayRecipes";
import { IRecipe } from "@/models/interfaces/content";
import axios from "axios";
import { useEffect, useState } from "react";

const Premium = () => {
  const [contents, setContents] = useState<IRecipe[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await axios.get(
        "http://localhost:3000/content?type=recipes"
      );
      setContents(response.data);
    };
    fetchContents();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      <DisplayRecipes recipes={contents} />
    </div>
  );
};

export default Premium;
