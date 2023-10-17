import { FC } from "react";

interface IName {
  name: string;
}

export const Name: FC<IName> = ({ name }) => {
  return <span className="bold text-[25px] mx-5 text-black">{name}</span>;
};
