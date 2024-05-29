import AuthComponent from '@/components/AuthComponent'
import { Homepagecard } from '@/components/homepageCard'
import { Navbar } from '@/components/navbar'

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className='px-32 py-12'>
        <h1 className='text-8xl mb-24'>THIS IS HOME</h1>
        <div className='flex justify-content'>
          <AuthComponent />
          <div className='flex flex-col items-center w-full'>
            <Homepagecard title={"Basic"} description={"Ideal for getting started"} linkUrl={'./levels/basic.tsx'} features={["Workouts"]} />
            <Homepagecard title={"Medium"} description={"For people looking for more"} linkUrl={'./levels/basic.tsx'} features={["Workouts", "Videos"]} />
            <Homepagecard title={"Premium"} description={"The full package"} linkUrl={'./levels/basic.tsx'} features={["Workouts", "Videos", "Nutrition"]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage