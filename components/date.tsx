import { FC } from "react";

interface IDate {
  date: Date | string;
}

export const DateComponent: FC<IDate> = ({ date }) => {
  
  const dateRU = new Date(date).toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = new Date(date).toLocaleTimeString("ru-RU");

  return <>{`${dateRU} ${time}`}</>;
};
