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

/**
 * Sin categoría: todas las oraciones, incluso las no clasificadas.
 * Con categoría: solo las vinculadas a esa lista escolar.
 */
export function getSentencesByCategory(
  category?: SentenceCategoryId | null
): SentenceRecord[] {
  return category == null
    ? [...sentences]
    : sentences.filter((sentence) => sentence.categories.includes(category))
}

/**
 * Cada oración puede servir para los tres juegos.
 * Conservamos los ejercicios originales cuando existen y generamos
 * el formato correspondiente para las oraciones restantes.
 */
function tokenizeSentence(text: string): string[] {
  return text.trim().replace(/([.!?])/g, " $1").trim().split(/\s+/)
}

export function getScrambledSentenceExercises(
  category?: SentenceCategoryId | null
): ScrambledSentence[] {
  return getSentencesByCategory(category).map((sentence) => {
    const original = sentence.exercises.scrambledSentences
    return {
      id: original?.sourceId ?? `${sentence.id}-scrambled`,
      answer: original ? [...original.answerTokens] : tokenizeSentence(sentence.text),
    }
  })
}

export function getCapitalizationExercises(
  category?: SentenceCategoryId | null
): CapitalizationExercise[] {
  return getSentencesByCategory(category).map((sentence) => {
    const original = sentence.exercises.capitalization
    return {
      id: original?.sourceId ?? `${sentence.id}-capitalization`,
      prompt: original?.prompt ?? sentence.text.toLocaleLowerCase("de-DE"),
      answer: sentence.text,
    }
  })
}

export function getCorrectWritingExercises(
  category?: SentenceCategoryId | null
): CorrectWritingExercise[] {
  return getSentencesByCategory(category).map((sentence) => {
    const original = sentence.exercises.correctWriting
    return {
      id: original?.sourceId ?? `${sentence.id}-writing`,
      prompt: original?.prompt ?? sentence.text.replace(/\s+/g, ""),
      answer: sentence.text,
    }
  })
}

export function getSentenceExerciseCount(
  game: SentenceGameType,
  category?: SentenceCategoryId | null
): number {
  switch (game) {
    case "scrambledSentences":
      return getScrambledSentenceExercises(category).length
    case "capitalization":
      return getCapitalizationExercises(category).length
    case "correctWriting":
      return getCorrectWritingExercises(category).length
  }
}
