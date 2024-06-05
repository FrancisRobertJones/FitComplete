import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { ISubscription } from "@/models/interfaces/subscription";

interface IPlayCardProps {
  level: string;
}

export default function PlanCard({ level }: IPlayCardProps) {
  const [subscription, setSubscription] = useState<ISubscription>();

  console.log(level);

  useEffect(() => {
    const fetchSubscriptionFromParams = async () => {
      try {
        const res = await axios.get<ISubscription>(
          `http://localhost:3000/subscriptions/${level}`
        );
        console.log(res);
        const subscription = res.data;
        setSubscription(subscription);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscriptionFromParams();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{subscription?.subscription.level} Subscription</CardTitle>
        <CardDescription>
          Unlock exclusive features and benefits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 fill-green-500" />
            <span>Free access to our workouts for everyone!!</span>
          </div>
          <div className="flex items-center gap-2">
            {level === "Lite" ? (
              <XIcon className="h-5 w-5 fill-red-500" />
            ) : (
              <CheckIcon className="h-5 w-5 fill-green-500" />
            )}
            <span>Access our workout video tutorials!!</span>
          </div>
          <div className="flex items-center gap-2">
            {level === "Lite" || level === "Basic" ? (
              <XIcon className="h-5 w-5 fill-red-500" />
            ) : (
              <CheckIcon className="h-5 w-5 fill-green-500" />
            )}
            <span>Access to workout videos and healthy recipies!!</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-10">
          <span className="text-gray-500 dark:text-gray-400">Monthly</span>
          <span className="text-3xl font-bold">
            {subscription?.subscription.price} USD
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
