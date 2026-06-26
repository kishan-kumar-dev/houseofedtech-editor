"use client"

import {
  Search,
  FileText,
  Plus
} from "lucide-react"

import { useRouter } from "next/navigation"

type Doc = {
  id: string
  title: string
}

type Props = {
  docs: Doc[]
  activeId?: string
  search: string
  setSearch: (
    value: string
  ) => void
  createDoc: () => void
}

export default function Sidebar({
  docs,
  activeId,
  search,
  setSearch,
  createDoc
}: Props) {
  const router = useRouter()

  return (
    <div
      style={{
        width: "300px",
        background: "white",
        borderRight:
          "1px solid #e5e7eb",
        padding: "20px",
        overflowY: "auto",
        boxShadow:
          "2px 0 8px rgba(0,0,0,.05)"
      }}
    >
      {/* Title */}

      <h1
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "24px",
          marginBottom: "20px"
        }}
      >
        <FileText size={24} />
        Documents
      </h1>

      {/* New document */}

      <button
        onClick={createDoc}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "10px",
          background: "#111827",
          color: "white",
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          fontWeight: "bold"
        }}
      >
        <Plus size={18}/>
        New Document
      </button>

      {/* Search */}

      <div
        style={{
          position: "relative",
          marginBottom: "20px"
        }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            color: "#6b7280"
          }}
        />

        <input
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search..."
          style={{
            width:"100%",
            padding:
              "12px 12px 12px 36px",
            border:
              "1px solid #d1d5db",
            borderRadius:"10px",
            outline:"none"
          }}
        />
      </div>

      {/* Documents */}

      {docs.length === 0 ? (
        <div
          style={{
            textAlign:"center",
            color:"#6b7280",
            marginTop:"30px"
          }}
        >
          No documents found
        </div>
      ) : (
        docs.map((doc)=>(
          <div
            key={doc.id}
            onClick={() =>
              router.push(
                `/documents/${doc.id}`
              )
            }
            style={{
              padding:"14px",
              borderRadius:"10px",
              marginBottom:"10px",
              cursor:"pointer",
              transition:
                "all .25s",

              background:
                activeId===doc.id
                ? "#dbeafe"
                : "white",

              border:
                activeId===doc.id
                ? "1px solid #60a5fa"
                : "1px solid #eee"
            }}
          >
            <div
              style={{
                fontWeight:600
              }}
            >
              {doc.title ||
                "Untitled"}
            </div>

            <div
              style={{
                fontSize:"12px",
                color:"#6b7280",
                marginTop:"5px"
              }}
            >
              Last edited recently
            </div>
          </div>
        ))
      )}
    </div>
  )
}