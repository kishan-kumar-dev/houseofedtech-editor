"use client"

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
      }}
    >
      <div
        style={{
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border:
              "4px solid #e5e7eb",
            borderTop:
              "4px solid #111827",
            borderRadius: "50%",
            animation:
              "spin 1s linear infinite",
            margin: "0 auto"
          }}
        />

        <p
          style={{
            marginTop: "15px",
            color: "#6b7280"
          }}
        >
          Loading documents...
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}