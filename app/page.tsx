"use client";
import Navbar from "@/components/navbar";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    if (file) {
      data.set("file", file);
    }
    
    if (!name) {
      return alert("title is required!");
    }

    try {
      data.set("name", name);
      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      await axios.post("/api/create-user", data, options);
      // .then(() => refetch());
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
          <div className="bg-neutral-300 hover:bg-neutral-400 cursor-pointer w-[150px] overflow-hidden mb-[50px] h-[150px] rounded-full">
            <input
              id="dropzone-file"
              type="file"
              // accept={accept}
              className="w-full h-full"
              onChange={(event) =>
                setFile((event.target as HTMLInputElement).files?.[0])
              }
            />
          </div>
          <input
            className="text-[30px] w-full p-[10px] rounded-xl bg-neutral-300 outline-none border-none"
            type="text"
            value={name}
            onChange={(event) =>
              setName((event.target as HTMLInputElement).value)
            }
            placeholder="Твое имя..."
          />
          <button className="text-[30px] mt-5 w-full text-white p-[10px] rounded-xl bg-purple-500 hover:bg-purple-400 outline-none border-none">
            Готово
          </button>
        </div>
      </form>
    </>
  );
}
