import { columns } from "@/components/users-table/columns";
import { DataTable } from "@/components/users-table/data-table";
import { IUpdatedUser, IUser } from "@/models/interfaces/user";
import axios from "axios";
import { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState<IUpdatedUser[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/get-all-users"
        );
        if (response.statusText === "OK") {
          const updatedUsers = response.data.users.map((user: IUser) => ({
            ...user,
            userName: `${user.firstName} ${user.lastName}`,
          }));
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
};
