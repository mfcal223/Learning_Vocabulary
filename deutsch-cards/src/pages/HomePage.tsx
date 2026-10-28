import type { CSSProperties } from "react"
import { LanguageToggle } from "../components/LanguageToggle"
import type { VocabularyCategory } from "../data/vocabularyLoader"
import { uiText, type TranslationLanguage, type UiText } from "../i18n/uiText"

type HomePageProps = {
  categories: VocabularyCategory[]
  language: TranslationLanguage
  onChangeLanguage: (language: TranslationLanguage) => void
  onSelectCategory: (categoryId: VocabularyCategory["id"]) => void
  onSelectVerbs: () => void
  onSelectScrambledSentences: () => void
  onSelectCorrectWriting: () => void
  onSelectCapitalization: () => void
}

export function HomePage({
  categories,
  language,
  onChangeLanguage,
  onSelectCategory,
  onSelectVerbs,
  onSelectScrambledSentences,
  onSelectCorrectWriting,
  onSelectCapitalization,
}: HomePageProps) {
  const t = uiText.home

  // Sort a copy: do not mutate the original catalog or depend on JSON order.
  const sortedCategories = [...categories].sort((a, b) =>
    a.label.localeCompare(b.label, "de", { sensitivity: "base" })
  )

  const buttonStyle: CSSProperties = {
    fontSize: "24px",
    padding: "20px 32px",
    borderRadius: "16px",
    cursor: "pointer",
    minWidth: "220px",
  }

  const translatedLabelStyle: CSSProperties = {
    display: "block",
    marginTop: "4px",
    fontSize: "15px",
    opacity: 0.7,
    fontWeight: 400,
  }

  function translated(copy: UiText) {
    return copy[language]
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <header style={{ width: "100%", maxWidth: "1000px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <LanguageToggle language={language} onChange={onChangeLanguage} />
        </div>
        <h1 style={{ textAlign: "center", marginBottom: "8px" }}>Deutsch Cards</h1>
        <p style={{ textAlign: "center", fontSize: "18px", opacity: 0.85 }}>
          {t.choosePractice.de} · {translated(t.choosePractice)}
        </p>
      </header>

      <section style={{ width: "100%" }}>
        <h2 style={{ textAlign: "center" }}>📚 {t.vocabulary.de} · {translated(t.vocabulary)}</h2>
        <p style={{ textAlign: "center", opacity: 0.75 }}>
          {t.chooseLetter.de}
          <span style={{ display: "block" }}>{translated(t.chooseLetter)}</span>
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {sortedCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              style={{ fontSize: "32px", padding: "24px 36px", borderRadius: "16px", cursor: "pointer" }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ textAlign: "center" }}>
        <h2>🎲 {t.mixedPractice.de} · {translated(t.mixedPractice)}</h2>
        <p style={{ opacity: 0.75 }}>
          {t.mixedDescription.de}
          <span style={{ display: "block" }}>{translated(t.mixedDescription)}</span>
        </p>
        <h3>🔤 {t.verbs.de} · {translated(t.verbs)}</h3>
        <button onClick={onSelectVerbs} style={buttonStyle}>
          {t.verbEndings.de}
          <span style={translatedLabelStyle}>
            {translated(t.verbEndings)} · {translated(t.generalMode)}
          </span>
        </button>
      </section>

      <section style={{ width: "100%" }}>
        <h3 style={{ textAlign: "center" }}>📝 {t.sentences.de} · {translated(t.sentences)}</h3>
        <p style={{ textAlign: "center", opacity: 0.75 }}>
          {t.tenSentences.de}
          <span style={{ display: "block" }}>{translated(t.tenSentences)}</span>
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={onSelectScrambledSentences} style={buttonStyle}>
            {t.scrambledSentences.de}
            <span style={translatedLabelStyle}>{translated(t.scrambledSentences)}</span>
          </button>
          <button onClick={onSelectCorrectWriting} style={buttonStyle}>
            {t.correctWriting.de}
            <span style={translatedLabelStyle}>{translated(t.correctWriting)}</span>
          </button>
          <button onClick={onSelectCapitalization} style={buttonStyle}>
            {t.capitalization.de}
            <span style={translatedLabelStyle}>{translated(t.capitalization)}</span>
          </button>
        </div>
      </section>
    </main>
  )
}
