import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// GET single document
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const document = await prisma.document.findFirst({
      where: {
        id: params.id,
        userId
      }
    })

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(document)

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to load document" },
      { status: 500 }
    )
  }
}

// UPDATE document
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    const updated = await prisma.document.updateMany({
      where: {
        id: params.id,
        userId
      },
      data: {
        title: body.title,
        content: body.content
      }
    })

    return NextResponse.json(updated)

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    )
  }
}

// DELETE document
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await prisma.document.deleteMany({
      where: {
        id: params.id,
        userId
      }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }
}