import { prisma } from "@/_base"
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const users = await prisma.user.findMany({
      orderBy: [{
        id: 'desc'
      }],
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
