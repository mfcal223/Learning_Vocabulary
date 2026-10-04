import { useState } from "react"
import scrambledSentencesData from "../data/revision/scrambledSentences.json"
import type { ScrambledSentence } from "../types/revision"

type ScrambledSentenceGamePageProps = {
  onBack: () => void
}

type Token = {
  id: string
  text: string
}

type Feedback = "correct" | "incorrect" | null

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

function formatSentence(words: string[]): string {
  return words
    .join(" ")
    .replace(/\s+([.!?])/g, "$1")
}

function createTokens(exercise: ScrambledSentence): Token[] {
  const originalTokens: Token[] = exercise.answer.map((text, index) => ({
    id: `${exercise.id}-${index}`,
    text,
  }))

  let shuffledTokens = shuffle(originalTokens)

  // Avoid starting with the sentence already in the correct order.
  for (let attempt = 0; attempt < 10; attempt++) {
    const shuffledSentence = shuffledTokens
      .map((token) => token.text)
      .join(" ")

    const correctSentence = exercise.answer.join(" ")

    if (shuffledSentence !== correctSentence) {
      break
    }

    shuffledTokens = shuffle(originalTokens)
  }

  return shuffledTokens
}

export function ScrambledSentenceGamePage({
  onBack,
}: ScrambledSentenceGamePageProps) {
  const allExercises =
    scrambledSentencesData as ScrambledSentence[]

  const [exercises, setExercises] = useState<ScrambledSentence[]>(
    () => shuffle(allExercises)
  )

  const [currentExerciseIndex, setCurrentExerciseIndex] =
    useState(0)

  const [availableTokens, setAvailableTokens] =
    useState<Token[]>(() => createTokens(exercises[0]))

  const [selectedTokens, setSelectedTokens] =
    useState<Token[]>([])

  const [feedback, setFeedback] =
    useState<Feedback>(null)

  const [score, setScore] = useState(0)

  const [gameFinished, setGameFinished] =
    useState(false)

  const exercise = exercises[currentExerciseIndex]

  function handleAvailableTokenClick(token: Token) {
    if (feedback !== null) {
      return
    }

    setAvailableTokens((currentTokens) =>
      currentTokens.filter(
        (currentToken) => currentToken.id !== token.id
      )
    )

    setSelectedTokens((currentTokens) => [
      ...currentTokens,
      token,
    ])
  }

  function handleSelectedTokenClick(token: Token) {
    if (feedback !== null) {
      return
    }

    setSelectedTokens((currentTokens) =>
      currentTokens.filter(
        (currentToken) => currentToken.id !== token.id
      )
    )

    setAvailableTokens((currentTokens) => [
      ...currentTokens,
      token,
    ])
  }

  function handleCheck() {
    const selectedWords = selectedTokens.map(
        (token) => token.text
    )

    const isCorrect =
        selectedWords.length === exercise.answer.length &&
        selectedWords.every(
        (word, index) => word === exercise.answer[index]
        )

    if (isCorrect) {
        setFeedback("correct")
        setScore((currentScore) => currentScore + 10)
    } else {
        setFeedback("incorrect")
        setScore((currentScore) => currentScore - 3)
    }
    }

  function handleRetry() {
    setSelectedTokens([])
    setAvailableTokens(createTokens(exercise))
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
    setSelectedTokens([])
    setAvailableTokens(createTokens(nextExercise))
    setFeedback(null)
  }

  function handleRestart() {
    const newExercises = shuffle(allExercises)

    setExercises(newExercises)
    setCurrentExerciseIndex(0)
    setSelectedTokens([])
    setAvailableTokens(createTokens(newExercises[0]))
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
          {exercises.length} Sätze geschafft!
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
      <h1>Schüttelsätze</h1>

      <div
        style={{
          display: "flex",
          gap: "32px",
          fontSize: "18px",
        }}
      >
        <span>
          Satz {currentExerciseIndex + 1} /{" "}
          {exercises.length}
        </span>

        <strong>
          Punkte: {score}
        </strong>
      </div>

      <p>
        Bringe die Wörter in die richtige Reihenfolge.
      </p>

      {/* Sentence being built */}
      <div
        style={{
          minHeight: "70px",
          width: "min(700px, 90vw)",
          padding: "16px",
          border: "2px solid #555",
          borderRadius: "12px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedTokens.length === 0 ? (
          <span
            style={{
              opacity: 0.5,
            }}
          >
            Wörter hier auswählen...
          </span>
        ) : (
          selectedTokens.map((token) => (
            <button
              key={token.id}
              onClick={() =>
                handleSelectedTokenClick(token)
              }
              disabled={feedback !== null}
              style={{
                fontSize: "22px",
                padding: "10px 14px",
                cursor:
                  feedback === null
                    ? "pointer"
                    : "default",
              }}
            >
              {token.text}
            </button>
          ))
        )}
      </div>

      {/* Available words */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "700px",
        }}
      >
        {availableTokens.map((token) => (
          <button
            key={token.id}
            onClick={() =>
              handleAvailableTokenClick(token)
            }
            disabled={feedback !== null}
            style={{
              fontSize: "22px",
              padding: "12px 16px",
              cursor:
                feedback === null
                  ? "pointer"
                  : "default",
            }}
          >
            {token.text}
          </button>
        ))}
      </div>

      {feedback === null && (
        <button
          onClick={handleCheck}
          disabled={
            selectedTokens.length !== exercise.answer.length
          }
          style={{
            fontSize: "20px",
            padding: "12px 24px",
            cursor:
              selectedTokens.length ===
              exercise.answer.length
                ? "pointer"
                : "default",
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
            {formatSentence(exercise.answer)}
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
            {currentExerciseIndex === exercises.length - 1
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