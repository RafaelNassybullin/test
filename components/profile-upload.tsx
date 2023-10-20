import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FC } from "react";

interface IProfileUpload {
  file: File | null | undefined | string;
  setFile: (event: ChangeEvent) => void;
  clearFile: () => void;
  mouseLeave: () => void;
  mouseEnter: () => void;
  previewUrl: string;
  hoverProfile: boolean;
}

export const ProfileUpload: FC<IProfileUpload> = ({
  file,
  setFile,
  clearFile,
  mouseLeave,
  mouseEnter,
  previewUrl,
  hoverProfile,
}) => {
  return (
    <>
      <div className="bg-neutral-300 relative cursor-pointer w-[150px] mb-[50px] h-[150px] rounded-full">
        {file && (
          <div
            onClick={() => {
              clearFile();
            }}
            className="absolute bottom-[5px] right-[5px] w-[30px] h-[30px] rounded-full grid place-items-center bg-red-400"
          >
            <XMarkIcon className="text-white w-[20px] h-[20px]" />
          </div>
        )}
        <div
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          className={`flex items-center justify-center w-full h-full`}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col overflow-hidden items-center justify-center w-full h-full rounded-full cursor-pointer"
          >
            <div
              className={`flex flex-col w-full h-full items-center justify-center`}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <>
                  {!file && hoverProfile ? (
                    <>
                      <p className="text-[20px]">Загрузить</p>
                      <p className="text-[20px]">фото?</p>
                    </>
                  ) : (
                    <UserIcon className="w-[90px] h-[90px] text-neutral-500" />
                  )}
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              accept=".png,.jpg,.jpeg"
              type="file"
              className="hidden"
              onChange={(event) => {
                if ((event.target as HTMLInputElement).files?.[0]) {
                  setFile(event);
                }
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
};
