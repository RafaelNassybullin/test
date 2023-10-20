import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ProfileUpload } from "@/components/profile-upload";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface IModalPopup {
  id: number;
  userName: string;
  image: string;
  close: () => void;
}

export const ModalPopup: FC<IModalPopup> = ({ id, userName, image, close }) => {
  const [name, setName] = useState<string>(userName);
  const [file, setFile] = useState<File | null | string | undefined>();
  const [nameExist, setNameExist] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [hoverProfile, setHoverProfile] = useState<boolean>(false);

  useEffect(() => {
    if (image) {
      setPreviewUrl(`/image/${image}`);
      setFile("notchanged");
    }
  }, []);

  const { refresh, push } = useRouter();

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
      data.set("id", String(id));
      data.set("name", name.trim());

      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      await axios.post("/api/update-user", data, options).then((data) => {
        if (data.data.status === "nameExist") {
          setNameExist(data.data.status);
        } else {
          push("/user-history");
          refresh();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 grid h-full w-full place-items-center backdrop-blur">
        <div className="relative rounded-[10px] border-[2px] border-dashed border-purple-500 bg-white p-[45px] text-black">
          <div
            onClick={close}
            className="absolute top-3.5 right-5 cursor-pointer text-[16px] text-red-400"
          >
            close
          </div>

          <form
            onSubmit={onSubmit}
            className="w-[440px] flex flex-col items-center"
          >
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
                setFile("deleted");
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
          </form>
        </div>
      </div>
    </>
  );
};
