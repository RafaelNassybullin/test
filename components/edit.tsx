import { PencilSquareIcon } from "@heroicons/react/24/solid";

export const Edit = () => {
  return (
    <div className="flex items-center cursor-pointer hover:text-purple-500">
      <PencilSquareIcon className="w-[30px] h-[30px] mr-3" />
      <p>Ред.</p>
    </div>
  );
};
