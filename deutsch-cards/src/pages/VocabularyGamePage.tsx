import { useEffect, useState } from "react"
import type {
  VocabularyCategory,
  VocabularyItem,
} from "../data/vocabularyLoader"

import { GameHeader } from "../components/GameHeader"
import { GameHelp } from "../components/GameHelp"
import { gameHelp } from "../data/help/gameHelp"

type VocabularyGamePageProps = {
  category: VocabularyCategory["id"]
  vocabulary: VocabularyItem[]
  onBack: () => void
}

export function VocabularyGamePage({
  category,
  vocabulary,
  onBack,
}: VocabularyGamePageProps) {
  const [currentCard, setCurrentCard] =
    useState<VocabularyItem | null>(null)

  const [showAnswer, setShowAnswer] =
    useState(false)

  const [showHelp, setShowHelp] =
    useState(false)

  const [score, setScore] =
    useState(0)

  const [answeredCount, setAnsweredCount] =
    useState(0)

  const [usedIndexes, setUsedIndexes] =
    useState<number[]>([])

  const [isFinished, setIsFinished] =
    useState(false)

  function nextCard() {
    if (
      usedIndexes.length >=
      vocabulary.length
    ) {
      setIsFinished(true)
      return
    }

    let randomIndex =
      Math.floor(
        Math.random() *
          vocabulary.length
      )

    while (
      usedIndexes.includes(
        randomIndex
      )
    ) {
      randomIndex =
        Math.floor(
          Math.random() *
            vocabulary.length
        )
    }

    setUsedIndexes(
      (previousIndexes) => [
        ...previousIndexes,
        randomIndex,
      ]
    )

    setCurrentCard(
      vocabulary[randomIndex]
    )

    setShowAnswer(false)
  }

  function handleAnswer(
    points: number
  ) {
    setScore(
      (previousScore) =>
        previousScore + points
    )

    setAnsweredCount(
      (previousCount) =>
        previousCount + 1
    )

    if (
      answeredCount + 1 >=
      vocabulary.length
    ) {
      setIsFinished(true)
      return
    }

    nextCard()
  }

  function restartGame() {
    setScore(0)
    setAnsweredCount(0)
    setUsedIndexes([])
    setIsFinished(false)
    setShowAnswer(false)
    setCurrentCard(null)
  }

  function speakWord() {
    if (!currentCard) {
      return
    }

    const textToSpeak =
      currentCard.article
        ? `${currentCard.article} ${currentCard.word}`
        : currentCard.word

    const utterance =
      new SpeechSynthesisUtterance(
        textToSpeak
      )

    utterance.lang = "de-DE"
    utterance.rate = 0.8

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(
      utterance
    )
  }

  useEffect(() => {
    restartGame()
  }, [category])

  useEffect(() => {
    if (
      !currentCard &&
      !isFinished &&
      vocabulary.length > 0
    ) {
      nextCard()
    }
  }, [
    currentCard,
    isFinished,
    vocabulary.length,
  ])

  if (vocabulary.length === 0) {
    return (
      <>
        <GameHeader
          title={`Wortschatz · ${category}`}
          onBack={onBack}
          onHelp={() =>
            setShowHelp(true)
          }
        />

        {showHelp && (
          <GameHelp
            content={
              gameHelp.vocabulary
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
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <p>
            Keine Wörter in dieser
            Kategorie.
          </p>
        </main>
      </>
    )
  }

  if (isFinished) {
    const maxScore =
      vocabulary.length * 10

    return (
      <>
        <GameHeader
          title={`Wortschatz · ${category}`}
          onBack={onBack}
          onHelp={() =>
            setShowHelp(true)
          }
        />

        {showHelp && (
          <GameHelp
            content={
              gameHelp.vocabulary
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
            {score} / {maxScore}
          </strong>

          <p>
            {vocabulary.length} Wörter
            geübt.
          </p>

          <button
            onClick={restartGame}
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

  if (!currentCard) {
    return <p>Laden...</p>
  }

  return (
    <>
      <GameHeader
        title={`Wortschatz · ${category}`}
        onBack={onBack}
        onHelp={() =>
          setShowHelp(true)
        }
      />

      {showHelp && (
        <GameHelp
          content={
            gameHelp.vocabulary
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
        {/* Progress */}
        <div
          style={{
            width:
              "min(720px, 92vw)",

            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",

            marginBottom: "28px",

            fontSize: "18px",
          }}
        >
          <span>
            Wort{" "}
            {answeredCount + 1} /{" "}
            {vocabulary.length}
          </span>

          <strong>
            Punkte: {score}
          </strong>
        </div>

        {/* Vocabulary card */}
        <section
          style={{
            width:
              "min(620px, 92vw)",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            gap: "20px",

            padding: "26px 22px",

            border:
              "1px solid rgba(255, 255, 255, 0.12)",

            borderRadius: "18px",

            backgroundColor:
              "rgba(255, 255, 255, 0.025)",
          }}
        >
          {/* Image */}
          <img
            src={`/images/${currentCard.image}`}
            alt={currentCard.word}
            style={{
              width: "320px",
              maxWidth: "90%",
              maxHeight: "340px",
              objectFit: "contain",

              borderRadius: "16px",
            }}
          />

          {/* Answer */}
          {!showAnswer ? (
            <button
              onClick={() =>
                setShowAnswer(true)
              }
              style={{
                fontSize: "18px",
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              👁️ Antwort zeigen
            </button>
          ) : (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  margin:
                    "4px 0 6px",
                  fontSize: "32px",
                }}
              >
                {currentCard.article}{" "}
                {currentCard.word}
              </h2>

              <p
                style={{
                  margin: 0,
                  opacity: 0.7,
                }}
              >
                {currentCard.type}
              </p>
            </div>
          )}

          {/* Audio */}
          <button
            onClick={speakWord}
            style={{
              fontSize: "17px",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            🔊 Wort anhören
          </button>
        </section>

        {/* Evaluation */}
        <section
          style={{
            width:
              "min(720px, 92vw)",

            marginTop: "28px",

            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() =>
              handleAnswer(10)
            }
            style={{
              minWidth: "150px",
              fontSize: "17px",
              padding: "12px 16px",
              cursor: "pointer",
            }}
          >
            <div>✅ Richtig</div>

            <small
              style={{
                opacity: 0.65,
              }}
            >
              +10
            </small>
          </button>

          <button
            onClick={() =>
              handleAnswer(5)
            }
            style={{
              minWidth: "150px",
              fontSize: "17px",
              padding: "12px 16px",
              cursor: "pointer",
            }}
          >
            <div>
              🟡 Artikel falsch
            </div>

            <small
              style={{
                opacity: 0.65,
              }}
            >
              +5
            </small>
          </button>

          <button
            onClick={() =>
              handleAnswer(0)
            }
            style={{
              minWidth: "150px",
              fontSize: "17px",
              padding: "12px 16px",
              cursor: "pointer",
            }}
          >
            <div>❌ Falsch</div>

            <small
              style={{
                opacity: 0.65,
              }}
            >
              0
            </small>
          </button>
        </section>
      </main>
    </>
  )
}

/*
import { useEffect, useState } from "react"
import type {
  VocabularyCategory,
  VocabularyItem,
} from "../data/vocabularyLoader"

type VocabularyGamePageProps = {
  category: VocabularyCategory["id"]
  vocabulary: VocabularyItem[]
  onBack: () => void
}

export function VocabularyGamePage({
    category,
    vocabulary,
    onBack,
  }: VocabularyGamePageProps) {
  const [currentCard, setCurrentCard] = useState<VocabularyItem | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [usedIndexes, setUsedIndexes] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false)

  function nextCard() {
    if (usedIndexes.length >= vocabulary.length) {
      setIsFinished(true)
      return
    }

    let randomIndex = Math.floor(Math.random() * vocabulary.length)

    while (usedIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * vocabulary.length)
    }

    setUsedIndexes((previousIndexes) => [...previousIndexes, randomIndex])
    setCurrentCard(vocabulary[randomIndex])
    setShowAnswer(false)
  }

  function handleAnswer(points: number) {
    setScore((previousScore) => previousScore + points)
    setAnsweredCount((previousCount) => previousCount + 1)

    if (answeredCount + 1 >= vocabulary.length) {
      setIsFinished(true)
      return
    }

    nextCard()
  }

  function restartGame() {
    setScore(0)
    setAnsweredCount(0)
    setUsedIndexes([])
    setIsFinished(false)
    setShowAnswer(false)
    setCurrentCard(null)
  }

  function speakWord() {
    if (!currentCard) {
      return
    }

    const textToSpeak = currentCard.article
      ? `${currentCard.article} ${currentCard.word}`
      : currentCard.word

    const utterance = new SpeechSynthesisUtterance(textToSpeak)

    utterance.lang = "de-DE"
    utterance.rate = 0.8

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    restartGame()
  }, [category])

  useEffect(() => {
    if (!currentCard && !isFinished && vocabulary.length > 0) {
      nextCard()
    }
  }, [currentCard, isFinished, vocabulary.length])

  if (vocabulary.length === 0) {
    return (
      <main>
        <p>No hay palabras para esta categoría.</p>
        <button onClick={onBack}>Volver</button>
      </main>
    )
  }

  if (isFinished) {
    const maxScore = vocabulary.length * 10

    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h1>Resultado final</h1>

        <h2>
          {score} / {maxScore} puntos
        </h2>

        <p>
          Practicaste {vocabulary.length} palabras de la categoría {category}.
        </p>

        <button onClick={restartGame}>Jugar otra vez</button>

        <button onClick={onBack}>Volver al inicio</button>
      </main>
    )
  }

  if (!currentCard) {
    return <p>Cargando...</p>
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "24px",
      }}
    >
      <button onClick={onBack}>← Volver</button>

      <h1>Categoría {category}</h1>

      <p>
        Palabra {answeredCount + 1} de {vocabulary.length}
      </p>

      <p>Puntos: {score}</p>

      <img
        src={`/images/${currentCard.image}`}
        alt={currentCard.word}
        style={{
          width: "320px",
          maxWidth: "90vw",
          borderRadius: "16px",
        }}
      />

      {!showAnswer ? (
        <button onClick={() => setShowAnswer(true)}>Ver respuesta</button>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>
            {currentCard.article} {currentCard.word}
          </h2>
          <p>{currentCard.type}</p>
        </div>
      )}

      <button onClick={speakWord}>🔊 Escuchar palabra</button>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button onClick={() => handleAnswer(10)}>
          Respuesta correcta
        </button>

        <button onClick={() => handleAnswer(5)}>
          Artículo erróneo
        </button>

        <button onClick={() => handleAnswer(0)}>
          Respuesta errónea
        </button>
      </div>
    </main>
  )
}
*/