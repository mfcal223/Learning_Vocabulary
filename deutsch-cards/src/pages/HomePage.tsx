import type { VocabularyCategory } from "../data/vocabularyLoader"

type HomePageProps = {
  categories: VocabularyCategory[]
  onSelectCategory: (
    categoryId: VocabularyCategory["id"]
  ) => void
  onSelectVerbs: () => void
  onSelectScrambledSentences: () => void
}

export function HomePage({
  categories,
  onSelectCategory,
  onSelectVerbs,
  onSelectScrambledSentences,
}: HomePageProps) {
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

      <p>Elige qué practicar</p>

      <section>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          📚 Wortschatz
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
          🔤 Verben
        </h2>

        <button
          onClick={onSelectVerbs}
          style={{
            fontSize: "24px",
            padding: "20px 32px",
            borderRadius: "16px",
            cursor: "pointer",
          }}
        >
          Verb-Endungen
        </button>
      </section>

      <section>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          📝 Wiederholung
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
            style={{
              fontSize: "24px",
              padding: "20px 32px",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            Schüttelsätze
          </button>
        </div>
      </section>
    </main>
  )
}

/* version antes de juegos de la revision */
/*
import type { VocabularyCategory } from "../data/vocabularyLoader"

type HomePageProps = {
  categories: VocabularyCategory[]
  onSelectCategory: (categoryId: VocabularyCategory["id"]) => void
  onSelectVerbs: () => void
}

export function HomePage({
  categories,
  onSelectCategory,
  onSelectVerbs,
}: HomePageProps) {
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

      <p>Elige qué practicar</p>

      <section>
        <h2 style={{ textAlign: "center" }}>📚 Wortschatz</h2>

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
              onClick={() => onSelectCategory(category.id)}
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
        <h2 style={{ textAlign: "center" }}>🔤 Verben</h2>

        <button
          onClick={onSelectVerbs}
          style={{
            fontSize: "24px",
            padding: "20px 32px",
            borderRadius: "16px",
            cursor: "pointer",
          }}
        >
          Verb-Endungen
        </button>
      </section>
    </main>
  )
}
*/


/* versino antes de juego de verbos*/
/*
import type { VocabularyCategory } from "../data/vocabularyLoader"

type HomePageProps = {
  categories: VocabularyCategory[]
  onSelectCategory: (categoryId: VocabularyCategory["id"]) => void
}

export function HomePage({ categories, onSelectCategory }: HomePageProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <h1>Deutsch Cards</h1>

      <p>Elige qué vocabulario practicar</p>

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
            onClick={() => onSelectCategory(category.id)}
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
    </main>
  )
}
*/