import { useState } from "react"
import { getScrambledSentenceExercises } from "../data/sentences/sentenceLoader"
import type { ScrambledSentence, SentenceCategoryId } from "../types/sentence"

import { GameHeader } from "../components/GameHeader"
import { GameHelp } from "../components/GameHelp"
import { gameHelp } from "../data/help/gameHelp"

type ScrambledSentenceGamePageProps = {
  onBack: () => void
  category?: SentenceCategoryId | null
}

type Token = {
  id: string
  text: string
}

const GAME_LENGTH = 10

type Feedback = "correct" | "incorrect" | null

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    )

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

function createTokens(
  exercise: ScrambledSentence
): Token[] {
  const originalTokens: Token[] =
    exercise.answer.map((text, index) => ({
      id: `${exercise.id}-${index}`,
      text,
    }))

  let shuffledTokens = shuffle(originalTokens)

  // Avoid starting with the sentence already
  // in the correct order.
  for (let attempt = 0; attempt < 10; attempt++) {
    const shuffledSentence = shuffledTokens
      .map((token) => token.text)
      .join(" ")

    const correctSentence =
      exercise.answer.join(" ")

    if (shuffledSentence !== correctSentence) {
      break
    }

    shuffledTokens = shuffle(originalTokens)
  }

  return shuffledTokens
}

export function ScrambledSentenceGamePage({
  onBack,
  category,
}: ScrambledSentenceGamePageProps) {
  const allExercises =
    getScrambledSentenceExercises(category)

  const [exercises, setExercises] =
    useState<ScrambledSentence[]>(() =>
      shuffle(allExercises).slice(0, GAME_LENGTH)
    )

  const [
    currentExerciseIndex,
    setCurrentExerciseIndex,
  ] = useState(0)

  const [
    availableTokens,
    setAvailableTokens,
  ] = useState<Token[]>(() =>
    exercises[0] ? createTokens(exercises[0]) : []
  )

  const [
    selectedTokens,
    setSelectedTokens,
  ] = useState<Token[]>([])

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

  function handleAvailableTokenClick(
    token: Token
  ) {
    if (feedback !== null) {
      return
    }

    setAvailableTokens((currentTokens) =>
      currentTokens.filter(
        (currentToken) =>
          currentToken.id !== token.id
      )
    )

    setSelectedTokens((currentTokens) => [
      ...currentTokens,
      token,
    ])
  }

  function handleSelectedTokenClick(
    token: Token
  ) {
    if (feedback !== null) {
      return
    }

    setSelectedTokens((currentTokens) =>
      currentTokens.filter(
        (currentToken) =>
          currentToken.id !== token.id
      )
    )

    setAvailableTokens((currentTokens) => [
      ...currentTokens,
      token,
    ])
  }

  function handleCheck() {
    const selectedWords =
      selectedTokens.map(
        (token) => token.text
      )

    const isCorrect =
      selectedWords.length ===
        exercise.answer.length &&
      selectedWords.every(
        (word, index) =>
          word === exercise.answer[index]
      )

    if (isCorrect) {
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
    setSelectedTokens([])
    setAvailableTokens(
      createTokens(exercise)
    )
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

    const nextExerciseIndex =
      currentExerciseIndex + 1

    const nextExercise =
      exercises[nextExerciseIndex]

    setCurrentExerciseIndex(
      nextExerciseIndex
    )

    setSelectedTokens([])

    setAvailableTokens(
      createTokens(nextExercise)
    )

    setFeedback(null)
  }

  function handleRestart() {
    const newExercises =
      shuffle(allExercises).slice(0, GAME_LENGTH)

    setExercises(newExercises)
    setCurrentExerciseIndex(0)
    setSelectedTokens([])

    setAvailableTokens(
      newExercises[0] ? createTokens(newExercises[0]) : []
    )

    setFeedback(null)
    setScore(0)
    setGameFinished(false)
  }

  if (exercises.length === 0) {
    return (
      <>
        <GameHeader
          title="Schüttelsätze · Scrambled sentences"
          onBack={onBack}
          onHelp={() => setShowHelp(true)}
        />
        {showHelp && (
          <GameHelp
            content={gameHelp.scrambledSentences}
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
          title="Schüttelsätze · Scrambled sentences"
          onBack={onBack}
          onHelp={() =>
            setShowHelp(true)
          }
        />

        {showHelp && (
          <GameHelp
            content={
              gameHelp.scrambledSentences
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
            {exercises.length} Sätze geschafft!
            <br />
            {exercises.length} sentences completed!
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
        title="Schüttelsätze · Scrambled sentences"
        onBack={onBack}
        onHelp={() =>
          setShowHelp(true)
        }
      />

      {showHelp && (
        <GameHelp
          content={
            gameHelp.scrambledSentences
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
            Satz / Sentence: {" "}
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
            gap: "24px",

            padding: "28px 22px",

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
            Bringe die Wörter in die richtige Reihenfolge.
            <br />
            Put the words in the correct order.
          </p>

          {/* Sentence being built */}
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                marginBottom: "8px",
                fontSize: "15px",
                opacity: 0.65,
                textAlign: "center",
              }}
            >
              Dein Satz · Your sentence
            </div>

            <div
              style={{
                minHeight: "78px",

                padding: "16px",

                border:
                  "2px solid rgba(255, 255, 255, 0.18)",

                borderRadius: "12px",

                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedTokens.length ===
              0 ? (
                <span
                  style={{
                    opacity: 0.4,
                  }}
                >
                  Wörter auswählen... · Select words...
                </span>
              ) : (
                selectedTokens.map(
                  (token) => (
                    <button
                      key={token.id}
                      onClick={() =>
                        handleSelectedTokenClick(
                          token
                        )
                      }
                      disabled={
                        feedback !== null
                      }
                      style={{
                        fontSize: "22px",
                        padding:
                          "10px 14px",

                        cursor:
                          feedback ===
                          null
                            ? "pointer"
                            : "default",
                      }}
                    >
                      {token.text}
                    </button>
                  )
                )
              )}
            </div>
          </div>

          {/* Available words */}
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                fontSize: "15px",
                opacity: 0.65,
                textAlign: "center",
              }}
            >
              Wörter · Words
            </div>

            <div
              style={{
                minHeight: "60px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {availableTokens.map(
                (token) => (
                  <button
                    key={token.id}
                    onClick={() =>
                      handleAvailableTokenClick(
                        token
                      )
                    }
                    disabled={
                      feedback !== null
                    }
                    style={{
                      fontSize: "22px",
                      padding:
                        "12px 16px",

                      cursor:
                        feedback ===
                        null
                          ? "pointer"
                          : "default",
                    }}
                  >
                    {token.text}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Check button */}
          {feedback === null && (
            <button
              onClick={handleCheck}
              disabled={
                selectedTokens.length !==
                exercise.answer.length
              }
              style={{
                marginTop: "4px",
                fontSize: "20px",
                padding: "12px 24px",

                cursor:
                  selectedTokens.length ===
                  exercise.answer.length
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
              {formatSentence(
                exercise.answer
              )}
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