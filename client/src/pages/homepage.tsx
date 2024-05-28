import { Homepagecard } from '@/components/homepageCard'
import { Navbar } from '@/components/navbar'

const Homepage = () => {
  return (
    <>
                     <Navbar />
                     <h1 className='text-8xl mb-24'>THIS IS HOME</h1>
                     <div className='flex flex-col items-center'> 
                        <Homepagecard title={"Basic"} description={"Ideal for getting started"} linkUrl={'./levels/basic.tsx'} features={["Workouts"]}/>
                        <Homepagecard title={"Medium"} description={"For people looking for more"} linkUrl={'./levels/basic.tsx'} features={["Workouts", "Videos"]}/>
                        <Homepagecard title={"Premium"} description={"The full package"} linkUrl={'./levels/basic.tsx'} features={["Workouts", "Videos", "Nutrition"]}/>
                    </div>
    </>
  )
}

export default Homepage