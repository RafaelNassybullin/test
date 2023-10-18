"use client";
import Navbar from "@/components/navbar";
import { UserIcon, XMarkIcon, BackspaceIcon } from "@heroicons/react/24/solid";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [nameExist, setNameExist] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [hoverProfile, setHoverProfile] = useState<boolean>(false);

  const { push, refresh } = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    if (file) {
      data.set("file", file);
    }

    if (!name.trim()) {
      return alert("title is required!");
    }

    try {
      data.set("name", name.trim());
      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      await axios.post("/api/create-user", data, options).then((data) => {
        if (data.data.status === "nameExist") {
          setNameExist(data.data.status);
        } else {
          push("/user-list");
          refresh();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <form
        onSubmit={onSubmit}
        className="w-full h-[500px] flex justify-center items-center"
      >
        <div className="w-[440px] flex flex-col items-center">
          {/* profile */}
          <div className="bg-neutral-300 relative cursor-pointer w-[150px] mb-[50px] h-[150px] rounded-full">
            {file && (
              <div
                onClick={() => {
                  setFile(null);
                  setPreviewUrl("");
                }}
                className="absolute bottom-[5px] right-[5px] w-[30px] h-[30px] rounded-full grid place-items-center bg-red-400"
              >
                <XMarkIcon className="text-white w-[20px] h-[20px]" />
              </div>
            )}
            <div
              onMouseEnter={() => setHoverProfile(true)}
              onMouseLeave={() => setHoverProfile(false)}
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
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    if ((event.target as HTMLInputElement).files?.[0]) {
                      setFile((event.target as HTMLInputElement).files?.[0]);
                      setPreviewUrl(
                        URL.createObjectURL(
                          (event.target as HTMLInputElement).files?.[0] as Blob
                        )
                      );
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* input */}
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
              onChange={(event) => {
                setName((event.target as HTMLInputElement).value);
                setNameExist("");
              }}
              placeholder="Твое имя..."
            />

            {name && (
              <div className="absolute top-0 px-5 right-0 grid place-items-center h-full">
                <BackspaceIcon
                  onClick={() => setName("")}
                  className="cursor-pointer h-[30px] text-neutral-500"
                />
              </div>
            )}
          </div>
          {nameExist && (
            <p className="text-red-500">Имя пользователя уже существует!</p>
          )}

          {/* button */}
          <button className="text-[30px] mt-5 w-full text-white p-[10px] rounded-xl bg-purple-500 hover:bg-purple-400 outline-none border-none">
            Готово
          </button>
        </div>
      </form>
    </>
  );
}
