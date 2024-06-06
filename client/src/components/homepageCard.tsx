import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@radix-ui/react-separator"
import { Link } from "react-router-dom"
import { CheckIcon } from "./svg/checkicon"
import { XIcon } from "./svg/xicon"

interface IHomepageCardProps {
  title: string,
  description: string,
  linkUrl: string
}

export function Homepagecard({ title, description, linkUrl }: IHomepageCardProps) {
  const FEATURES = ["Workouts", "Videos", "Nutrition"]

  const FEATURE_ARRAY: { [key: string]: { noLine: string[], line: string[] } } = {
    "Lite": {
      noLine: [FEATURES[0]],
      line: [FEATURES[1], FEATURES[2]]
    },
    "Basic": {
      noLine: [FEATURES[0], FEATURES[1]],
      line: [FEATURES[2]]
    },
    "Premium": {
      noLine: [FEATURES[0], FEATURES[1], FEATURES[2]],
      line: []
    }
  };

  const FEATURES_NOLINE: (string | null)[] = [];
  const FEATURES_LINE: (string | null)[] = [];

  if (FEATURE_ARRAY[title]) {
    FEATURES_NOLINE.push(...FEATURE_ARRAY[title].noLine);
    FEATURES_LINE.push(...FEATURE_ARRAY[title].line);
  }



  return (
    <Card className="w-[50%] mb-12">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="included">Included in plan:</Label>
              <ul>
                {FEATURES_NOLINE.map((feature) => {
                  return (
                    <div className="flex">
                      <CheckIcon className="h-5 w-5" />
                      <li key={feature} className="ml-6">{feature}</li>
                    </div>
                  )
                })}
                {FEATURES_LINE && FEATURES_LINE.map((feature) => {
                  return (
                    <div className="flex">
                      <XIcon className="h-5 w-5" />
                      <li key={feature} className="ml-6 line-through">{feature}</li>
                    </div>
                  )
                })}
              </ul>
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={linkUrl}><Button>{`Subscribe ${title}`} </Button></Link>
      </CardFooter>
      <Separator className="my-4" />
    </Card>
  )
}
