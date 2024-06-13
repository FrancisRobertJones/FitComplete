import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useNavigate } from 'react-router-dom';


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

  if (contentType === "workout") {
    contentData = {
      ...state,
      instructions: instructions,
      category: contentType
    }
  }

  console.log(contentData);

  try {
    const response = await axios.post("http://localhost:3000/content/create", {
      contentData,
    });
    toast({
      title: "Success!",
      description: `Your ${contentType} has been saved`,
    })
    console.log(response.status);
    console.log(response, "<>>>>");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast({
        title: `There was a problem saving your ${contentType}!`,
        description: `${error.message}`,
      })
    }
    console.log(error);
  }
};

export const unsubscribe = async (email: string) => {
  try {
      const response = await axios.post(
        "http://localhost:3000/orders/unsubscribe",
        { email }
      );

      if (response.status === 200) {
        window.location.href = '/';

      }
    } catch (error: any) {
    console.error(error);
  }
};
