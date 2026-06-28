type HomePageProps = {
  categories: string[]
  onSelectCategory: (category: string) => void
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
            key={category}
            onClick={() => onSelectCategory(category)}
            style={{
              fontSize: "32px",
              padding: "24px 36px",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            Letra {category}
          </button>
        ))}
      </div>
    </main>
  )
}