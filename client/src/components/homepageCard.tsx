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

export function Homepagecard() {
  return (
    <Card className="w-[40%] mb-12">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <h4>Name of subscription level</h4>
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={"subscriptions/basic"}><Button>Subscribe basic</Button></Link>
        <Link to={"subscriptions/medium"}><Button>Subscribe medium</Button></Link>
        <Link to={"subscriptions/premium"}><Button>Subscribe premium</Button></Link>

      </CardFooter>
    </Card>
  )
}
