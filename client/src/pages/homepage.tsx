import AuthComponent from '@/components/AuthComponent'
import { Homepagecard } from '@/components/homepageCard'
import HomepageDashboard from '@/components/homepageDashboard'
import { AuthContext } from '@/context/authContext'
import { useContext } from 'react'


const Homepage = () => {
  const { authedUser } = useContext(AuthContext)

  return (
    <>
      <div className=''>
        <div className='flex justify-content mb-28'>
          <div className='flex flex-col mr-28'>
            <h1 className='text-8xl mb-12'>THIS IS HOME</h1>
            <h4 className='text-6xl mb-12'>Lorem ipsum</h4>
            <p className='text-xl mb-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          </div>
          {authedUser.loggedIn ? <HomepageDashboard /> : <AuthComponent />}

        </div>

        <div className='flex justify-between items-center w-full gap-4 pl-16'>
          <Homepagecard title={"Lite"} description={"Ideal for getting started"} linkUrl={'/payment/lite'} />
          <Homepagecard title={"Basic"} description={"For people looking for more"} linkUrl={'/payment/basic'} />
          <Homepagecard title={"Premium"} description={"The full package"} linkUrl={'/payment/premium'} />
        </div>

        <h1>hello</h1>
      </div>
    </>
  )
}

export default Homepage