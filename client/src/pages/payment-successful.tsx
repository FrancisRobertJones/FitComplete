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

      if (authedUser.User?.email && !sendCreateOrderRequest.current && paymentIntentId) {
        sendCreateOrderRequest.current = true
        try {
          const { status, orderId } = await checkForExistingOrder(authedUser.User.email)
          if (status === 200 && orderId) {
            updateExistingOrder(paymentIntentId, orderId)
          }
          if (status === 404) {
            createNewOrder(paymentIntentId, authedUser.User.firstName, authedUser.User.lastName)
          }
        } catch (error) {
          console.log(error)
        }
      }
    };
    if (authedUser) paymentSuccess();
  }, [authedUser, location.search]);


  const checkForExistingOrder = async (email: string) => {
    try {
      console.log("checking for existing order on frontend")
      const response = await axios.post("http://localhost:3000/orders/get-one", { email });
      const orderId = response.data._id
      return { status: response.status, orderId };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return { status: 404 };
      }
      throw error;
    }
  }

  const updateExistingOrder = async (paymentIntentId: string, orderId: string) => {
    try {
      console.log(`Updating existing order with orderId: ${orderId}, paymentIntentId: ${paymentIntentId}`);

      const response = await axios.post("http://localhost:3000/orders/update-success", {
        orderId: orderId,
        payment_intent: paymentIntentId
      })
      console.log("updating existing order on frontend")
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)

    }
  }


  const createNewOrder = async (paymentIntentId: string, firstName: string, lastName: string) => {
    try {
      console.log("attempting to post data to endpoint in success")
      console.log("authedUser: ", authedUser);

      const response = await axios.post("http://localhost:3000/stripe/payment-successful",
        {
          payment_intent: paymentIntentId,
          userData: {
            name: (firstName + ' ' + lastName),
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
      setIsLoading(false)
    }
  }

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
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      }
    </div>
  );
};
