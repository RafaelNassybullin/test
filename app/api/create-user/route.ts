import { prisma } from "@/_base"
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from 'fs/promises'
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {

  try {

    const data = await request.formData()
    const name = data.get("name") as string;
    const file: File | null = data.get('file') as unknown as File

    const nameExist = await prisma.user.findUnique({
      where: {
        name: name.trim()
      }
    })

    if (nameExist) {
      return NextResponse.json({ status: "nameExist" });
    }

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const image = `image-${nanoid()}.jpg`;
      const rootDir = path.join(
        process.env.ROOT_DIR || process.cwd(),
        `/public/image/${image}`
      )
      await writeFile(rootDir, buffer);

      const users = await prisma.user.create({
        data: {
          name,
          image
        }
      })

      await prisma.history.create({
        data: {
          userID: users.id,
          status: "CREATED",
          oldname: users.name,
          oldimage: users.image
        }
      })

    } else {

      const users = await prisma.user.create({
        data: {
          name,
          image: ""
        }
      })

      await prisma.history.create({
        data: {
          userID: users.id,
          status: "CREATED",
          oldname: users.name,
          oldimage: users.image
        }
      })
    }

    return NextResponse.json({ status: "success" });

  } catch {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      users: []
    });
  }
}
