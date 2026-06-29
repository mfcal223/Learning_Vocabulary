import { useEffect, useState } from "react"
import type {
  VocabularyCategory,
  VocabularyItem,
} from "../data/vocabularyLoader"

type GamePageProps = {
  category: VocabularyCategory["id"]
  vocabulary: VocabularyItem[]
  onBack: () => void
}

export function GamePage({ category, vocabulary, onBack }: GamePageProps) {
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