
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "@/components/svg/checkicon"
import { TriangleAlertIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Homepagecard } from "@/components/homepageCard"

export default function Component() {
    return (
        <div className="flex flex-col justify-center items-center h-[80vh] gap-24">
            <div className="flex items-center justify-center bg-white dark:bg-gray-800">
                <div className="mx-auto max-w-md space-y-4 text-center">
                    <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
                        Access Denied
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Please upgrade your subscription to access this page</p>
                </div>
            </div>
            <div className='flex justify-between items-center w-full gap-4 pl-16'>
                <Homepagecard title={"Lite (FREE)"} description={"Ideal for getting started"} linkUrl={'/payment/lite'} />
                <Homepagecard title={"Basic"} description={"For people looking for more"} linkUrl={'/payment/basic'} />
                <Homepagecard title={"Premium"} description={"The full package"} linkUrl={'/payment/premium'} />
            </div>
            <ul className='leading-relaxed'>
                        <li>🥉 Free Workouts: Browse and view a wide variety of workouts for free.</li>
                        <li>🥈 Video Access: Upgrade to unlock detailed video tutorials for every workout.</li>
                        <li>🥇 Premium Recipes: Elevate your nutrition with exclusive, delicious, and healthy recipes.</li>
                    </ul>
        </div>
    )
}
