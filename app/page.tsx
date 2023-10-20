"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Navbar from "@/components/navbar";
import { ProfileUpload } from "@/components/profile-upload";
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

    if (typeof file !== "string" && file !== undefined && file !== null) {
      if (file.size > 700000) {
        return alert("Проститя! Но файл весит больше 700 кб");
      }
    }

    if (file) {
      data.set("file", file);
    }

    if (!name.trim()) {
      return alert("Имя пользователя обязательно!");
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
          <ProfileUpload
            file={file}
            setFile={(event) => {
              setFile((event.target as HTMLInputElement).files?.[0]);
              setPreviewUrl(
                URL.createObjectURL(
                  (event.target as HTMLInputElement).files?.[0] as Blob
                )
              );
            }}
            mouseLeave={() => setHoverProfile(false)}
            mouseEnter={() => setHoverProfile(true)}
            clearFile={() => {
              setFile(null);
              setPreviewUrl("");
            }}
            previewUrl={previewUrl}
            hoverProfile={hoverProfile}
          />

          <Input
            name={name}
            nameExist={nameExist}
            clearInput={() => setName("")}
            onChange={(event) => {
              setName((event.target as HTMLInputElement).value);
              setNameExist("");
            }}
          />

          <Button>Готово</Button>
        </div>
      </form>
    </>
  );
}
