import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/homepage";
import Basic from "./pages/levels/basic";
import Medium from "./pages/levels/medium";
import Premium from "./pages/levels/premium";
import ContentAdminPage from "./pages/contentAdmin";

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
          path: "/subscriptions/basic",
          element: <Basic />
        },
        {
            path: "/subscriptions/medium",
            element: <Medium />

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
        }
      ]
    },
  ]);