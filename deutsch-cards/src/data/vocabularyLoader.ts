import categories from "./vocabulary/vocabulary.json"
import hWords from "./vocabulary/H.json"
import dWords from "./vocabulary/D.json"
import schWords from "./vocabulary/SCH.json"
import KData from "./vocabulary/K.json"
import ZWords from "./vocabulary/Z.json"

export type VocabularyCategory = {
  id: "H" | "D" | "SCH" | "K" | "Z"
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
  K: KData as VocabularyItem[],
  Z: ZWords as VocabularyItem[],
}