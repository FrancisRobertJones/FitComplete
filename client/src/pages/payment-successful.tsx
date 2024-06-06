/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0ch0Rck7KC3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { CheckIconCurrent } from "@/components/svg/checkicon";
import { Link } from "react-router-dom";

export const PaymentSuccessful = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="bg-green-500 rounded-full p-4">
            <CheckIconCurrent className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Payment Successful
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
                $99.99
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Payment Method
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Visa **** 1234
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Order Number
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                #12345
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
    </div>
  );
};


