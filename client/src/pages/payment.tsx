import { PaymentCard } from "@/components/PaymentCard";
import PlanCard from "@/components/PlanCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const Payment = () => {
  const { level } = useParams();

  return (
    <div className="flex gap-10 px-20 justify-center">
      {level && <PlanCard level={level} />}
      <PaymentCard />
    </div>
  );
};
