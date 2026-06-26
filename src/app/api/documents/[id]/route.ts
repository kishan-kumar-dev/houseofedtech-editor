import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const DEV_USER_ID = "local-dev-user"

// GET single document
export async function GET(
  request: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } =
      await params

    const document =
      await prisma.document.findFirst({
        where: {
          id,
          userId:
            DEV_USER_ID
        }
      })

    if (!document) {
      return NextResponse.json(
        {
          error:
            "Document not found"
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json(
      document
    )

  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to load document"
      },
      {
        status: 500
      }
    )
  }
}

// UPDATE document
export async function PATCH(
  request: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } =
      await params

    const body =
      await request.json()

    const updated =
      await prisma.document.update({
        where: {
          id
        },

        data: {
          title:
            body.title,

          content:
            body.content
        }
      })

    return NextResponse.json(
      updated
    )

  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          "Update failed"
      },
      {
        status: 500
      }
    )
  }
}

// DELETE document
export async function DELETE(
  request: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } =
      await params

    await prisma.document.delete({
      where: {
        id
      }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          "Delete failed"
      },
      {
        status: 500
      }
    )
  }
}