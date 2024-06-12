
import { AuthContext } from "@/context/authContext";
import React, { ChangeEvent, useContext, useState } from "react";

export const Profile = () => {
  const { authedUser } = useContext(AuthContext);
  const user = authedUser.User;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  console.log(user);

  return (
    <>
      <h1>Profile</h1>
      <p>
        User name: {user?.firstName} {user?.lastName}
      </p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </>
  );
};
