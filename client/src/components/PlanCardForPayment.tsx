import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import axios from "axios";
import { useState, useEffect } from "react";
import { ISubscription } from "@/models/interfaces/subscription";
import { CheckIcon } from "./svg/checkicon";
import { XIcon } from "./svg/xicon";

interface IPlayCardProps {
  level: string;
}

export default function PlanCard({ level }: IPlayCardProps) {
  const [subscription, setSubscription] = useState<ISubscription>();


  useEffect(() => {
    const fetchSubscriptionFromParams = async () => {
      try {
        const res = await axios.get<ISubscription>(
          `http://localhost:3000/subscriptions/${level}`
        );
        console.log("this is res>>>", res);
        const subscription = res.data;
        setSubscription(subscription);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscriptionFromParams();
  }, []);


  let nameLowercase = subscription?.subscription.name
  let capitlisedName = ""
  if (nameLowercase) {
    let firstLetter = nameLowercase?.slice(0, 1);
    let firstLetterCapitilised = firstLetter.toUpperCase();
    capitlisedName = firstLetterCapitilised + nameLowercase.slice(1)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{capitlisedName} Subscription</CardTitle>
        <CardDescription>
          Unlock exclusive features and benefits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5" />
            <span>Free access to our workouts for everyone!!</span>
          </div>
          <div className="flex items-center gap-2">
            {level === "lite" ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <CheckIcon className="h-5 w-5" />
            )}
            <span>Access our workout video tutorials!!</span>
          </div>
          <div className="flex items-center gap-2">
            {level === "lite" || level === "basic" ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <CheckIcon className="h-5 w-5" />
            )}
            <span>Access to workout videos and healthy recipies!!</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-10">
          <span className="text-gray-500 dark:text-gray-400">Weekly</span>
          <span className="text-3xl font-bold">
            {subscription?.subscription.price && subscription?.subscription.price / 100} SEK
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

