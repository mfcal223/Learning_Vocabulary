type BaseVerb = {
  infinitive: string
  ich: string
  thirdPerson: string
  plural: string
  english: string
  spanish: string
}

export type EndingVerb = BaseVerb & {
  exerciseType: "ending"
  stem: string
}

export type FullFormVerb = BaseVerb & {
  exerciseType: "fullForm"
  stem?: string
}

export type Verb = EndingVerb | FullFormVerb