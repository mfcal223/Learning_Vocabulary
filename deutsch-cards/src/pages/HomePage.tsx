import type { VocabularyCategory } from "../data/vocabularyLoader"

type HomePageProps = {
  categories: VocabularyCategory[]
  onSelectCategory: (
    categoryId: VocabularyCategory["id"]
  ) => void
  onSelectVerbs: () => void
  onSelectScrambledSentences: () => void
  onSelectCorrectWriting: () => void
  onSelectCapitalization: () => void
}

export function HomePage({
  categories,
  onSelectCategory,
  onSelectVerbs,
  onSelectScrambledSentences,
  onSelectCorrectWriting,
  onSelectCapitalization,
}: HomePageProps) {
  const buttonStyle = {
    fontSize: "24px",
    padding: "20px 32px",
    borderRadius: "16px",
    cursor: "pointer",
    minWidth: "220px",
  }

  const englishLabelStyle = {
    display: "block",
    marginTop: "4px",
    fontSize: "15px",
    opacity: 0.7,
    fontWeight: 400,
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        padding: "24px",
      }}
    >
      <h1>Deutsch Cards</h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          opacity: 0.85,
        }}
      >
        Choose what to practice · Elige qué practicar
      </p>

      <section>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          📚 Wortschatz · Vocabulary
        </h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                onSelectCategory(category.id)
              }
              style={{
                fontSize: "32px",
                padding: "24px 36px",
                borderRadius: "16px",
                cursor: "pointer",
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          🔤 Verben · Verbs
        </h2>

        <button
          onClick={onSelectVerbs}
          style={buttonStyle}
        >
          Verb-Endungen
          <span style={englishLabelStyle}>
            Verb endings
          </span>
        </button>
      </section>

      <section>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          📝 Wiederholung · Review
        </h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onSelectScrambledSentences}
            style={buttonStyle}
          >
            Schüttelsätze
            <span style={englishLabelStyle}>
              Scrambled sentences
            </span>
          </button>

          <button
            onClick={onSelectCorrectWriting}
            style={buttonStyle}
          >
            Schreibe richtig
            <span style={englishLabelStyle}>
              Write correctly
            </span>
          </button>

          <button
            onClick={onSelectCapitalization}
            style={buttonStyle}
          >
            Groß oder klein?
            <span style={englishLabelStyle}>
              Uppercase or lowercase?
            </span>
          </button>
        </div>
      </section>
    </main>
  )
}
