import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// GET single document
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await auth()
    const userId = authResult.userId
    const { id } = await params

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const document = await prisma.document.findFirst({
      where: {
        id,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await auth()
    const userId = authResult.userId
    const { id } = await params
    const body = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await prisma.document.updateMany({
      where: { id, userId },
      data: {
        title: body.title,
        content: body.content
      }
    })

    return NextResponse.json({ success: true })
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await auth()
    const userId = authResult.userId
    const { id } = await params

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const deleted = await prisma.document.deleteMany({
      where: {
        id,
        userId
      }
    })

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }
}