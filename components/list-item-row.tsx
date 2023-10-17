import UserListWrapper from "@/components/list-item-wrapper";
import { ProfileImage } from "./profile-image";
import { Name } from "./name";
import { DateComponent } from "./date";
import { Edit } from "./edit";
import { FC } from "react";

interface IListItemRow {
  name: string;
  image: string;
  date: Date | string;
}

export const ListItemRow: FC<IListItemRow> = ({ name, image, date }) => {
  return (
    <UserListWrapper>
      <div className="flex text-[20px] items-center">
        <p className="mr-5">Пользователь:</p>
        <ProfileImage image={image} alt={name} />
        <Name name={name} />
      </div>
      <p className="text-[20px]">
        Создан: <DateComponent date={date} />
      </p>
      <Edit />
    </UserListWrapper>
  );
};
