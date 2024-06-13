import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"


interface IFeatureComingSoonProps {
    title: string
}

export default function FeatureComingSoon({ title }: IFeatureComingSoonProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Change to {title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px] flex flex-col items-center justify-center p-8 text-center">
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mb-4">
                    <AlertTriangle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <DialogTitle className="text-2xl font-bold">This feature is coming soon</DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-400 mt-2">
                    We're working hard to bring you this new functionality. Stay tuned!
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

