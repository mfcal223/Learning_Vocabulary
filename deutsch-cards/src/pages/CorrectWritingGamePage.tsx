import { useState } from "react"
import correctWritingData from "../data/revision/correctWriting.json"
import type { CorrectWritingExercise } from "../types/revision"

type CorrectWritingGamePageProps = {
  onBack: () => void
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

export function CorrectWritingGamePage({
  onBack,
}: CorrectWritingGamePageProps) {
  const allExercises =
    correctWritingData as CorrectWritingExercise[]

  const [exercises, setExercises] = useState<
    CorrectWritingExercise[]
  >(() => shuffle(allExercises))

  const [currentExerciseIndex, setCurrentExerciseIndex] =
    useState(0)

  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] =
    useState<Feedback>(null)

  const [score, setScore] = useState(0)
  const [gameFinished, setGameFinished] =
    useState(false)

  const exercise = exercises[currentExerciseIndex]

  function handleCheck() {
    const answer = userAnswer.trim()

    if (answer === exercise.answer) {
      setFeedback("correct")
      setScore((currentScore) => currentScore + 10)
    } else {
      setFeedback("incorrect")
      setScore((currentScore) => currentScore - 3)
    }
  }

  function handleRetry() {
    setUserAnswer("")
    setFeedback(null)
  }

  function handleNext() {
    if (currentExerciseIndex === exercises.length - 1) {
      setGameFinished(true)
      return
    }

    setCurrentExerciseIndex(
      (currentIndex) => currentIndex + 1
    )

    setUserAnswer("")
    setFeedback(null)
  }

  function handleRestart() {
    const newExercises = shuffle(allExercises)

    setExercises(newExercises)
    setCurrentExerciseIndex(0)
    setUserAnswer("")
    setFeedback(null)
    setScore(0)
    setGameFinished(false)
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      event.key === "Enter" &&
      feedback === null &&
      userAnswer.trim() !== ""
    ) {
      handleCheck()
    }
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
      <h1>Schreibe richtig</h1>

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

      <p>
        Schreibe den Satz richtig.
      </p>

      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          overflowWrap: "anywhere",
        }}
      >
        {exercise.prompt}
      </div>

      <input
        type="text"
        value={userAnswer}
        onChange={(event) =>
          setUserAnswer(event.target.value)
        }
        onKeyDown={handleKeyDown}
        disabled={feedback !== null}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        autoFocus
        style={{
          width: "min(700px, 90vw)",
          fontSize: "26px",
          padding: "14px 18px",
          borderRadius: "10px",
          border: "2px solid #777",
          textAlign: "center",
        }}
      />

      {feedback === null && (
        <button
          onClick={handleCheck}
          disabled={userAnswer.trim() === ""}
          style={{
            fontSize: "20px",
            padding: "12px 24px",
            cursor:
              userAnswer.trim() !== ""
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