import AuthComponent from '@/components/AuthComponent'
import { Homepagecard } from '@/components/homepageCard'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'

const Homepage = () => {
  return (
    <>
      <div className=''>
        <div className='flex justify-content mb-28'>
          <div className='flex flex-col mr-28'>
            <h1 className='text-8xl mb-12'>THIS IS HOME</h1>
            <h4 className='text-6xl mb-12'>Lorem ipsum</h4>
            <p className='text-xl mb-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          </div>


          <AuthComponent />
        </div>
        <div className='flex justify-between items-center w-full gap-4 pl-16'>
          <Homepagecard title={"Basic"} description={"Ideal for getting started"} linkUrl={'./levels/basic.tsx'} />
          <Homepagecard title={"Medium"} description={"For people looking for more"} linkUrl={'./levels/medium.tsx'} />
          <Homepagecard title={"Premium"} description={"The full package"} linkUrl={'./levels/premium.tsx'} />
        </div>
      </div>
    </>
  )
}

export default Homepage