import { BackspaceIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FC } from "react";

interface IInput {
  name: string;
  nameExist: string;
  clearInput: () => void;
  onChange: (event: ChangeEvent) => void;
}

export const Input: FC<IInput> = ({
  name,
  nameExist,
  clearInput,
  onChange,
}) => {
  return (
    <>
      <div className="w-full relative">
        <input
          className={`text-[30px] ${
            nameExist
              ? "border-red-500 border-[2px] border-solid"
              : "border-none"
          } w-full p-[10px] rounded-xl bg-neutral-300 outline-none`}
          type="text"
          value={name}
          maxLength={19}
          onChange={(event) => onChange(event)}
          placeholder="Твое имя..."
        />
        {name && (
          <div className="absolute top-0 px-5 right-0 grid place-items-center h-full">
            <BackspaceIcon
              onClick={clearInput}
              className="cursor-pointer h-[30px] text-neutral-500"
            />
          </div>
        )}
      </div>
      {nameExist && (
        <p className="text-red-500">Имя пользователя уже существует!</p>
      )}
    </>
  );
};
