
export const ModalPopup = ({ id, state, close }: any) => {
  return (
    <>
      {state && (
        <div className="fixed top-0 left-0 grid h-full w-full place-items-center backdrop-blur">
          <div className="relative rounded-[10px] border-[2px] border-dashed border-purple-500 bg-white p-[45px] text-black">
            <div
              onClick={close}
              className="absolute top-3.5 right-5 cursor-pointer text-[16px] text-white hover:text-red-400"
            >
              close
            </div>
            kjbkbjbkjb {id}
          </div>
        </div>
      )}
    </>
  );
};
