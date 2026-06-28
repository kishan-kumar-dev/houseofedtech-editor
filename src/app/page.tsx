import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>House of Edtech Editor</h1>

      <p>Collaborative document editor</p>

      <Link
        href="/documents"
        style={{
          padding: "12px 24px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Open Documents
      </Link>
    </main>
  );
}