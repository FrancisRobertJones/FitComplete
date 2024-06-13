import PaymentFailureAlert from '@/components/PaymentFailureAlert'
import { AuthContext } from '@/context/authContext'
import React, { useContext, useEffect, useState } from 'react'

const PaymentUnsuccessful = () => {
  const { authedUser } = useContext(AuthContext)
  const levelNumber = authedUser.level
  const [level, setLevel] = useState("")

  useEffect(() => {
    if (levelNumber === 1) {
      setLevel("lite")
    } else if (levelNumber === 2) {
      setLevel("basic")
    } else if (levelNumber === 3) {
      setLevel("premium")
    }
  }, [levelNumber])

  return (
    <div>
      <PaymentFailureAlert level={level} />
    </div>
  )
}

export default PaymentUnsuccessful