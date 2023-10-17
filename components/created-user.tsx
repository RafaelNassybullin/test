import ListItemWrapper from "./list-item-wrapper";
import { DateComponent } from "./date";
import { Name } from "./name";
import { ProfileImage } from "./profile-image";
import Link from "next/link";
import { FC } from "react";

interface ICreateUser {
  id: number;
  name: string;
  date: Date | string;
  oldimage: string;
}

export const CreatedUser: FC<ICreateUser> = ({ id, name, date, oldimage }) => {
  return (
    <ListItemWrapper className={"cursor-pointer"}>
      <Link
        href={`/user-history/${id}`}
        className="flex items-center w-full text-zinc-700 hover:text-zinc-700 justify-between text-[20px]"
      >
        <div>
          <div className="flex items-center ">
            <p>Пользователь:</p>
            <ProfileImage image={oldimage} alt={name} />
            <Name name={name} />
            <p>был создан!</p>
          </div>
        </div>

        <div className="ml-[40px]">
          <DateComponent date={date} />
        </div>
      </Link>
    </ListItemWrapper>
  );
};
