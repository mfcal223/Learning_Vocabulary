import { useState } from "react"
import rawVocabularyData from "./data/vocabulary.json"
import type { VocabularyItem } from "./types/vocabulary"
import { HomePage } from "./pages/HomePage"
import { GamePage } from "./pages/GamePage"

const vocabularyData = rawVocabularyData as VocabularyItem[]

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(
    new Set(vocabularyData.map((item) => item.category))
  )

  if (selectedCategory) {
    const filteredVocabulary = vocabularyData.filter(
      (item) => item.category === selectedCategory
    )

    return (
      <GamePage
        category={selectedCategory}
        vocabulary={filteredVocabulary}
        onBack={() => setSelectedCategory(null)}
      />
    )
  }

  return (
    <HomePage
      categories={categories}
      onSelectCategory={setSelectedCategory}
    />
  )
}

export default App