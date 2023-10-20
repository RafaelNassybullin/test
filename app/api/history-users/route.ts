import { prisma } from "@/_base"
import { NextResponse } from "next/server";

export async function GET() {
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
