import { useState } from "react"
import endingsData from "../data/verbs/endings.json"
import type { Verb } from "../types/verbs"

type VerbGamePageProps = {
  onBack: () => void
}

type Subject = {
  label: string
  ending: "e" | "t" | "en"
  verbForm: "ich" | "thirdPerson" | "plural"
}

type Exercise = {
  verbIndex: number
  subjectIndex: number
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

function createExercises(verbs: Verb[]): Exercise[] {
  const allExercises: Exercise[] = []

  // Create every possible verb + subject combination.
  for (let verbIndex = 0; verbIndex < verbs.length; verbIndex++) {
    for (
      let subjectIndex = 0;
      subjectIndex < subjects.length;
      subjectIndex++
    ) {
      allExercises.push({
        verbIndex,
        subjectIndex,
      })
    }
  }

  // Fisher-Yates shuffle.
  for (let i = allExercises.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    const temporary = allExercises[i]
    allExercises[i] = allExercises[randomIndex]
    allExercises[randomIndex] = temporary
  }

  // Take only the exercises needed for this game.
  return allExercises.slice(
    0,
    Math.min(GAME_LENGTH, allExercises.length)
  )
}

export function VerbGamePage({ onBack }: VerbGamePageProps) {
  const verbs = endingsData as Verb[]

  const [exercises, setExercises] = useState<Exercise[]>(() =>
    createExercises(verbs)
  )

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedEnding, setSelectedEnding] = useState<string | null>(null)
  const [showTranslation, setShowTranslation] = useState(false)
  const [score, setScore] = useState(0)
  const [gameFinished, setGameFinished] = useState(false)

  const exercise = exercises[currentExerciseIndex]

  const verb = verbs[exercise.verbIndex]
  const subject = subjects[exercise.subjectIndex]

  const correctEnding = subject.ending
  const correctVerbForm = verb[subject.verbForm]

  function handleAnswer(ending: string) {
    setSelectedEnding(ending)

    if (ending === correctEnding) {
      setScore((currentScore) => currentScore + 10)
    } else {
      setScore((currentScore) => currentScore - 3)
    }
  }

  function handleRetry() {
    setSelectedEnding(null)
    setShowTranslation(false)
  }

  function handleNext() {
    setSelectedEnding(null)
    setShowTranslation(false)

    if (currentExerciseIndex === exercises.length - 1) {
      setGameFinished(true)
      return
    }

    setCurrentExerciseIndex((currentIndex) => currentIndex + 1)
  }

  function handleRestart() {
    setExercises(createExercises(verbs))
    setCurrentExerciseIndex(0)
    setSelectedEnding(null)
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
      <h1>Verb-Endungen</h1>

      <div
        style={{
          display: "flex",
          gap: "32px",
          fontSize: "18px",
        }}
      >
        <span>
          Übung {currentExerciseIndex + 1} / {exercises.length}
        </span>

        <strong>
          Punkte: {score}
        </strong>
      </div>

      <p>Welche Endung fehlt?</p>

      <div
        style={{
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        {subject.label} {verb.stem}___
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        {["e", "t", "en"].map((ending) => (
          <button
            key={ending}
            onClick={() => handleAnswer(ending)}
            disabled={selectedEnding !== null}
            style={{
              fontSize: "28px",
              padding: "16px 24px",
              cursor: "pointer",
            }}
          >
            {ending}
          </button>
        ))}
      </div>

      {selectedEnding && (
        <div
          style={{
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          {selectedEnding === correctEnding ? (
            <>
              <p>✅ Richtig!</p>

              <strong
                style={{
                  display: "block",
                  marginTop: "24px",
                  marginBottom: "36px",
                  fontSize: "48px",
                  color: "#22c55e",
                }}
              >
                {subject.label} {correctVerbForm}.
              </strong>

              <button
                onClick={() => setShowTranslation(!showTranslation)}
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
                  <div>🇬🇧 {verb.english}</div>
                  <div>🇪🇸 {verb.spanish}</div>
                </div>
              )}

              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={handleNext}
                  style={{
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
            </>
          ) : (
            <>
              <p>❌ Nicht richtig.</p>

              <div style={{ marginTop: "20px" }}>
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

/*
import { useState } from "react"
import endingsData from "../data/verbs/endings.json"
import type { Verb } from "../types/verbs"

type VerbGamePageProps = {
  onBack: () => void
}

type Subject = {
  label: string
  ending: "e" | "t" | "en"
  verbForm: "ich" | "thirdPerson" | "plural"
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

export function VerbGamePage({ onBack }: VerbGamePageProps) {
  const verbs = endingsData as Verb[]

  const [verbIndex, setVerbIndex] = useState(0)
  const [subjectIndex, setSubjectIndex] = useState(0)
  const [selectedEnding, setSelectedEnding] = useState<string | null>(null)

  const verb = verbs[verbIndex]
  const subject = subjects[subjectIndex]

  const correctEnding = subject.ending
  const correctVerbForm = verb[subject.verbForm]

  const [showTranslation, setShowTranslation] = useState(false)

  function handleAnswer(ending: string) {
    setSelectedEnding(ending)
  }

  function handleRetry() {
    setSelectedEnding(null)
    setShowTranslation(false)
  }

  function handleNext() {
    setSelectedEnding(null)

    setVerbIndex((currentIndex) =>
      (currentIndex + 1) % verbs.length
    )

    setSubjectIndex((currentIndex) =>
      (currentIndex + 1) % subjects.length
    )

    setShowTranslation(false)
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

      <p>Welche Endung fehlt?</p>

      <div
        style={{
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        {subject.label} {verb.stem}___
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        {["e", "t", "en"].map((ending) => (
          <button
            key={ending}
            onClick={() => handleAnswer(ending)}
            disabled={selectedEnding !== null}
            style={{
              fontSize: "28px",
              padding: "16px 24px",
              cursor: "pointer",
            }}
          >
            {ending}
          </button>
        ))}
      </div>

      {selectedEnding && (
        <div
          style={{
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          {selectedEnding === correctEnding ? (
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
                {subject.label} {correctVerbForm}.
                </strong>
            <button
                onClick={() => setShowTranslation(!showTranslation)}
                style={{
                    marginTop: "16px",
                    fontSize: "16px",
                    padding: "8px 14px",
                    cursor: "pointer",
                }}
                >
                🌍 {showTranslation ? "Bedeutung ausblenden" : "Bedeutung zeigen "}
                </button>

                {showTranslation && (
                <div
                    style={{
                    marginTop: "12px",
                    fontSize: "18px",
                    lineHeight: "1.6",
                    }}
                >
                    <div>🇬🇧 {verb.english}</div>
                    <div>🇪🇸 {verb.spanish}</div>
                </div>
              )}


              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={handleNext}
                  style={{
                    fontSize: "20px",
                    padding: "12px 20px",
                    cursor: "pointer",
                  }}
                >
                  Weiter
                </button>
              </div>
            </>
          ) : (
            <>
              <p>❌ Nicht richtig.</p>

              <div style={{ marginTop: "20px" }}>
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