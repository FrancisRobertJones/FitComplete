import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export const Profile = () => {
  const { authedUser } = useContext(AuthContext);
  const user = authedUser.User;

  const requestCreator = async (email: string, name: string) => {
    try {
      const response = await axios.post("http://localhost:3000/users/request-creator", {
        "email": email,
        "name": name
      })
      if (response.status === 200) {
        toast({
          title: "Creator status requested!",
          description: "Our admin will be in touch shortly!"
        })} else {
          toast({
            variant: "destructive",
            title: "Creator status request problem!",
            description: "Please email our admin!"
          })
        }
      } catch (error) {
        console.log(error)
      }
    }


  return (
      <>
        <div className="container mx-auto py-12 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-12">Profile</h1>
          <div className="flex flex-col items-center space-y-10">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>image</AvatarFallback>
            </Avatar>
            <div className="space-y-8 text-center">
              <h2 className="font-bold text-3xl">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {user?.email}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {" "}
                {user?.role}
              </p>
            </div>
            {authedUser.User?.role === "customer" && (
              <div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button onClick={() => { if (user) requestCreator(user.email, user.firstName) }}>Request Creator Role</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="mt-6 text-sm">
                    Are you interested in creating your own content? Send a
                    request to us!
                  </HoverCardContent>
                </HoverCard>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
