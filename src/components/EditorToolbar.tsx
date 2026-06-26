"use client"

import { Editor } from "@tiptap/react"

type Props = {
  editor: Editor | null
}

export default function EditorToolbar({
  editor
}: Props) {
  if (!editor) return null

  const buttonStyle = (
    active: boolean
  ) => ({
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    background: active
      ? "#dbeafe"
      : "white"
  })

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}
    >
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        style={buttonStyle(
          editor.isActive("bold")
        )}
      >
        Bold
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        style={buttonStyle(
          editor.isActive("italic")
        )}
      >
        Italic
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 1
            })
            .run()
        }
        style={buttonStyle(
          editor.isActive(
            "heading",
            { level: 1 }
          )
        )}
      >
        H1
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 2
            })
            .run()
        }
        style={buttonStyle(
          editor.isActive(
            "heading",
            { level: 2 }
          )
        )}
      >
        H2
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
        style={buttonStyle(
          editor.isActive(
            "bulletList"
          )
        )}
      >
        • List
      </button>
    </div>
  )
}