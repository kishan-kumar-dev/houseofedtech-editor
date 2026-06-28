import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <SignUp />
      </div>
    </div>
  );
}