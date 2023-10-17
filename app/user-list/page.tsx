import Navbar from "@/components/navbar";
import apiCall from "@/lib";
import { User } from "@prisma/client";
import { ListItemRow } from "@/components/list-item-row";

const UserList = async () => {
  const { users } = await apiCall(`/api/get-users`);

  return (
    <>
      <Navbar />
      {users.map((user: User) => (
        <ListItemRow
          name={user.name}
          image={user.image}
          date={user.createdAt}
        />
      ))}
    </>
  );
};

export default UserList;
