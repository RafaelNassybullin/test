import { FC } from "react";

interface IListItemWrapper {
  children: React.ReactNode;
  className?: string;
}

const ListItemWrapper: FC<IListItemWrapper> = ({ children, className }) => {
  return (
    <div
      className={`${className} w-[95%] flex items-center justify-between rounded-lg bg-neutral-100 hover:bg-neutral-200 h-[77px] px-5 ml-5 mb-5`}
    >
      {children}
    </div>
  );
};

export default ListItemWrapper;
