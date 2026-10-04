import { useState } from "react"
import capitalizationData from "../data/revision/capitalization.json"
import type { CapitalizationExercise } from "../types/revision"

type CapitalizationGamePageProps = {
  onBack: () => void
}

type Feedback = "correct" | "incorrect" | null

type CharacterCell = {
  character: string
  index: number
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    const temporary = shuffled[i]
    shuffled[i] = shuffled[randomIndex]
    shuffled[randomIndex] = temporary
  }

  return shuffled
}

function isLetter(character: string): boolean {
  return /^[A-Za-zÄÖÜäöüßẞ]$/.test(character)
}

function toggleCharacter(character: string): string {
  if (character === "ß") {
    return "ẞ"
  }

  if (character === "ẞ") {
    return "ß"
  }

  const uppercase = character.toLocaleUpperCase("de-DE")
  const lowercase = character.toLocaleLowerCase("de-DE")

  if (character === uppercase) {
    return lowercase
  }

  return uppercase
}

function groupCharactersIntoWords(
  characters: string[]
): CharacterCell[][] {
  const words: CharacterCell[][] = []
  let currentWord: CharacterCell[] = []

  characters.forEach((character, index) => {
    if (character === " ") {
      if (currentWord.length > 0) {
        words.push(currentWord)
        currentWord = []
      }

      return
    }

    currentWord.push({
      character,
      index,
    })
  })

  if (currentWord.length > 0) {
    words.push(currentWord)
  }

  return words
}

export function CapitalizationGamePage({
  onBack,
}: CapitalizationGamePageProps) {
  const allExercises =
    capitalizationData as CapitalizationExercise[]

  const [exercises, setExercises] = useState<
    CapitalizationExercise[]
  >(() => shuffle(allExercises))

  const [currentExerciseIndex, setCurrentExerciseIndex] =
    useState(0)

  const [characters, setCharacters] = useState<string[]>(
    () => exercises[0].prompt.split("")
  )

  const [feedback, setFeedback] =
    useState<Feedback>(null)

  const [confirmedIndexes, setConfirmedIndexes] =
   useState<number[]>([])

  const [score, setScore] = useState(0)

  const [gameFinished, setGameFinished] =
    useState(false)

  const exercise = exercises[currentExerciseIndex]

  function handleCharacterClick(index: number) {
    if (
        feedback !== null ||
        confirmedIndexes.includes(index)
    ) {
        return
    }

    const character = characters[index]

    if (!isLetter(character)) {
        return
    }

    setCharacters((currentCharacters) =>
        currentCharacters.map((currentCharacter, currentIndex) => {
        if (currentIndex !== index) {
            return currentCharacter
        }

        return toggleCharacter(currentCharacter)
        })
    )
    }

  function handleCheck() {
    const currentSentence = characters.join("")

    const correctlySolvedIndexes =
        characters.reduce<number[]>(
        (indexes, character, index) => {
            const neededToChange =
            exercise.prompt[index] !== exercise.answer[index]

            const isCorrect =
            character === exercise.answer[index]

            if (neededToChange && isCorrect) {
            indexes.push(index)
            }

            return indexes
        },
        []
        )

    setConfirmedIndexes(correctlySolvedIndexes)

    if (currentSentence === exercise.answer) {
        setFeedback("correct")
        setScore((currentScore) => currentScore + 10)
    } else {
        setFeedback("incorrect")
        setScore((currentScore) => currentScore - 3)
    }
    }

  function handleRetry() {
    const resetCharacters =
        exercise.prompt.split("").map(
        (character, index) => {
            if (confirmedIndexes.includes(index)) {
            return exercise.answer[index]
            }

            return character
        }
        )

    setCharacters(resetCharacters)
    setFeedback(null)
    }

  function handleNext() {
    if (currentExerciseIndex === exercises.length - 1) {
        setGameFinished(true)
        return
    }

    const nextExerciseIndex = currentExerciseIndex + 1
    const nextExercise = exercises[nextExerciseIndex]

    setCurrentExerciseIndex(nextExerciseIndex)
    setCharacters(nextExercise.prompt.split(""))
    setConfirmedIndexes([])
    setFeedback(null)
    }

  function handleRestart() {
    const newExercises = shuffle(allExercises)

    setExercises(newExercises)
    setCurrentExerciseIndex(0)
    setCharacters(newExercises[0].prompt.split(""))
    setConfirmedIndexes([])
    setFeedback(null)
    setScore(0)
    setGameFinished(false)
  }

  if (gameFinished) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h1>🎉 Fertig!</h1>

        <p
          style={{
            fontSize: "24px",
          }}
        >
          Dein Ergebnis:
        </p>

        <strong
          style={{
            fontSize: "48px",
            color: "#22c55e",
          }}
        >
          {score} / {exercises.length * 10}
        </strong>

        <p>
          {exercises.length} Übungen geschafft!
        </p>

        <button
          onClick={handleRestart}
          style={{
            fontSize: "20px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Noch einmal spielen
        </button>

        <button
          onClick={onBack}
          style={{
            cursor: "pointer",
          }}
        >
          Zurück
        </button>
      </main>
    )
  }

  const words = groupCharactersIntoWords(characters)

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <h1>Groß oder klein?</h1>

      <div
        style={{
          display: "flex",
          gap: "32px",
          fontSize: "18px",
        }}
      >
        <span>
          Übung {currentExerciseIndex + 1} /{" "}
          {exercises.length}
        </span>

        <strong>
          Punkte: {score}
        </strong>
      </div>

      <p
        style={{
          textAlign: "center",
        }}
      >
        Klicke auf die Buchstaben, die groß sein müssen.
      </p>

      <div
        style={{
          width: "min(900px, 95vw)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "18px",
        }}
      >
        {words.map((word, wordIndex) => (
          <div
            key={wordIndex}
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            {word.map((cell) => {
                const confirmed =
                   confirmedIndexes.includes(cell.index)

                const clickable =
                   isLetter(cell.character) &&
                   feedback === null &&
                   !confirmed

                return (
                 <button
                    key={cell.index}
                    onClick={() =>
                        handleCharacterClick(cell.index)
                    }
                    disabled={!clickable}
                    style={{
                        width: "46px",
                        height: "54px",
                        padding: 0,
                        fontSize: "28px",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        cursor: clickable
                        ? "pointer"
                        : "default",

                        backgroundColor: confirmed
                        ? "#22c55e"
                        : undefined,

                        color: confirmed
                        ? "white"
                        : undefined,
                    }}
                    >
                    {cell.character}
                    </button>
                )
              })}
          </div>
        ))}
      </div>

      {feedback === null && (
        <button
          onClick={handleCheck}
          style={{
            fontSize: "20px",
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Prüfen
        </button>
      )}

      {feedback === "incorrect" && (
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          <p>❌ Nicht richtig.</p>

          <button
            onClick={handleRetry}
            style={{
              fontSize: "20px",
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            Noch einmal
          </button>
        </div>
      )}

      {feedback === "correct" && (
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          <p>✅ Richtig!</p>

          <strong
            style={{
              display: "block",
              marginTop: "20px",
              fontSize: "32px",
              color: "#22c55e",
            }}
          >
            {exercise.answer}
          </strong>

          <button
            onClick={handleNext}
            style={{
              marginTop: "24px",
              fontSize: "20px",
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            {currentExerciseIndex ===
            exercises.length - 1
              ? "Ergebnis"
              : "Weiter"}
          </button>
        </div>
      )}

      <button
        onClick={onBack}
        style={{
          marginTop: "24px",
          cursor: "pointer",
        }}
      >
        Zurück
      </button>
    </main>
  )
}