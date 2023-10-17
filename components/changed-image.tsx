import ListItemWrapper from "./list-item-wrapper";
import { Name } from "./name";
import { ProfileImage } from "./profile-image";
import { DateComponent } from "./date";
import { FC } from "react";
import Link from "next/link";

interface IChagedImage {
  id: number;
  oldimage: string;
  newname: string;
  newimage: string;
  date: Date | string;
}

export const ChangedImage: FC<IChagedImage> = ({
  id,
  oldimage,
  newname,
  newimage,
  date,
}) => {
  return (
    <ListItemWrapper className={"cursor-pointer"}>
      <Link
        href={`/user-history/${id}`}
        className="flex items-center w-full justify-between text-[20px] hover:text-zinc-700 text-zinc-700"
      >
        <div className="flex items-center">
          Пользователь: <ProfileImage image={oldimage} alt={newname} />
          <Name name={newname} />
          поменял(-а) изображение профиля на
          <ProfileImage image={newimage} alt={newname} />
        </div>

        <DateComponent date={date} />
      </Link>
    </ListItemWrapper>
  );
};
