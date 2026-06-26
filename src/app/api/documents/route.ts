import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// GET all documents for logged-in user
export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json([], { status: 401 })
    }

    const documents = await prisma.document.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.log(error)

    return NextResponse.json([], { status: 500 })
  }
}

// CREATE document
export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    const document = await prisma.document.create({
      data: {
        title: body.title || "Untitled Document",
        content: body.content || "",
        userId
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