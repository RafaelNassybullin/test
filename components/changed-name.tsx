import ListItemWrapper from "./list-item-wrapper";
import Link from "next/link";
import { Name } from "./name";
import { DateComponent } from "./date";
import { ProfileImage } from "./profile-image";
import { FC } from "react";

interface IChangedName {
  id: number;
  name: string;
  date: Date | string;
  oldname: string;
}

export const ChangedName: FC<IChangedName> = ({ id, name, date, oldname }) => {
  return (
    <ListItemWrapper className={"cursor-pointer"}>
      <Link
        href={`/user-history/${id}`}
        className="flex items-center w-full justify-between text-[20px] hover:text-zinc-700 text-zinc-700"
      >
        <div className="flex items-center">
          Пользователь: <ProfileImage image={oldname} alt={name} />
          <Name name={name} />
          сменил имя на
          <Name name={name} />
        </div>
        <DateComponent date={date} />
      </Link>
    </ListItemWrapper>
  );
};
