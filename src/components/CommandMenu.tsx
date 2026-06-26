"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"

type Doc = {
  id: string
  title: string
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [docs, setDocs] = useState([])

  const router = useRouter()

  // Ctrl+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }

    document.addEventListener(
      "keydown",
      down
    )

    return () => {
      document.removeEventListener(
        "keydown",
        down
      )
    }
  }, [])

  // Load docs
  useEffect(() => {
    const loadDocs = async () => {
      try {
        const res = await fetch(
          "/api/documents"
        )

        if (!res.ok) return

        const data = await res.json()

        setDocs(data)
      } catch (error) {
        console.log(error)
      }
    }

    loadDocs()
  }, [])

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search documents"
    >
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          background: "white",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 10,
          zIndex: 1000
        }}
      >
        <Command.Input
          placeholder="Search documents..."
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 10
          }}
        />

        <Command.List>
          <Command.Empty>
            No documents found
          </Command.Empty>

          {docs.map((doc: Doc) => (
            <Command.Item
              key={doc.id}
              onSelect={() => {
                router.push(
                  `/documents/${doc.id}`
                )

                setOpen(false)
              }}
              style={{
                padding: 10,
                cursor: "pointer"
              }}
            >
              {doc.title}
            </Command.Item>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  )
}