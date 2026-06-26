"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"
import CommandMenu from "@/components/CommandMenu"

type Doc = {
  id: string
  title: string
}

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const activeId = pathname.startsWith("/documents/")
    ? pathname.split("/").pop()
    : null

  const [docs, setDocs] = useState<Doc[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  // MOBILE SIDEBAR STATE
  const [mobileOpen, setMobileOpen] = useState(false)

  const loadDocs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/documents")

      if (!res.ok) {
        setDocs([])
        return
      }

      const data = await res.json()
      setDocs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.log(error)
      setDocs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isSignedIn) return
    loadDocs()

    const refresh = () => loadDocs()
    window.addEventListener("documents-updated", refresh)

    return () => {
      window.removeEventListener("documents-updated", refresh)
    }
  }, [isSignedIn, loadDocs])

  const createDoc = async () => {
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Untitled Document",
          content: "",
        }),
      })

      if (!res.ok) return

      const newDoc = await res.json()
      await loadDocs()

      if (newDoc?.id) {
        router.push(`/documents/${newDoc.id}`)
        setMobileOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renameDoc = async (id: string, currentTitle: string) => {
    const newTitle = prompt("Rename document", currentTitle)
    if (!newTitle?.trim()) return

    await fetch(`/api/documents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    })

    loadDocs()
  }

  const filteredDocs = docs.filter((doc) =>
    doc.title?.toLowerCase().includes(search.toLowerCase())
  )

  if (!isSignedIn) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Please sign in</h2>
        <div style={{ marginTop: 20 }}>
          <SignInButton />
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* MOBILE TOP BAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          borderBottom: "1px solid #ddd",
          background: "white",
          zIndex: 50,
        }}
      >
        <button
          onClick={() => setMobileOpen(true)}
          style={{
            fontSize: 20,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          ☰
        </button>

        <div style={{ fontWeight: 600 }}>Documents</div>

        <UserButton />
      </div>

      {/* BACKDROP */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 60,
          }}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "280px",
          background: "white",
          borderRight: "1px solid #ddd",
          padding: "16px",
          overflowY: "auto",
          zIndex: 70,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <UserButton />
        </div>

        <button
          onClick={createDoc}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginBottom: 15,
          }}
        >
          + New Document
        </button>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 20,
          }}
        />

        <h4>Documents</h4>

        {loading ? (
          <div style={{ marginTop: 20 }}>Loading...</div>
        ) : filteredDocs.length === 0 ? (
          <div style={{ marginTop: 20, color: "#888" }}>
            No documents
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
                background:
                  doc.id === activeId ? "#f3f4f6" : "transparent",
              }}
            >
              <div
                onClick={() => {
                  router.push(`/documents/${doc.id}`)
                  setMobileOpen(false)
                }}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight:
                    doc.id === activeId ? "bold" : "normal",
                }}
              >
                {doc.title}
              </div>

              <button
                onClick={() => renameDoc(doc.id, doc.title)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                ✏️
              </button>
            </div>
          ))
        )}
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          marginLeft: "280px",
          padding: "60px 30px 30px",
        }}
      >
        <CommandMenu />
        {children}
      </div>

      {/* DESKTOP RESPONSIVE HIDE SIDEBAR */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="margin-left: 280px"] {
            margin-left: 0 !important;
            padding-top: 70px !important;
          }

          div[style*="width: 280px"] {
            width: 280px;
          }
        }
      `}</style>
    </div>
  )
}