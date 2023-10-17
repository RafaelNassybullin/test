import { prisma } from "@/_base"
import { NextRequest, NextResponse } from "next/server";

//update user api route
export async function GET(request: NextRequest) {
  // const id = request.nextUrl.searchParams.get('id');
  try {
    // const h = await prisma.user.findMany()


    const user = await prisma.user.findUnique({
      where: {
        id: 6
      },


      // data: {
      //   name: "Rafaelssssss",
      //   image: "1.jpg"
      // }
    })







    return NextResponse.json({ status: "success", user });
  } catch {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      // category: []
    });
  }
}
