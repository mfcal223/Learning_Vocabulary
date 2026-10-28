// German is always visible. The player chooses the secondary translation.
export type TranslationLanguage = "es" | "en"

export type UiText = {
  de: string
  es: string
  en: string
}

export const uiText = {
  home: {
    choosePractice: {
      de: "Wähle, was du üben möchtest",
      es: "Elige qué practicar",
      en: "Choose what to practice",
    },
    vocabulary: {
      de: "Wortschatz",
      es: "Vocabulario",
      en: "Vocabulary",
    },
    chooseLetter: {
      de: "Wähle einen Buchstaben und danach ein Spiel.",
      es: "Elige una letra y después un juego.",
      en: "Choose a letter, then choose a game.",
    },
    mixedPractice: {
      de: "Alle Wörter",
      es: "Repaso general",
      en: "Mixed practice",
    },
    mixedDescription: {
      de: "Zufällige Sätze aus allen Listen oder Verben aus dem gesamten Übungspool.",
      es: "Oraciones aleatorias de todas las listas o verbos del repertorio general.",
      en: "Random sentences from all lists or verbs from the complete exercise pool.",
    },
    verbs: {
      de: "Verben",
      es: "Verbos",
      en: "Verbs",
    },
    verbEndings: {
      de: "Verb-Endungen",
      es: "Terminaciones verbales",
      en: "Verb endings",
    },
    generalMode: {
      de: "Allgemeiner Modus",
      es: "Modo general",
      en: "General practice",
    },
    sentences: {
      de: "Sätze",
      es: "Oraciones",
      en: "Sentences",
    },
    tenSentences: {
      de: "10 zufällige Sätze pro Runde (oder alle, wenn es weniger als 10 gibt).",
      es: "10 oraciones aleatorias por partida (o todas, si hay menos de 10).",
      en: "10 random sentences per round (or all available if there are fewer than 10).",
    },
    scrambledSentences: {
      de: "Schüttelsätze",
      es: "Ordenar oraciones",
      en: "Scrambled sentences",
    },
    correctWriting: {
      de: "Schreibe richtig",
      es: "Escribir correctamente",
      en: "Write correctly",
    },
    capitalization: {
      de: "Groß oder klein?",
      es: "Mayúsculas y minúsculas",
      en: "Uppercase or lowercase?",
    },
  },
  category: {
    home: {
      de: "Startseite",
      es: "Inicio",
      en: "Home",
    },
    vocabulary: {
      de: "Wortschatz",
      es: "Vocabulario",
      en: "Vocabulary",
    },
    chooseGame: {
      de: "Wähle ein Spiel für die Liste",
      es: "Elige un juego para practicar la lista",
      en: "Choose a game to practice list",
    },
    pictures: {
      de: "Bilder und Wörter",
      es: "Imágenes y vocabulario",
      en: "Pictures and words",
    },
    words: {
      de: "Wörter",
      es: "palabras",
      en: "words",
    },
    sentences: {
      de: "Sätze",
      es: "oraciones",
      en: "sentences",
    },
    noSentences: {
      de: "Noch keine Sätze",
      es: "Aún sin oraciones",
      en: "No sentences available yet",
    },
    verbsByLetter: {
      de: "Konjugation nach Buchstaben",
      es: "Conjugación por letra",
      en: "Verb conjugation by letter",
    },
    pending: {
      de: "Noch nicht verfügbar",
      es: "Pendiente de integración",
      en: "Not available yet",
    },
    availabilityNote: {
      de: "Spiele ohne Übungen für diesen Buchstaben sind deaktiviert. Die allgemeine Übung ist auf der Startseite verfügbar.",
      es: "Los juegos sin ejercicios para esta letra aparecen deshabilitados. El repaso general está disponible desde el inicio.",
      en: "Games without exercises for this letter are disabled. Mixed practice remains available from the home page.",
    },
  },
} satisfies Record<string, Record<string, UiText>>
