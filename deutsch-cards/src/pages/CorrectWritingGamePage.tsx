import { useState } from "react"
import { getCorrectWritingExercises } from "../data/sentences/sentenceLoader"
import type { CorrectWritingExercise, SentenceCategoryId } from "../types/sentence"

import { GameHeader } from "../components/GameHeader"
import { GameHelp } from "../components/GameHelp"
import { gameHelp } from "../data/help/gameHelp"

type CorrectWritingGamePageProps = {
  onBack: () => void
  category?: SentenceCategoryId | null
}

const GAME_LENGTH = 10

type Feedback = "correct" | "incorrect" | null

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex =
      Math.floor(Math.random() * (i + 1))

    const temporary = shuffled[i]
    shuffled[i] = shuffled[randomIndex]
    shuffled[randomIndex] = temporary
  }

  return shuffled
}

export function CorrectWritingGamePage({
  onBack,
  category,
}: CorrectWritingGamePageProps) {
  const allExercises =
    getCorrectWritingExercises(category)

  const [exercises, setExercises] = useState<
    CorrectWritingExercise[]
  >(() => shuffle(allExercises).slice(0, GAME_LENGTH))

  const [
    currentExerciseIndex,
    setCurrentExerciseIndex,
  ] = useState(0)

  const [userAnswer, setUserAnswer] =
    useState("")

  const [feedback, setFeedback] =
    useState<Feedback>(null)

  const [showHelp, setShowHelp] =
    useState(false)

  const [score, setScore] =
    useState(0)

  const [gameFinished, setGameFinished] =
    useState(false)

  const exercise =
    exercises[currentExerciseIndex]

  function handleCheck() {
    const answer = userAnswer.trim()

    if (answer === exercise.answer) {
      setFeedback("correct")
      setScore(
        (currentScore) =>
          currentScore + 10
      )
    } else {
      setFeedback("incorrect")
      setScore(
        (currentScore) =>
          currentScore - 3
      )
    }
  }

  function handleRetry() {
    setUserAnswer("")
    setFeedback(null)
  }

  function handleNext() {
    if (
      currentExerciseIndex ===
      exercises.length - 1
    ) {
      setGameFinished(true)
      return
    }

    setCurrentExerciseIndex(
      (currentIndex) =>
        currentIndex + 1
    )

    setUserAnswer("")
    setFeedback(null)
  }

  function handleRestart() {
    const newExercises =
      shuffle(allExercises).slice(0, GAME_LENGTH)

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

  if (exercises.length === 0) {
    return (
      <>
        <GameHeader
          title="Schreibe richtig · Write correctly"
          onBack={onBack}
          onHelp={() => setShowHelp(true)}
        />
        {showHelp && (
          <GameHelp
            content={gameHelp.correctWriting}
            onClose={() => setShowHelp(false)}
          />
        )}
        <main style={{ padding: "32px", textAlign: "center" }}>
          <h2>Keine Übungen verfügbar · No exercises available</h2>
          <p>Für diese Kategorie gibt es noch keine Übungen.</p>
        </main>
      </>
    )
  }

  if (gameFinished) {
    return (
      <>
        <GameHeader
          title="Schreibe richtig · Write correctly"
          onBack={onBack}
          onHelp={() =>
            setShowHelp(true)
          }
        />

        {showHelp && (
          <GameHelp
            content={
              gameHelp.correctWriting
            }
            onClose={() =>
              setShowHelp(false)
            }
          />
        )}

        <main
          style={{
            minHeight:
              "calc(100vh - 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "36px",
            }}
          >
            🎉 Fertig! · Finished!
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "22px",
            }}
          >
            Dein Ergebnis · Your score
          </p>

          <strong
            style={{
              fontSize: "52px",
              color: "#22c55e",
            }}
          >
            {score} /{" "}
            {exercises.length * 10}
          </strong>

          <p>
            {exercises.length} Übungen geschafft!
            <br />
            {exercises.length} exercises completed!
          </p>

          <button
            onClick={handleRestart}
            style={{
              fontSize: "20px",
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            Noch einmal · Play again
          </button>
        </main>
      </>
    )
  }

  return (
    <>
      <GameHeader
        title="Schreibe richtig · Write correctly"
        onBack={onBack}
        onHelp={() =>
          setShowHelp(true)
        }
      />

      {showHelp && (
        <GameHelp
          content={
            gameHelp.correctWriting
          }
          onClose={() =>
            setShowHelp(false)
          }
        />
      )}

      <main
        style={{
          minHeight:
            "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "28px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* Progress and score */}
        <div
          style={{
            width: "min(720px, 92vw)",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "28px",
            fontSize: "18px",
          }}
        >
          <span>
            Übung / Exercise{" "}
            {currentExerciseIndex + 1} /{" "}
            {exercises.length}
          </span>

          <strong>
            Punkte / Score: {score}
          </strong>
        </div>

        {/* Exercise card */}
        <section
          style={{
            width: "min(720px, 92vw)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "26px",

            padding: "32px 24px",

            border:
              "1px solid rgba(255, 255, 255, 0.12)",

            borderRadius: "18px",

            backgroundColor:
              "rgba(255, 255, 255, 0.025)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              opacity: 0.85,
              textAlign: "center",
            }}
          >
            Schreibe den Satz richtig.
            <br />
            Write the sentence correctly.
          </p>

          {/* Original sentence */}
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                fontSize: "15px",
                opacity: 0.6,
              }}
            >
              Satz · Sentence
            </div>

            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                overflowWrap: "anywhere",
              }}
            >
              {exercise.prompt}
            </div>
          </div>

          {/* User answer */}
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                fontSize: "15px",
                opacity: 0.6,
              }}
            >
              Deine Antwort · Your answer
            </div>

            <input
              type="text"
              value={userAnswer}
              onChange={(event) =>
                setUserAnswer(
                  event.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              disabled={
                feedback !== null
              }
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              style={{
                width: "min(620px, 90%)",
                boxSizing: "border-box",
                fontSize: "26px",
                padding: "14px 18px",
                borderRadius: "10px",
                border:
                  "2px solid rgba(255, 255, 255, 0.25)",
                textAlign: "center",
              }}
            />
          </div>

          {feedback === null && (
            <button
              onClick={handleCheck}
              disabled={
                userAnswer.trim() === ""
              }
              style={{
                fontSize: "20px",
                padding: "12px 24px",

                cursor:
                  userAnswer.trim() !== ""
                    ? "pointer"
                    : "default",
              }}
            >
              Prüfen · Check
            </button>
          )}
        </section>

        {/* Incorrect feedback */}
        {feedback === "incorrect" && (
          <section
            style={{
              width:
                "min(720px, 92vw)",
              marginTop: "28px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "24px",
              }}
            >
              ❌ Nicht richtig · Not correct
            </p>

            <button
              onClick={handleRetry}
              style={{
                marginTop: "20px",
                fontSize: "20px",
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              Noch einmal · Try again
            </button>
          </section>
        )}

        {/* Correct feedback */}
        {feedback === "correct" && (
          <section
            style={{
              width:
                "min(720px, 92vw)",
              marginTop: "28px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "24px",
              }}
            >
              ✅ Richtig! · Correct!
            </p>

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
                padding: "12px 24px",
                cursor: "pointer",
              }}
            >
              {currentExerciseIndex ===
                exercises.length - 1
                ? "Ergebnis · Results"
                : "Weiter · Next"}
            </button>
          </section>
        )}
      </main>
    </>
  )
}