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
import { Link } from "react-router-dom"

interface IHomepageCardProps {
  title: string,
  description: string,
  linkUrl: string
  features: string[]
}

export function Homepagecard({ title, description, linkUrl, features }: IHomepageCardProps) {
  return (
    <Card className="w-[40%] mb-12">
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
                {features.map((feature) => {
                  return (
                    <li key={feature} className="list-disc ml-6">{feature}</li>
                  )
                })}
              </ul>
              <h4>Name of subscription level</h4>
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">

        <Link to={linkUrl}><Button>{`Subscribe ${title}`} </Button></Link>
      </CardFooter>
    </Card>
  )
}
