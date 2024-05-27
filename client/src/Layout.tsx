import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <> 
                <main>
                    <Outlet />
                </main>
            <footer>
{/*                 <Footer />
 */}         </footer>
        </>
    )
}

export default Layout