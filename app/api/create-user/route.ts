import { prisma } from "@/_base"
import { NextRequest, NextResponse } from "next/server";

//get user api route
export async function GET(request: NextRequest) {
  // const category = request.nextUrl.searchParams.get('category');
  try {

    const users = await prisma.user.create({
      data: {
        name: "Roksana",
        image: "1.jpg"
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

    return NextResponse.json({ status: "success", users });

  } catch {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      users: []
    });
  }
}
