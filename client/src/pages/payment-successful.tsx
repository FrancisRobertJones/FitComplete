import { CheckIconCurrent } from "@/components/svg/checkicon";
import { AuthContext } from "@/context/authContext";
import { IOrderResponse } from "@/models/interfaces/order";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BicepSpinner from "../components/bicepSpinner";

export const PaymentSuccessful = () => {
  const { authedUser } = useContext(AuthContext);
  const sendCreateOrderRequest = useRef<boolean>(false)
  const [level, setLevel] = useState<number>()
  const [productName, setProductName] = useState<string>()
  const [orderResponse, setOrderResponse] = useState<IOrderResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const paymentSuccess = async () => {
      const searchParams = new URLSearchParams(location.search);
      const paymentIntentId = searchParams.get("payment_intent");
      const productFromParams = searchParams.get('level');

      productFromParams && setProductName(productFromParams)
      if (productFromParams === "basic") {
        setLevel(2)
      } else if (productFromParams === "premium") {
        setLevel(3)
      }

      if (authedUser.User?.email && !sendCreateOrderRequest.current) {
        sendCreateOrderRequest.current = true
        try {
          console.log("attempting to post data to endpoint in success")
          console.log("authedUser: ", authedUser);

          const response = await axios.post("http://localhost:3000/stripe/payment-successful",
            {
              payment_intent: paymentIntentId,
              userData: {
                name: (authedUser.User.firstName + ' ' + authedUser.User.lastName),
                level: level,
                userEmail: authedUser.User?.email,
              },
            }
          );
          console.log(response, "order creation response");
          setOrderResponse(response.data.order)
          setIsLoading(false)

        } catch (error) {
          console.log(error);
        }
      }
    };
    if (authedUser) paymentSuccess();
  }, [authedUser]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {isLoading ?
        <BicepSpinner /> :

        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-green-500 rounded-full p-4">
              <CheckIconCurrent className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Payment Successful for {productName} subscription
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Thank you for your payment. Your order is being processed.
            </p>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Amount Paid
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {orderResponse?.currency} {orderResponse?.amount && orderResponse?.amount / 100}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Renewal date
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {orderResponse?.activeUntil && new Date(orderResponse?.activeUntil).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Order Number
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {orderResponse?.transactionId}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to={"#"}
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
        }
    </div>
  );
};
