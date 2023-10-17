import { prisma } from "@/_base"
import { NextRequest, NextResponse } from "next/server";

//update user api route
export async function GET(request: NextRequest) {
  // const id = request.nextUrl.searchParams.get('id');
  try {

    const id = 6
    const name = "Roxyyy"
    const img = ""

    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (user?.name !== name) {
      await prisma.user.update({
        where: {
          id: id
        },
        data: {
          name: name,
          image: "1.jpg"
        },
      })

      await prisma.history.create({
        data: {
          userID: id,
          status: "CHANGEDNAME",
          oldname: user?.name,
          newname: name,
          oldimage: user?.image
        }
      })
    }


    if (user?.image !== img) {
      await prisma.user.update({
        where: {
          id: id
        },
        data: {
          image: img
        },
      })
      await prisma.history.create({
        data: {
          userID: id,
          status: "CHANGEDIMAGE",
          newimage: img,
          newname: name,
          oldimage: user?.image
        }
      })
    }

    return NextResponse.json({ status: "success", user });

  } catch {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      // category: []
    });
  }
}
