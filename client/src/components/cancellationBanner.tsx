import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/authContext"
import { useContext } from "react"

export default function CancellationBanner() {
  const { authedUser } = useContext(AuthContext)

  return (
    <div className="bg-red-500 text-white py-3 px-4 flex items-center justify-between">
      <p className="text-sm font-medium">Your membership will expire on the {authedUser.activeUntil} and you will loose access. Renew now to avoid interruption.</p>
      <Button
        className="ml-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500"
      >
        Renew Membership
      </Button>
    </div>
  )
}