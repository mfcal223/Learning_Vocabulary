import type { CSSProperties } from "react"
import { LanguageToggle } from "../components/LanguageToggle"
import { getSentenceExerciseCount } from "../data/sentences/sentenceLoader"
import type { VocabularyCategory } from "../data/vocabularyLoader"
import { uiText, type TranslationLanguage } from "../i18n/uiText"
import type { SentenceGameType } from "../types/sentence"

type CategoryId = VocabularyCategory["id"]
type CategoryActivity = "vocabulary" | SentenceGameType

type Props = {
  category: CategoryId
  vocabularyCount: number
  language: TranslationLanguage
  onChangeLanguage: (language: TranslationLanguage) => void
  onSelectGame: (activity: CategoryActivity) => void
  onBack: () => void
}

export function CategoryGamesPage({
  category,
  vocabularyCount,
  language,
  onChangeLanguage,
  onSelectGame,
  onBack,
}: Props) {
  const t = uiText.category
  const home = uiText.home
  const games = [
    { id: "scrambledSentences", text: home.scrambledSentences },
    { id: "correctWriting", text: home.correctWriting },
    { id: "capitalization", text: home.capitalization },
  ] as const

  const buttonStyle: CSSProperties = {
    padding: "18px 24px",
    fontSize: "22px",
    borderRadius: "14px",
    minWidth: "250px",
  }
  const subtitleStyle: CSSProperties = {
    display: "block",
    opacity: 0.75,
    marginTop: "5px",
    fontSize: "14px",
    fontWeight: 400,
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={onBack} style={{ cursor: "pointer" }}>
          ← {t.home.de} · {t.home[language]}
        </button>
        <LanguageToggle language={language} onChange={onChangeLanguage} />
      </header>

      <h1 style={{ marginBottom: 0 }}>{t.vocabulary.de} {category}</h1>
      <p style={{ margin: 0, opacity: 0.8, textAlign: "center" }}>
        {t.chooseGame.de} {category}.
        <span style={{ display: "block" }}>{t.chooseGame[language]} {category}.</span>
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
        <button
          onClick={() => onSelectGame("vocabulary")}
          disabled={vocabularyCount === 0}
          style={{ ...buttonStyle, cursor: vocabularyCount ? "pointer" : "not-allowed" }}
        >
          {t.pictures.de}
          <small style={subtitleStyle}>
            {t.pictures[language]} · {vocabularyCount} {t.words[language]}
          </small>
        </button>
        {games.map((game) => {
          const count = getSentenceExerciseCount(game.id, category)
          return (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              disabled={count === 0}
              style={{ ...buttonStyle, cursor: count ? "pointer" : "not-allowed", opacity: count ? 1 : 0.5 }}
            >
              {game.text.de}
              <small style={subtitleStyle}>
                {game.text[language]} · {count === 0
                  ? t.noSentences[language]
                  : `${Math.min(count, 10)} / ${count} ${t.sentences[language]}`}
              </small>
            </button>
          )
        })}
        <button disabled style={{ ...buttonStyle, opacity: 0.5, cursor: "not-allowed" }}>
          {home.verbEndings.de}
          <small style={subtitleStyle}>
            {t.verbsByLetter[language]} · {t.pending[language]}
          </small>
        </button>
      </div>

      <p style={{ maxWidth: "620px", opacity: 0.7, textAlign: "center" }}>
        {t.availabilityNote.de}
        <span style={{ display: "block", marginTop: "6px" }}>{t.availabilityNote[language]}</span>
      </p>
    </main>
  )
}
