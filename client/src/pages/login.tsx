import AuthComponent from '@/components/AuthComponent'
import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
            <div className="flex items-center justify-center bg-white dark:bg-gray-800 mb-12">
                <div className="mx-auto max-w-md space-y-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
                        Login
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">To access our awesome fitness content</p>

    </div>
    </div>
    <AuthComponent />
    </div>
  )
}

export default Login