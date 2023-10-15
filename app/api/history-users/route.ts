import { prisma } from "@/_base"
import { NextRequest, NextResponse } from "next/server";

//get user api route
export async function GET(request: NextRequest) {
  try {
    const history = await prisma.history.findMany()
    return NextResponse.json({ status: "success", history });
  } catch {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      history: []
    });
  }
}
