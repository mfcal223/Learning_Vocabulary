import { useState } from "react"
import {
  vocabularyCategories,
  vocabularyByCategory,
  type VocabularyCategory,
} from "./data/vocabularyLoader"
import { HomePage } from "./pages/HomePage"
import { GamePage } from "./pages/GamePage"

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<VocabularyCategory["id"] | null>(null)

  if (selectedCategory) {
    const selectedVocabulary = vocabularyByCategory[selectedCategory]

    return (
      <GamePage
        category={selectedCategory}
        vocabulary={selectedVocabulary}
        onBack={() => setSelectedCategory(null)}
      />
    )
  }

  return (
    <HomePage
      categories={vocabularyCategories}
      onSelectCategory={setSelectedCategory}
    />
  )
}

export default App