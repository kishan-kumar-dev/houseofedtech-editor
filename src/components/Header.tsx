"use client"

import { UserButton } from "@clerk/nextjs"

export default function Header() {
  return (
    <div
      style={{
        height: "70px",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "bold"
          }}
        >
          ✨ House of EdTech Editor
        </h2>

        <div
          style={{
            fontSize: "12px",
            color: "#6b7280"
          }}
        >
          Smart document workspace
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center"
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#6b7280"
          }}
        >
          Connected
        </div>

        <UserButton />
      </div>
    </div>
  )
}