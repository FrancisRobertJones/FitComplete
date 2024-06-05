/**
 
v0 by Vercel.
@see https://v0.dev/t/9dDV2nBcAMT
Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IPlayCardProps {
  level: string;
}

export default function PlanCard({ level }: IPlayCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{level} Subscription</CardTitle>
        <CardDescription>
          Unlock exclusive features and benefits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 fill-green-500" />
            <span>Access to premium features</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 fill-green-500" />
            <span>Ad-free experience</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 fill-green-500" />
            <span>Priority support</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-10">
          <span className="text-gray-500 dark:text-gray-400">Monthly</span>
          <span className="text-3xl font-bold">$9.99</span>
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
