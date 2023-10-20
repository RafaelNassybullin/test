import { prisma } from "@/_base"
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from 'fs/promises';

export async function POST(request: NextRequest) {

  try {
    const data = await request.formData()

    const id = data.get('id') as string;
    const name = data.get("name") as string;
    const file: File | null | string = data.get('file');

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (user?.name !== name) {

      const nameExist = await prisma.user.findUnique({
        where: {
          name: name.trim()
        }
      })

      if (nameExist) {
        return NextResponse.json({ status: "nameExist" });
      }

      await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name: name,
        },
      })

      await prisma.history.create({
        data: {
          userID: Number(id),
          status: "CHANGEDNAME",
          oldname: user?.name,
          newname: name,
          oldimage: user?.image
        }
      })
    }

    if (file !== "notchanged" && file) {
      if (typeof file !== "string") {

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const image = `image-${nanoid()}.jpg`;

        const rootDir = path.join(
          process.env.ROOT_DIR || process.cwd(),
          `/public/image/${image}`
        )

        await writeFile(rootDir, buffer);

        await prisma.user.update({
          where: {
            id: Number(id)
          },
          data: {
            image
          }
        })

        await prisma.history.create({
          data: {
            userID: user?.id,
            status: "CHANGEDIMAGE",
            oldname: user?.name,
            newname: name,
            oldimage: user?.image,
            newimage: image
          }
        })
      }

    }

    if (file === "deleted") {
      await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          image: ""
        }
      })

      await prisma.history.create({
        data: {
          userID: user?.id,
          status: "CHANGEDIMAGE",
          oldname: user?.name,
          newname: name,
          oldimage: user?.image,
          newimage: ""
        }
      })
    }

    return NextResponse.json({ status: "success" });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
}
