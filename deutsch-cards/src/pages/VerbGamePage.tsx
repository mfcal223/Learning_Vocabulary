import { useState } from "react"
import endingsData from "../data/verbs/endings.json"
import type { Verb } from "../types/verbs"

import { GameHeader } from "../components/GameHeader"
import { GameHelp } from "../components/GameHelp"
import { gameHelp } from "../data/help/gameHelp"

type VerbGamePageProps = {
  onBack: () => void
}

type VerbForm =
  | "ich"
  | "thirdPerson"
  | "plural"

type Subject = {
  label: string
  ending: "e" | "t" | "en"
  verbForm: VerbForm
}

type Exercise = {
  verbIndex: number
  subjectIndex: number
  fullFormOptions?: string[]
}

const subjects: Subject[] = [
  {
    label: "Ich",
    ending: "e",
    verbForm: "ich",
  },
  {
    label: "Kari",
    ending: "t",
    verbForm: "thirdPerson",
  },
  {
    label: "Mama",
    ending: "t",
    verbForm: "thirdPerson",
  },
  {
    label: "Alle",
    ending: "en",
    verbForm: "plural",
  },
]

const GAME_LENGTH = 15

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

function createExercises(
  verbs: Verb[]
): Exercise[] {
  const allExercises: Exercise[] = []

  for (
    let verbIndex = 0;
    verbIndex < verbs.length;
    verbIndex++
  ) {
    for (
      let subjectIndex = 0;
      subjectIndex < subjects.length;
      subjectIndex++
    ) {
      const verb = verbs[verbIndex]

      const exercise: Exercise = {
        verbIndex,
        subjectIndex,
      }

      if (verb.exerciseType === "fullForm") {
        exercise.fullFormOptions = shuffle([
          verb.ich,
          verb.thirdPerson,
          verb.plural,
        ])
      }

      allExercises.push(exercise)
    }
  }

  return shuffle(allExercises).slice(
    0,
    Math.min(GAME_LENGTH, allExercises.length)
  )
}

export function VerbGamePage({
  onBack,
}: VerbGamePageProps) {
  const verbs = endingsData as Verb[]

  const [exercises, setExercises] =
    useState<Exercise[]>(() =>
      createExercises(verbs)
    )

  const [
    currentExerciseIndex,
    setCurrentExerciseIndex,
  ] = useState(0)

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState<string | null>(null)

  const [
    showTranslation,
    setShowTranslation,
  ] = useState(false)

  const [showHelp, setShowHelp] =
    useState(false)

  const [score, setScore] = useState(0)

  const [gameFinished, setGameFinished] =
    useState(false)

  const exercise =
    exercises[currentExerciseIndex]

  const verb =
    verbs[exercise.verbIndex]

  const subject =
    subjects[exercise.subjectIndex]

  const correctVerbForm =
    verb[subject.verbForm]

  const isEndingExercise =
    verb.exerciseType === "ending"

  const correctAnswer =
    isEndingExercise
      ? subject.ending
      : correctVerbForm

  const answerOptions =
    isEndingExercise
      ? ["e", "t", "en"]
      : exercise.fullFormOptions ?? []

  function handleAnswer(answer: string) {
    setSelectedAnswer(answer)

    if (answer === correctAnswer) {
      setScore(
        (currentScore) =>
          currentScore + 10
      )
    } else {
      setScore(
        (currentScore) =>
          currentScore - 3
      )
    }
  }

  function handleRetry() {
    setSelectedAnswer(null)
    setShowTranslation(false)
  }

  function handleNext() {
    setSelectedAnswer(null)
    setShowTranslation(false)

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
  }

  function handleRestart() {
    setExercises(
      createExercises(verbs)
    )

    setCurrentExerciseIndex(0)
    setSelectedAnswer(null)
    setShowTranslation(false)
    setScore(0)
    setGameFinished(false)
  }

  if (gameFinished) {
    return (
      <>
        <GameHeader
          title="Verb-Endungen"
          onBack={onBack}
          onHelp={() => setShowHelp(true)}
        />

        {showHelp && (
          <GameHelp
            content={gameHelp.verbs}
            onClose={() => setShowHelp(false)}
          />
        )}

        <main
          style={{
            minHeight: "calc(100vh - 80px)",
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
            🎉 Fertig!
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "22px",
            }}
          >
            Dein Ergebnis:
          </p>

          <strong
            style={{
              fontSize: "52px",
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
        </main>
      </>
    )
  }

  return (
    <>
      <GameHeader
        title="Verb-Endungen"
        onBack={onBack}
        onHelp={() => setShowHelp(true)}
      />

      {showHelp && (
        <GameHelp
          content={gameHelp.verbs}
          onClose={() => setShowHelp(false)}
        />
      )}

      <main
        style={{
          minHeight: "calc(100vh - 80px)",
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
            width: "min(620px, 92vw)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
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

        {/* Exercise card */}
        <section
          style={{
            width: "min(620px, 92vw)",
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
          {isEndingExercise ? (
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: "18px",
                  opacity: 0.85,
                }}
              >
                Welche Endung fehlt?
              </p>

              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {subject.label} {verb.stem}___
              </div>
            </>
          ) : (
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: "18px",
                  opacity: 0.85,
                }}
              >
                Welche Verbform ist richtig?
              </p>

              <div
                style={{
                  fontSize: "18px",
                  opacity: 0.8,
                }}
              >
                Verb:{" "}
                <strong>
                  {verb.infinitive}
                </strong>
              </div>

              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {subject.label} ______
              </div>
            </>
          )}

          {/* Answer buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {answerOptions.map(
              (answer) => (
                <button
                  key={answer}
                  onClick={() =>
                    handleAnswer(answer)
                  }
                  disabled={
                    selectedAnswer !== null
                  }
                  style={{
                    minWidth:
                      isEndingExercise
                        ? "68px"
                        : "110px",

                    fontSize:
                      isEndingExercise
                        ? "28px"
                        : "22px",

                    padding: "16px 22px",
                    cursor: "pointer",
                  }}
                >
                  {answer}
                </button>
              )
            )}
          </div>
        </section>

        {/* Feedback */}
        {selectedAnswer && (
          <section
            style={{
              width: "min(620px, 92vw)",
              marginTop: "28px",
              textAlign: "center",
            }}
          >
            {selectedAnswer === correctAnswer ? (
              <>
                <p
                  style={{
                    margin: 0,
                    fontSize: "24px",
                  }}
                >
                  ✅ Richtig!
                </p>

                <strong
                  style={{
                    display: "block",
                    marginTop: "20px",
                    fontSize: "36px",
                    color: "#22c55e",
                  }}
                >
                  {subject.label}{" "}
                  {correctVerbForm}.
                </strong>

                <button
                  onClick={() =>
                    setShowTranslation(
                      !showTranslation
                    )
                  }
                  style={{
                    marginTop: "18px",
                    fontSize: "16px",
                    padding: "9px 14px",
                    cursor: "pointer",
                  }}
                >
                  🌍{" "}
                  {showTranslation
                    ? "Bedeutung ausblenden"
                    : "Bedeutung zeigen"}
                </button>

                {showTranslation && (
                  <div
                    style={{
                      marginTop: "14px",
                      fontSize: "18px",
                      lineHeight: "1.7",
                    }}
                  >
                    <div>
                      🇬🇧 {verb.english}
                    </div>

                    <div>
                      🇪🇸 {verb.spanish}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  style={{
                    display: "block",
                    margin: "24px auto 0",
                    fontSize: "20px",
                    padding: "12px 24px",
                    cursor: "pointer",
                  }}
                >
                  {currentExerciseIndex ===
                  exercises.length - 1
                    ? "Ergebnis"
                    : "Weiter"}
                </button>
              </>
            ) : (
              <>
                <p
                  style={{
                    margin: 0,
                    fontSize: "24px",
                  }}
                >
                  ❌ Nicht richtig.
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
                  Noch einmal
                </button>
              </>
            )}
          </section>
        )}
      </main>
    </>
  )
}
/*
import { useState } from "react"
import endingsData from "../data/verbs/endings.json"
import type { Verb } from "../types/verbs"

type VerbGamePageProps = {
  onBack: () => void
}

type VerbForm =
  | "ich"
  | "thirdPerson"
  | "plural"

type Subject = {
  label: string
  ending: "e" | "t" | "en"
  verbForm: VerbForm
}

type Exercise = {
  verbIndex: number
  subjectIndex: number
  fullFormOptions?: string[]
}

const subjects: Subject[] = [
  {
    label: "Ich",
    ending: "e",
    verbForm: "ich",
  },
  {
    label: "Kari",
    ending: "t",
    verbForm: "thirdPerson",
  },
  {
    label: "Mama",
    ending: "t",
    verbForm: "thirdPerson",
  },
  {
    label: "Alle",
    ending: "en",
    verbForm: "plural",
  },
]

const GAME_LENGTH = 15

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

function createExercises(
  verbs: Verb[]
): Exercise[] {
  const allExercises: Exercise[] = []

  for (
    let verbIndex = 0;
    verbIndex < verbs.length;
    verbIndex++
  ) {
    for (
      let subjectIndex = 0;
      subjectIndex < subjects.length;
      subjectIndex++
    ) {
      const verb = verbs[verbIndex]

      const exercise: Exercise = {
        verbIndex,
        subjectIndex,
      }

      if (verb.exerciseType === "fullForm") {
        exercise.fullFormOptions = shuffle([
          verb.ich,
          verb.thirdPerson,
          verb.plural,
        ])
      }

      allExercises.push(exercise)
    }
  }

  return shuffle(allExercises).slice(
    0,
    Math.min(GAME_LENGTH, allExercises.length)
  )
}

export function VerbGamePage({
  onBack,
}: VerbGamePageProps) {
  const verbs = endingsData as Verb[]

  const [exercises, setExercises] =
    useState<Exercise[]>(() =>
      createExercises(verbs)
    )

  const [
    currentExerciseIndex,
    setCurrentExerciseIndex,
  ] = useState(0)

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState<string | null>(null)

  const [
    showTranslation,
    setShowTranslation,
  ] = useState(false)

  const [score, setScore] = useState(0)

  const [gameFinished, setGameFinished] =
    useState(false)

  const exercise =
    exercises[currentExerciseIndex]

  const verb =
    verbs[exercise.verbIndex]

  const subject =
    subjects[exercise.subjectIndex]

  const correctVerbForm =
    verb[subject.verbForm]

  const isEndingExercise =
    verb.exerciseType === "ending"

  const correctAnswer =
    isEndingExercise
      ? subject.ending
      : correctVerbForm

  const answerOptions =
    isEndingExercise
      ? ["e", "t", "en"]
      : exercise.fullFormOptions ?? []

  function handleAnswer(answer: string) {
    setSelectedAnswer(answer)

    if (answer === correctAnswer) {
      setScore(
        (currentScore) =>
          currentScore + 10
      )
    } else {
      setScore(
        (currentScore) =>
          currentScore - 3
      )
    }
  }

  function handleRetry() {
    setSelectedAnswer(null)
    setShowTranslation(false)
  }

  function handleNext() {
    setSelectedAnswer(null)
    setShowTranslation(false)

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
  }

  function handleRestart() {
    setExercises(
      createExercises(verbs)
    )

    setCurrentExerciseIndex(0)
    setSelectedAnswer(null)
    setShowTranslation(false)
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
          {score} /{" "}
          {exercises.length * 10}
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
      <h1>Verb-Endungen</h1>

      <div
        style={{
          display: "flex",
          gap: "32px",
          fontSize: "18px",
        }}
      >
        <span>
          Übung{" "}
          {currentExerciseIndex + 1} /{" "}
          {exercises.length}
        </span>

        <strong>
          Punkte: {score}
        </strong>
      </div>

      {isEndingExercise ? (
        <>
          <p>
            Welche Endung fehlt?
          </p>

          <div
            style={{
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            {subject.label}{" "}
            {verb.stem}___
          </div>
        </>
      ) : (
        <>
          <p>
            Welche Verbform ist richtig?
          </p>

          <div
            style={{
              fontSize: "20px",
            }}
          >
            Verb:{" "}
            <strong>
              {verb.infinitive}
            </strong>
          </div>

          <div
            style={{
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            {subject.label} ______
          </div>
        </>
      )}

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {answerOptions.map(
          (answer) => (
            <button
              key={answer}
              onClick={() =>
                handleAnswer(answer)
              }
              disabled={
                selectedAnswer !== null
              }
              style={{
                fontSize: isEndingExercise
                  ? "28px"
                  : "24px",
                padding:
                  "16px 24px",
                cursor: "pointer",
              }}
            >
              {answer}
            </button>
          )
        )}
      </div>

      {selectedAnswer && (
        <div
          style={{
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          {selectedAnswer ===
          correctAnswer ? (
            <>
              <p>✅ Richtig!</p>

              <strong
                style={{
                  display: "block",
                  marginTop: "24px",
                  fontSize: "36px",
                  color: "#22c55e",
                }}
              >
                {subject.label}{" "}
                {correctVerbForm}.
              </strong>

              <button
                onClick={() =>
                  setShowTranslation(
                    !showTranslation
                  )
                }
                style={{
                  marginTop: "16px",
                  fontSize: "16px",
                  padding: "8px 14px",
                  cursor: "pointer",
                }}
              >
                🌍{" "}
                {showTranslation
                  ? "Bedeutung ausblenden"
                  : "Bedeutung zeigen"}
              </button>

              {showTranslation && (
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "18px",
                    lineHeight: "1.6",
                  }}
                >
                  <div>
                    🇬🇧 {verb.english}
                  </div>

                  <div>
                    🇪🇸 {verb.spanish}
                  </div>
                </div>
              )}

              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={handleNext}
                  style={{
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
            </>
          ) : (
            <>
              <p>
                ❌ Nicht richtig.
              </p>

              <div
                style={{
                  marginTop: "20px",
                }}
              >
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
            </>
          )}
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
*/