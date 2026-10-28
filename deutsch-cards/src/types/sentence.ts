import type { VocabularyCategory } from "../data/vocabularyLoader"

// Reutilizamos los identificadores reales de las listas escolares.
export type SentenceCategoryId = VocabularyCategory["id"]

export type ScrambledSentenceData = {
  sourceId: string
  answerTokens: string[]
}

export type WritingSentenceData = {
  sourceId: string
  prompt: string
}

// Cada ejercicio es opcional: solo incluimos los que existen actualmente.
export type SentenceExercises = {
  scrambledSentences?: ScrambledSentenceData
  capitalization?: WritingSentenceData
  correctWriting?: WritingSentenceData
}

export type SentenceRecord = {
  id: string
  text: string
  categories: SentenceCategoryId[]
  // Palabras de la lista escolar; verbos siempre en infinitivo.
  focusWords: string[]
  exercises: SentenceExercises
}

// Formatos de ejercicio que esperan las páginas existentes.
// El cargador convierte los registros centrales a estas estructuras.
export type ScrambledSentence = {
  id: string
  answer: string[]
}

export type CorrectWritingExercise = {
  id: string
  prompt: string
  answer: string
}

export type CapitalizationExercise = {
  id: string
  prompt: string
  answer: string
}

export type SentenceGameType = keyof SentenceExercises
