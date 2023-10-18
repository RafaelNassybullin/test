"use client";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ModalPopup } from "./modal-popup";
import { useState } from "react";

export const Edit = ({ id }: any) => {
  const [state, setState] = useState(false);

  const close = () => {
    setState(false);
  };

  return (
    <>
      <div
        onClick={() => setState(true)}
        className="flex items-center cursor-pointer hover:text-purple-500"
      >
        <PencilSquareIcon className="w-[30px] h-[30px] mr-3" />
        <p>Ред.</p>
      </div>
      <ModalPopup id={id} state={state} close={close} />
    </>
  );
};
