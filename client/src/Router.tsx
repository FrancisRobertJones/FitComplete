import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/homepage";
import Premium from "./pages/levels/premium";
import ContentAdminPage from "./pages/contentAdmin";
import { Payment } from "./pages/payment";
import { PaymentSuccessful } from "./pages/payment-successful";
import Lite from "./pages/levels/lite";
import Basic from "./pages/levels/lite";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
          index: true,
        },
        {
          path: "/subscriptions/lite",
          element: <Lite />
        },
        {
            path: "/subscriptions/basic",
            element: <Basic />

        },
        {
            path: "/subscriptions/premium",
            element: <Premium /> 
        },
        {
          path: "/orders",
        },
         {
          path: "/success",
        },
        {
          path: "/contentadmin",
          element: <ContentAdminPage />
        },
        {
          path: "/payment/:level",
          element: <Payment />
        },
        {
          path: "/payment-successful",
          element: <PaymentSuccessful />
        }
      ]
    },
  ]);