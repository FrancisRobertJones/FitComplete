import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { CheckIcon } from "./svg/checkicon";
import { XIcon } from "./svg/xicon";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { UnsubscribeDialog } from "./UnsubscribeDialog";





export function Homepagecard({
  title,
  description,
  linkUrl,
  price,
}: IHomepageCardProps) {
  const [cardLevel, setCardLevel] = useState<number>();
  const { authedUser } = useContext(AuthContext);


  useEffect(() => {
    if (title === "Lite") {
      setCardLevel(1);
    } else if (title === "Basic") {
      setCardLevel(2);
    } else if (title === "Premium") {
      setCardLevel(3);
    }
  }, [authedUser.level]);

  const FEATURES = ["Workouts", "Videos", "Nutrition"];

  const FEATURE_ARRAY: { [key: string]: { noLine: string[]; line: string[] } } =
  {
    Lite: {
      noLine: [FEATURES[0]],
      line: [FEATURES[1], FEATURES[2]],
    },
    Basic: {
      noLine: [FEATURES[0], FEATURES[1]],
      line: [FEATURES[2]],
    },
    Premium: {
      noLine: [FEATURES[0], FEATURES[1], FEATURES[2]],
      line: [],
    },
  };

  const FEATURES_NOLINE: (string | null)[] = [];
  const FEATURES_LINE: (string | null)[] = [];

  if (FEATURE_ARRAY[title]) {
    FEATURES_NOLINE.push(...FEATURE_ARRAY[title].noLine);
    FEATURES_LINE.push(...FEATURE_ARRAY[title].line);
  }

  return (
    <Card
      className={
        authedUser.loggedIn && authedUser.level === cardLevel
          ? "border-gray-900 bg-gray-900 text-gray-50 grid w-full items-center gap-4 border-2 w-[50%] mb-12"
          : "w-[50%] mb-12"
      }
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
          <span className="text-gray-500 dark:text-gray-400">Monthly</span>
          <span className="text-3xl font-bold">
            {subscription?.subscription.price && subscription?.subscription.price / 100} SEK
          </span>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex flex-col gap-5">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="included">Included in plan:</Label>
                <ul>
                  {FEATURES_NOLINE.map((feature) => {
                    return (
                      <div className="flex">
                        <CheckIcon className="h-5 w-5" />
                        <li key={feature} className="ml-6">
                          {feature}
                        </li>
                      </div>
                    );
                  })}
                  {FEATURES_LINE &&
                    FEATURES_LINE.map((feature) => {
                      return (
                        <div className="flex">
                          <XIcon className="h-5 w-5" />
                          <li key={feature} className="ml-6 line-through">
                            {feature}
                          </li>
                        </div>
                      );
                    })}
                </ul>
              </div>
            </div>
          </form>
          <p>
            <span className="text-3xl font-extrabold">{price}</span> SEK / month
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {authedUser.level === cardLevel ? (
          <UnsubscribeDialog title={title} />
        ) : (
          <Link to={linkUrl}>
            <Button>
              {authedUser.loggedIn
                ? `Change to ${title}`
                : `Subscribe ${title} plan`}{" "}
            </Button>
          </Link>
        )}
      </CardFooter>
      <Separator className="my-4" />
    </Card>
  );
}
