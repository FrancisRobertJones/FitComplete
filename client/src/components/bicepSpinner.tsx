
const BicepSpinner = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-[spin_4s_linear_infinite]">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-6xl">💪</div>
            <div className="text-6xl">💪</div>
            <div className="text-6xl">💪</div>
            <div className="text-6xl">💪</div>
          </div>
        </div>
      </div>
    )
  }
  
  export default BicepSpinner