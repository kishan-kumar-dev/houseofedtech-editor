"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import Loading from "@/components/Loading"
import EditorToolbar from "@/components/EditorToolbar"

export default function DocumentPage() {
  const params = useParams()
  const router = useRouter()

  const id = params.id as string

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState("Saved")
  const [deleting, setDeleting] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
      setSaveStatus("Saving...")
    }
  })

  // Load document
  useEffect(() => {
    const loadDocument = async () => {
      try {
        const res = await fetch(`/api/documents/${id}`)

        if (!res.ok) {
          setLoading(false)
          return
        }

        const data = await res.json()

        setTitle(data.title || "")
        setContent(data.content || "")

        editor?.commands.setContent(data.content || "")
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }

    if (id && editor) {
      loadDocument()
    }
  }, [id, editor])

  // Autosave
  useEffect(() => {
    if (!id) return

    const timeout = setTimeout(async () => {
      try {
        await fetch(`/api/documents/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        })

        setSaveStatus("Saved")

        window.dispatchEvent(new Event("documents-updated"))
      } catch (error) {
        console.log(error)
        setSaveStatus("Save failed")
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [title, content, id])

  // DELETE DOCUMENT
  const deleteDocument = async () => {
    const confirmDelete = confirm("Delete this document?")

    if (!confirmDelete) return

    try {
      setDeleting(true)

      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        throw new Error("Delete failed")
      }

      window.dispatchEvent(new Event("documents-updated"))

      router.push("/documents")
    } catch (error) {
      console.log(error)
      alert("Failed to delete document")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <div style={{ color: "#6b7280", fontSize: "14px" }}>
          {saveStatus}
        </div>

        <button
          onClick={deleteDocument}
          disabled={deleting}
          style={{
            background: deleting ? "#f87171" : "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: deleting ? "not-allowed" : "pointer",
            opacity: deleting ? 0.7 : 1
          }}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {/* Title */}
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          setSaveStatus("Saving...")
        }}
        placeholder="Untitled Document"
        style={{
          width: "100%",
          fontSize: "38px",
          fontWeight: "bold",
          border: "none",
          outline: "none",
          marginBottom: "25px"
        }}
      />

      {/* Editor */}
      <div
        style={{
          background: "white",
          minHeight: "600px",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,.08)"
        }}
      >
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}