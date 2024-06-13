import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { AuthContext } from "@/context/authContext";
import { IOrderResponse } from "@/models/interfaces/order";
import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { unsubscribe } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface IUnsubscribeDialogProps {
  title: string;
}

export const UnsubscribeDialog = ({ title }: IUnsubscribeDialogProps) => {
  const { authedUser } = useContext(AuthContext);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"destructive"}>{`Unsubscribe ${title}`} </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-10">
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mb-4">
          <AlertTriangle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
        </div>
        <DialogTitle className="text-2xl font-bold">Are you sure you want to unsubscribe?</DialogTitle>
        <DialogDescription className="text-gray-500 dark:text-gray-400 mt-2">You will have <span className="font-bold text-black">{authedUser.daysUntilPayment}</span> days of access left</DialogDescription>
        <Button onClick={() => unsubscribe(authedUser.User?.email as string)}>Yes</Button>
      </DialogContent>
    </Dialog>
  );
};
