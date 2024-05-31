import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ButtonHeight, ButtonSecondary } from "./buttonSecondary"
import { AuthContext } from "@/context/authContext"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { LogOut } from "lucide-react"
import { Link } from "react-router-dom"



export function Navbar() {
  const { checkAuth, logOut, authedUser } = React.useContext(AuthContext)


  return (
    <>
      <NavigationMenu className="h-[60px] flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Home
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully description about our subscription application.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Our Products">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Profile/admin">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Login/logout">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {authedUser.loggedIn && <Button onClick={() => logOut()}>Logout</Button>}


        </NavigationMenuList>
        <div className="ml-auto">
              <Link to={"/subscriptions/basic"}><Button>Workouts</Button></Link>
              <Link to={"/subscriptions/medium"}><Button>Tutorials</Button></Link>
              <Link to={"/subscriptions/premium"}><Button>Recipies</Button></Link>
          </div>
      </NavigationMenu>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
