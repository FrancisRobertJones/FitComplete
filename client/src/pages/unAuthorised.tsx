
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
                    <p className="text-gray-600 dark:text-gray-400">You do not have permission to access the requested page.</p>
                    <Link
                        to="/"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
            <div className='flex justify-between items-center w-full gap-4 pl-16'>
                <Homepagecard title={"Lite (FREE)"} description={"Ideal for getting started"} linkUrl={'/payment/lite'} />
                <Homepagecard title={"Basic"} description={"For people looking for more"} linkUrl={'/payment/basic'} />
                <Homepagecard title={"Premium"} description={"The full package"} linkUrl={'/payment/premium'} />
            </div>
        </div>
    )
}
