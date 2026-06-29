import categories from "./vocabulary.json"
import hWords from "./H.json"
import dWords from "./D.json"
import schWords from "./SCH.json"

export type VocabularyCategory = {
  id: "H" | "D" | "SCH"
  label: string
}

export type VocabularyItem = {
  word: string
  article: string
  type: "noun" | "verb" | "adjective" | "preposition" | "number"
  image: string
}

export const vocabularyCategories = categories as VocabularyCategory[]

export const vocabularyByCategory: Record<
  VocabularyCategory["id"],
  VocabularyItem[]
> = {
  H: hWords as VocabularyItem[],
  D: dWords as VocabularyItem[],
  SCH: schWords as VocabularyItem[],
}