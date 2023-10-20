"use client";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ModalPopup } from "./modal-popup";
import { FC, useState } from "react";

interface IEdit {
  id: number;
  userName: string;
  image: string;
}

export const Edit: FC<IEdit> = ({ id, userName, image }) => {
  const [modalState, setModalState] = useState(false);

  const close = () => {
    setModalState(false);
  };

  return (
    <>
      <div
        onClick={() => setModalState(true)}
        className="flex items-center cursor-pointer hover:text-purple-500"
      >
        <PencilSquareIcon className="w-[30px] h-[30px] mr-3" />
        <p>Ред.</p>
      </div>
      {modalState && (
        <ModalPopup id={id} userName={userName} image={image} close={close} />
      )}
    </>
  );
};
