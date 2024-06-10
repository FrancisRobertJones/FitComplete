import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@radix-ui/react-separator"
import { Link } from "react-router-dom"
import { CheckIcon } from "./svg/checkicon"
import { XIcon } from "./svg/xicon"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/authContext"

interface IHomepageCardProps {
    title: string,
    description: string,
    linkUrl: string,
}

export function HomepagecardAuthed({ title, description, linkUrl,  }: IHomepageCardProps) {
    const [cardLevel, setCardLevel] = useState<number>()
    const { authedUser } = useContext(AuthContext)


    useEffect(() => {
        if (title === "Lite (FREE)") {
            setCardLevel(1)
        } else if (title === "Basic") {
            setCardLevel(2)
        } else if (title === "Premium") {
            setCardLevel(3)
        }
    }, [authedUser.level])

    const FEATURES = ["Workouts", "Videos", "Nutrition"]

    const FEATURE_ARRAY: { [key: string]: { noLine: string[], line: string[] } } = {
        "Lite (FREE)": {
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
        <Card className={authedUser.level === cardLevel ? "border-gray-900 bg-gray-900 text-gray-50 grid w-full items-center gap-4 border-2 w-[50%] mb-12" : "w-[50%] mb-12"}>
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
                {authedUser.level === cardLevel ?
                    <Link to={linkUrl}><Button variant={"destructive"}>{`Unscubscribe ${title}`} </Button></Link> :
                    <Link to={linkUrl}><Button>{`Change to ${title}`} </Button></Link>
                }
            </CardFooter>
            <Separator className="my-4" />
        </Card>
    )
}