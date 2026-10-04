type GameHeaderProps = {
  title: string
  onBack: () => void
  onHelp: () => void
}

export function GameHeader({
  title,
  onBack,
  onHelp,
}: GameHeaderProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        width: "100%",
        boxSizing: "border-box",
        padding: "16px 20px",

        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "12px",

        backgroundColor: "rgba(24, 24, 31, 0.96)",
        backdropFilter: "blur(8px)",

        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button
          onClick={onBack}
          aria-label="Zurück"
          style={{
            fontSize: "16px",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          ← Zurück
        </button>
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: "28px",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={onHelp}
          aria-label="Hilfe"
          style={{
            fontSize: "16px",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          ❓ Hilfe
        </button>
      </div>
    </header>
  )
}