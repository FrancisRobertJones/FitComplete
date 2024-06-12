import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export const Profile = () => {
  const { authedUser } = useContext(AuthContext);
  const user = authedUser.User;

  return (
    <>
      <h1>Profile</h1>
      <p>
        User name: {user?.firstName} {user?.lastName}
      </p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      {authedUser.User?.role === "customer" && (
        <div className="flex items-center gap-6">
          <p>
            Are you interested in creating your own content? Send a request to
            us!
          </p>
          <Button>Request for creator role</Button>
        </div>
      )}
    </>
  );
};
