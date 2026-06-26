import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const DEV_USER_ID = "local-dev-user"

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      where: {
        userId: DEV_USER_ID
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.log(error)

    return NextResponse.json([], {
      status: 500
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const document = await prisma.document.create({
      data: {
        title: body.title || "Untitled",
        content: body.content || "",
        userId: DEV_USER_ID
      }
    })

    return NextResponse.json(document)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: "Failed creating document" },
      { status: 500 }
    )
  }
}