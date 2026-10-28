import sentencesData from "./sentences.json"
import type {
  CapitalizationExercise,
  CorrectWritingExercise,
  ScrambledSentence,
  SentenceCategoryId,
  SentenceGameType,
  SentenceRecord,
} from "../../types/sentence"

const sentences = sentencesData as SentenceRecord[]

// Sin categoría (null o undefined) devolvemos todas las oraciones,
// incluidas las que todavía no pertenecen a ninguna lista escolar.
export function getSentencesByCategory(
  category?: SentenceCategoryId | null
): SentenceRecord[] {
  if (category == null) {
    return [...sentences]
  }

  return sentences.filter((sentence) =>
    sentence.categories.includes(category)
  )
}

// Útil para deshabilitar en el futuro los juegos sin ejercicios.
export function getSentenceExerciseCount(
  game: SentenceGameType,
  category?: SentenceCategoryId | null
): number {
  return getSentencesByCategory(category).filter(
    (sentence) => sentence.exercises[game] !== undefined
  ).length
}

export function getScrambledSentenceExercises(
  category?: SentenceCategoryId | null
): ScrambledSentence[] {
  return getSentencesByCategory(category).flatMap((sentence) => {
    const exercise = sentence.exercises.scrambledSentences
    if (!exercise) return []

    return [{
      id: exercise.sourceId,
      answer: [...exercise.answerTokens],
    }]
  })
}

export function getCapitalizationExercises(
  category?: SentenceCategoryId | null
): CapitalizationExercise[] {
  return getSentencesByCategory(category).flatMap((sentence) => {
    const exercise = sentence.exercises.capitalization
    if (!exercise) return []

    return [{
      id: exercise.sourceId,
      prompt: exercise.prompt,
      answer: sentence.text,
    }]
  })
}

export function getCorrectWritingExercises(
  category?: SentenceCategoryId | null
): CorrectWritingExercise[] {
  return getSentencesByCategory(category).flatMap((sentence) => {
    const exercise = sentence.exercises.correctWriting
    if (!exercise) return []

    return [{
      id: exercise.sourceId,
      prompt: exercise.prompt,
      answer: sentence.text,
    }]
  })
}
