import { UserIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

interface IProfileImage {
  image: string;
  alt: string;
}

export const ProfileImage: FC<IProfileImage> = ({ image, alt }) => {
  return (
    <div className="w-[55px] ml-5 grid place-items-center overflow-hidden h-[55px] bg-neutral-300 rounded-full">
      {image ? (
        <img
          className="w-full h-full object-cover"
          src={`/image/${image}`}
          alt={alt}
        />
      ) : (
        <UserIcon className="w-[30px] h-[30px]" />
      )}
    </div>
  );
};
