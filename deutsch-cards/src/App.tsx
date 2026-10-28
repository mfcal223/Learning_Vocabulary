import { useState } from "react"
import type { TranslationLanguage } from "./i18n/uiText"
import {
  vocabularyCategories,
  vocabularyByCategory,
  type VocabularyCategory,
} from "./data/vocabularyLoader"

import { HomePage } from "./pages/HomePage"
import { CategoryGamesPage } from "./pages/CategoryGamesPage"
import { VocabularyGamePage } from "./pages/VocabularyGamePage"
import { VerbGamePage } from "./pages/VerbGamePage"
import { ScrambledSentenceGamePage } from "./pages/ScrambledSentenceGamePage"
import { CorrectWritingGamePage } from "./pages/CorrectWritingGamePage"
import { CapitalizationGamePage } from "./pages/CapitalizationGamePage"

type Activity =
  | "vocabulary"
  | "verbs"
  | "scrambledSentences"
  | "correctWriting"
  | "capitalization"

type CategoryId = VocabularyCategory["id"]

function App() {
  const [language, setLanguage] = useState<TranslationLanguage>(() => {
    try {
      return window.localStorage.getItem("deutsch-cards-language") === "en"
        ? "en"
        : "es"
    } catch {
      return "es"
    }
  })

  function changeLanguage(nextLanguage: TranslationLanguage) {
    setLanguage(nextLanguage)
    try {
      window.localStorage.setItem("deutsch-cards-language", nextLanguage)
    } catch {
      // The toggle still works if browser storage is unavailable.
    }
  }

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId | null>(null)
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null)

  function startGeneralGame(activity: Activity) {
    setSelectedCategory(null)
    setSelectedActivity(activity)
  }

  // Un juego iniciado desde una categoría vuelve al menú de esa letra.
  // Un juego general vuelve al HOME.
  function backFromGame() {
    setSelectedActivity(null)
  }

  if (selectedActivity === "vocabulary" && selectedCategory) {
    return (
      <VocabularyGamePage
        key={`vocabulary-${selectedCategory}`}
        category={selectedCategory}
        vocabulary={vocabularyByCategory[selectedCategory]}
        onBack={backFromGame}
      />
    )
  }

  if (selectedActivity === "verbs") {
    // Por ahora, VerbGamePage mantiene el modo general original.
    // El filtrado por letra necesita revisar VerbGamePage.tsx y endings.json.
    return <VerbGamePage onBack={backFromGame} />
  }

  if (selectedActivity === "scrambledSentences") {
    return (
      <ScrambledSentenceGamePage
        key={`scrambled-${selectedCategory ?? "all"}`}
        category={selectedCategory}
        onBack={backFromGame}
      />
    )
  }

  if (selectedActivity === "correctWriting") {
    return (
      <CorrectWritingGamePage
        key={`writing-${selectedCategory ?? "all"}`}
        category={selectedCategory}
        onBack={backFromGame}
      />
    )
  }

  if (selectedActivity === "capitalization") {
    return (
      <CapitalizationGamePage
        key={`capitalization-${selectedCategory ?? "all"}`}
        category={selectedCategory}
        onBack={backFromGame}
      />
    )
  }

  // Elegir una letra ya no abre directamente Vocabulary Game.
  if (selectedCategory) {
    return (
      <CategoryGamesPage
        category={selectedCategory}
        vocabularyCount={vocabularyByCategory[selectedCategory].length}
        language={language}
        onChangeLanguage={changeLanguage}
        onSelectGame={(activity) => setSelectedActivity(activity)}
        onBack={() => setSelectedCategory(null)}
      />
    )
  }

  return (
    <HomePage
      categories={vocabularyCategories}
      language={language}
      onChangeLanguage={changeLanguage}
      onSelectCategory={(categoryId) => {
        setSelectedCategory(categoryId)
        setSelectedActivity(null)
      }}
      onSelectVerbs={() => startGeneralGame("verbs")}
      onSelectScrambledSentences={() => startGeneralGame("scrambledSentences")}
      onSelectCorrectWriting={() => startGeneralGame("correctWriting")}
      onSelectCapitalization={() => startGeneralGame("capitalization")}
    />
  )
}

export default App
