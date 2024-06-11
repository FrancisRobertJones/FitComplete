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

interface IUnsubscribeDialogProps {
  title: string;
}

export const UnsubscribeDialog = ({title}: IUnsubscribeDialogProps) => {
  const { authedUser } = useContext(AuthContext);
  const [isOrderCanceled, setIsOrderCanceled] = useState(false);
  const [orderData, setOrderData] = useState<IOrderResponse>();
  const [message, setMessage] = useState<string>();

  const unsubscribe = async () => {
    try {
      if (authedUser && authedUser.User && authedUser.User.email) {
        const email = authedUser.User.email;

        const response = await axios.post(
          "http://localhost:3000/orders/unsubscribe",
          { email }
        );

        if (response.status === 200) {
          setIsOrderCanceled(true);
          setOrderData(response.data.order);
          // TODO: Set authUser level === 0 (change homepage display)
        }
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"destructive"}>{`Unscubscribe ${title}`} </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-10 py-10">
        {isOrderCanceled && orderData ? (
          <>
            <DialogTitle>
              Your subscription has successfully canceled.
            </DialogTitle>
            <DialogDescription>
              You have access until{" "}
              {new Date(orderData.activeUntil).toLocaleDateString()}.
            </DialogDescription>
          </>
        ) : message ? (
          <DialogTitle>{message}</DialogTitle>
        ) : (
          <>
            <DialogTitle>Are you sure you want to unsubscribe?</DialogTitle>
            <Button onClick={unsubscribe}>Yes</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
