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