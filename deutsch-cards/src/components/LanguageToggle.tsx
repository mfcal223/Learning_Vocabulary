import type { CSSProperties } from "react"
import type { TranslationLanguage } from "../i18n/uiText"

type LanguageToggleProps = {
  language: TranslationLanguage
  onChange: (language: TranslationLanguage) => void
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  const buttonStyle: CSSProperties = {
    borderRadius: "8px",
    padding: "7px 12px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  }

  return (
    <div
      role="group"
      aria-label="Idioma de traducción / Translation language"
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <span style={{ fontSize: "13px", opacity: 0.75 }}>DE +</span>
      {(["es", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={language === option}
          onClick={() => onChange(option)}
          style={{
            ...buttonStyle,
            border: language === option ? "2px solid #8ab4f8" : "1px solid #777",
            backgroundColor: language === option ? "#32435f" : "transparent",
            color: "inherit",
          }}
        >
          {option === "es" ? "ES" : "EN"}
        </button>
      ))}
    </div>
  )
}
