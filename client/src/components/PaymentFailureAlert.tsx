import { Button } from "@/components/ui/button"
import { CircleAlertIcon } from "./svg/alertCircle"
import { Link } from "react-router-dom"

interface IPaymentFailureAlert {
  level: string
}

export default function PaymentFailureAlert({ level }: IPaymentFailureAlert) {

  const levelLink = level?.toLowerCase()
  return (
    <div className="bg-red-100 border border-red-200 rounded-lg p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center space-x-3">
        <CircleAlertIcon className="h-8 w-8 text-red-500" />
        <h3 className="text-red-900 font-semibold">Payment Failed</h3>
      </div>
      <p className="text-red-700 mt-2 mb-6">There was an issue processing your payment. Please update your payment details in order to access your content.</p>
      <div className="mt-4 flex justify-center items-center justify-between">
        <Link to={`/payment/${levelLink}`}>
          <Button>
            Retry Payment
          </Button>
        </Link>
        <Button>
          Logout
        </Button>
      </div>
    </div>
  )
}
