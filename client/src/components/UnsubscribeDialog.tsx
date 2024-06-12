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

interface IUnsubscribeDialogProps {
  title: string;
}

export const UnsubscribeDialog = ({title}: IUnsubscribeDialogProps) => {
  const { authedUser } = useContext(AuthContext);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"destructive"}>{`Unsubscribe ${title}`} </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-10 py-10">
            <DialogTitle>Are you sure you want to unsubscribe?</DialogTitle>
            <Button onClick={() => unsubscribe(authedUser.User?.email as string)}>Yes</Button>
      </DialogContent>
    </Dialog>
  );
};
