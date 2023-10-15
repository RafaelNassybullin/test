import Navbar from "@/components/navbar";
import apiCall from "@/lib";
import { User } from "@prisma/client";

const UserList = async () => {
  const { users } = await apiCall(`/api/get-users`);
  console.log(users);
  return (
    <>
      <Navbar />
      {users.map((item: User) => (
        <div className="w-1/2 flex items-center rounded-lg bg-neutral-100 hover:bg-neutral-200 h-[77px] px-5 ml-5 mb-5">
          <div className="w-[55px] overflow-hidden h-[55px] bg-purple-500 mr-7 rounded-full">
            <img
              className="w-full h-full object-cover"
              src={item.image}
              alt={item.name}
            />
          </div>
          <p>{item.name}</p>
        </div>
      ))}
    </>
  );
};

export default UserList;
