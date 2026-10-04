import { useEffect } from "react"
import type { GameHelpContent } from "../types/help"

type GameHelpProps = {
  content: GameHelpContent
  onClose: () => void
}

export function GameHelp({
  content,
  onClose,
}: GameHelpProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={content.title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: "20px",

        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        style={{
          position: "relative",

          width: "min(560px, 92vw)",
          maxHeight: "85vh",
          overflowY: "auto",

          padding: "32px",

          borderRadius: "18px",
          border:
            "1px solid rgba(255, 255, 255, 0.15)",

          backgroundColor: "#1f1f27",

          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.45)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Hilfe schließen"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",

            fontSize: "18px",
            padding: "6px 10px",

            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            marginTop: 0,
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          {content.title}
        </h2>

        {content.subtitle && (
          <p
            style={{
              marginTop: 0,
              marginBottom: "28px",
              fontSize: "18px",
              opacity: 0.8,
            }}
          >
            {content.subtitle}
          </p>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {content.sections.map(
            (section, sectionIndex) => (
              <section key={sectionIndex}>
                {section.heading && (
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: "10px",
                      fontSize: "20px",
                    }}
                  >
                    {section.heading}
                  </h3>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                    fontSize: "18px",
                    lineHeight: "1.5",
                  }}
                >
                  {section.lines.map(
                    (line, lineIndex) => (
                      <div key={lineIndex}>
                        {line}
                      </div>
                    )
                  )}
                </div>
              </section>
            )
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "32px",
            fontSize: "18px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Zurück zum Spiel
        </button>
      </div>
    </div>
  )
}