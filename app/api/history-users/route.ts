import { prisma } from "@/_base"
import { NextRequest, NextResponse } from "next/server";

//get history api route
export async function GET(request: NextRequest) {
  try {
    const history = await prisma.history.findMany({
      orderBy: [{
        id: 'desc'
      }],
    })
    return NextResponse.json({ status: "success", history });
  } catch {
    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      history: []
    });
  }
}
