import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOutIcon, MenuIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { ChevronDownIcon } from "./svg/chevrondownicon"
import { AuthContext } from "@/context/authContext"
import { useContext } from "react"

export default function Navbar2() {

    const { checkAuth, logOut, authedUser } = useContext(AuthContext)


    return (
        <div className="flex flex-col">
            <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                    <Link to={"/"} className="font-bold" >
                        Fitness App
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="hidden lg:inline-flex items-center gap-1">
                                Admin
                                <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>
                                <Link to={"/"} >
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={"/"} >
                                    Users
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={"/"} >
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <nav className="hidden items-center gap-4 lg:flex">
                    <Link
                        to={"/"}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
/*             disabled={!userHasAccess("profile")}
 */          >
                        Home
                    </Link>
                    <Link
                        to={"/subscriptions/lite"}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
/*             disabled={!userHasAccess("workouts")}
 */          >
                        Workouts
                    </Link>
                    <Link
                        to={"/subscriptions/premium"}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
/*             disabled={!userHasAccess("recipes")}
 */          >
                        Recipes
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    {authedUser.loggedIn ? <Button onClick={logOut} variant="ghost" size="icon" className="hidden lg:inline-flex">
                        <LogOutIcon className="h-6 w-6" />
                        <span className="sr-only">Logout</span>
                    </Button> :
                        <Button>Login</Button>
                    }
                </div>
            </header>
            <div className="border-t border-gray-200 dark:border-gray-800" />
        </div>
    )
}

