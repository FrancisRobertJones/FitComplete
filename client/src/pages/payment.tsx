import { PaymentCard } from "@/components/PaymentCard";
import PlanCard from "@/components/PlanCard";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthContext } from "@/context/authContext";

const stripePromise = loadStripe("pk_test_51P1TQwRpeYHWrPIgsbNvxpB3TIi5D8nfaNLvsqHHQXdUXEKhJg69uGNUVGDJ0nqdN3wootBAe4O80PS9qoVw4Vrw00t4VeEE9g");
/* const stripePromise = loadStripe(
  "pk_test_51P11ke17MeC2urWPdWrIXo7Coa1UFEgdYlLMzQxK6YDJ8wvQIMJI3q10IkIv4ZRrbp2m8tdD8Hl5pgI6iZa5C5fG00GXNOc3W3"
); */

export const Payment = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { level } = useParams();
  const { authedUser } = useContext(AuthContext);
  const fetchedClientSecret = useRef<boolean>(false)

  useEffect(() => {
    const userEmail = authedUser.User?.email;
    if (userEmail && level && !fetchedClientSecret.current) {
      fetchedClientSecret.current = true;
      fetch("http://localhost:3000/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: { level: level, userEmail: userEmail } }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [level, authedUser]);

  const appearance: StripeElementsOptions["appearance"] = {
    theme: "stripe",
  };


  const options: StripeElementsOptions = {
    clientSecret: clientSecret!,
    appearance,
  };

  useEffect(() => { console.log(clientSecret) }, [clientSecret])


  return (
    <div className="flex gap-10 px-20 justify-center pt-24">
      {level && <PlanCard level={level} />}
      {clientSecret && level && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentCard level={level} />
        </Elements>
      )}
    </div>
  );
};
