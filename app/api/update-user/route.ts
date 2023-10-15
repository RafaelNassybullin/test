import { prisma } from "@/_base"
import { NextRequest, NextResponse } from "next/server";

//update user api route
export async function GET(request: NextRequest) {
  // const id = request.nextUrl.searchParams.get('id');
  try {
    const h = await prisma.user.findMany()

    return NextResponse.json({ status: "success", h });
  } catch {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      // category: []
    });
  }
}
