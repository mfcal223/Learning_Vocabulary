import { useState } from "react"
import {
  vocabularyCategories,
  vocabularyByCategory,
  type VocabularyCategory,
} from "./data/vocabularyLoader"

import { HomePage } from "./pages/HomePage"
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

function App() {
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null)

  const [selectedCategory, setSelectedCategory] =
    useState<VocabularyCategory["id"] | null>(null)

  if (
    selectedActivity === "vocabulary" &&
    selectedCategory
  ) {
    const selectedVocabulary =
      vocabularyByCategory[selectedCategory]

    return (
      <VocabularyGamePage
        category={selectedCategory}
        vocabulary={selectedVocabulary}
        onBack={() => {
          setSelectedCategory(null)
          setSelectedActivity(null)
        }}
      />
    )
  }

  if (selectedActivity === "verbs") {
    return (
      <VerbGamePage
        onBack={() => setSelectedActivity(null)}
      />
    )
  }

  if (selectedActivity === "scrambledSentences") {
    return (
      <ScrambledSentenceGamePage
        onBack={() => setSelectedActivity(null)}
      />
    )
  }

  if (selectedActivity === "correctWriting") {
    return (
      <CorrectWritingGamePage
        onBack={() => setSelectedActivity(null)}
      />
    )
  }

  if (selectedActivity === "capitalization") {
    return (
      <CapitalizationGamePage
        onBack={() => setSelectedActivity(null)}
      />
    )
  }

  return (
    <HomePage
      categories={vocabularyCategories}
      onSelectCategory={(categoryId) => {
        setSelectedActivity("vocabulary")
        setSelectedCategory(categoryId)
      }}
      onSelectVerbs={() =>
        setSelectedActivity("verbs")
      }
      onSelectScrambledSentences={() =>
        setSelectedActivity("scrambledSentences")
      }
      onSelectCorrectWriting={() =>
        setSelectedActivity("correctWriting")
      }
      onSelectCapitalization={() =>
        setSelectedActivity("capitalization")
      }
    />
  )
}

export default App


/* version q incluye juego de ordenar oraciones*/
/*
import { useState } from "react"
import {
  vocabularyCategories,
  vocabularyByCategory,
  type VocabularyCategory,
} from "./data/vocabularyLoader"

import { HomePage } from "./pages/HomePage"
import { GamePage } from "./pages/GamePage"
import { VerbGamePage } from "./pages/VerbGamePage"
import { ScrambledSentenceGamePage } from "./pages/ScrambledSentenceGamePage"

type Activity =
  | "vocabulary"
  | "verbs"
  | "scrambledSentences"

function App() {
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null)

  const [selectedCategory, setSelectedCategory] =
    useState<VocabularyCategory["id"] | null>(null)

  if (
    selectedActivity === "vocabulary" &&
    selectedCategory
  ) {
    const selectedVocabulary =
      vocabularyByCategory[selectedCategory]

    return (
      <GamePage
        category={selectedCategory}
        vocabulary={selectedVocabulary}
        onBack={() => {
          setSelectedCategory(null)
          setSelectedActivity(null)
        }}
      />
    )
  }

  if (selectedActivity === "verbs") {
    return (
      <VerbGamePage
        onBack={() => setSelectedActivity(null)}
      />
    )
  }

  if (selectedActivity === "scrambledSentences") {
    return (
      <ScrambledSentenceGamePage
        onBack={() => setSelectedActivity(null)}
      />
    )
  }

  return (
    <HomePage
      categories={vocabularyCategories}
      onSelectCategory={(categoryId) => {
        setSelectedActivity("vocabulary")
        setSelectedCategory(categoryId)
      }}
      onSelectVerbs={() =>
        setSelectedActivity("verbs")
      }
      onSelectScrambledSentences={() =>
        setSelectedActivity("scrambledSentences")
      }
    />
  )
}

export default App
*/
/*
import { useState } from "react"
import {
  vocabularyCategories,
  vocabularyByCategory,
  type VocabularyCategory,
} from "./data/vocabularyLoader"
import { HomePage } from "./pages/HomePage"
import { GamePage } from "./pages/GamePage"
import { VerbGamePage } from "./pages/VerbGamePage"

type Activity = "vocabulary" | "verbs"

function App() {
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null)

  const [selectedCategory, setSelectedCategory] =
    useState<VocabularyCategory["id"] | null>(null)

  if (selectedActivity === "vocabulary" && selectedCategory) {
    const selectedVocabulary = vocabularyByCategory[selectedCategory]

    return (
      <GamePage
        category={selectedCategory}
        vocabulary={selectedVocabulary}
        onBack={() => {
          setSelectedCategory(null)
          setSelectedActivity(null)
        }}
      />
    )
  }

  if (selectedActivity === "verbs") {
    return (
      <VerbGamePage
        onBack={() => setSelectedActivity(null)}
      />
    )
  }

  return (
    <HomePage
      categories={vocabularyCategories}
      onSelectCategory={(categoryId) => {
        setSelectedActivity("vocabulary")
        setSelectedCategory(categoryId)
      }}
      onSelectVerbs={() => setSelectedActivity("verbs")}
    />
  )
}

export default App
*/

/* version antes de juego de verbos*/
/*
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
*/