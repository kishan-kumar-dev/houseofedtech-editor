"use client"

import { useRouter } from "next/navigation"

export default function DocumentsHome() {
  const router = useRouter()

  const createDoc = async () => {
    try {
      const res = await fetch(
        "/api/documents",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            title: "Untitled",
            content: ""
          })
        }
      )

      const data = await res.json()

      if (!data?.id) return

      router.push(
        `/documents/${data.id}`
      )

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow:
            "0 4px 20px rgba(0,0,0,.05)"
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "15px"
          }}
        >
          📄
        </div>

        <h1>
          Welcome to Document Editor
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "25px"
          }}
        >
          Create and manage your
          documents easily
        </p>

        <button
          onClick={createDoc}
          style={{
            border: "none",
            background: "#111827",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          + Create Document
        </button>
      </div>
    </div>
  )
}