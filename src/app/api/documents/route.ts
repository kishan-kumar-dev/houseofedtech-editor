import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// GET all documents
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const documents =
      await prisma.document.findMany({
        where: { userId },
        orderBy: {
          updatedAt: "desc"
        }
      })

    return NextResponse.json(documents)

  } catch (error) {

    console.error(
      "GET error:",
      error
    )

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}


// CREATE document
export async function POST(
  req: Request
) {

  try {

    const { userId } =
      await auth()

    if (!userId) {

      return NextResponse.json(
        {
          error: "Unauthorized"
        },
        {
          status: 401
        }
      )
    }

    const body =
      await req.json()

    const document =
      await prisma.document.create({
        data: {
          title:
            body.title ??
            "Untitled Document",

          content:
            body.content ??
            "",

          userId
        }
      })

    return NextResponse.json(
      document
    )

  } catch (error) {

    console.error(
      "POST error:",
      error
    )

    return NextResponse.json(
      {
        error: String(error)
      },
      {
        status: 500
      }
    )
  }
}