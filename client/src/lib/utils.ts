import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create contents
export const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setState: React.Dispatch<React.SetStateAction<any>>,
  state: any
) => {
  const { name, value } = e.target;
  setState({ ...state, [name]: value });
};

export const handleSelect = (
  value: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  state: any
) => {
  setState({ ...state, type: value });
};

export const handleSubmit = async (
  state: any,
  instructions: string[],
  ingredients: string[],
  contentType: string
) => {
  let contentData = {
    ...state,
    instructions: instructions,
    category: contentType,
  };

  if (contentType === "recipe") {
    contentData = {
      ...contentData,
      ingredients: ingredients,
    };
  }

  console.log(contentData);
  
  try {
    const response = await axios.post("http://localhost:3000/content/create", {
      contentData,
    });
    console.log(response.status);
    console.log(response, "<>>>>");
  } catch (error) {
    console.log(error);
  }
};
