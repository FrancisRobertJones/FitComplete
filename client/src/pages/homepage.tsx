import { Homepagecard } from '@/components/homepageCard'
import { Navbar } from '@/components/navbar'

const Homepage = () => {
  return (
    <>
                     <Navbar />
                     <h1 className='text-8xl mb-24'>THIS IS HOME</h1>
                     <div className='flex flex-col items-center'> 
                        <Homepagecard />
                        <Homepagecard />
                        <Homepagecard />
                    </div>
    </>
  )
}

export default Homepage