# Guía para ampliar Learning_german / deutsch-cards — versión 2 (revisión técnica)


> **Estado de verificación (24/10/2026).** Esta versión corrige la guía original comparándola con los archivos recibidos: `App(1).tsx`, `HomePage(3).tsx`, `VocabularyGamePage(3).tsx`, `vocabularyLoader(1).ts` y `vocabulary.ts`, además de `tree.md` de Sources. Los nombres con `(1)` o `(3)` son nombres de los archivos adjuntos; sus nombres en el repositorio son `App.tsx`, `HomePage.tsx`, etc.
>
> **Confirmado:** navegación por `selectedActivity`, categorías cargadas desde el loader, generación automática de botones en `HomePage`, imágenes, pronunciación y puntuación del Vocabulary Game.
>
> **Pendiente de verificar con código:** las páginas de verbos y revisión, archivos JSON efectivos (incluido `vocabulary.json`), `gameHelp.ts`, `types/help.ts`, `GameHeader.tsx`, `GameHelp.tsx` y `package.json`. Los ejemplos de esas partes reflejan la guía anterior, **no una auditoría de implementación**.
>
> **Objetivo:** documentar cómo ampliar la aplicación. Este archivo **no modifica el código**; el juego `ArticleGame` de la sección 8 es una **propuesta de implementación** que necesita integrarse, compilarse y probarse.

Este documento explica cómo extender la aplicación `deutsch-cards` para:

1. incorporar una nueva sección al `Vocabulary Game`;
2. agregar nuevos ejemplos a:
   - `CapitalizationGame`;
   - `CorrectWritingGame`;
   - `VerbGame`;
   - `ScrambledSentenceGame`;
3. agregar un juego completamente nuevo.

> Nota: el nombre correcto del juego es `CorrectWritingGame`, aunque a veces se escriba `CorrectWrittingGame`.

---

## 1. Estructura principal del proyecto

La aplicación se encuentra dentro de la carpeta `deutsch-cards/`.

```text
deutsch-cards/
├── public/
│   └── images/
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── GameHeader.tsx
│   │   └── GameHelp.tsx
│   ├── data/
│   │   ├── help/
│   │   │   └── gameHelp.ts
│   │   ├── revision/
│   │   │   ├── capitalization.json
│   │   │   ├── correctWriting.json
│   │   │   └── scrambledSentences.json
│   │   ├── verbs/
│   │   │   └── endings.json
│   │   ├── vocabularyLoader.ts
│   │   └── vocabulary/
│   │       ├── vocabulary.json
│   │       ├── H.json
│   │       ├── D.json
│   │       ├── SCH.json
│   │       ├── K.json
│   │       └── Z.json
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── VocabularyGamePage.tsx
│   │   ├── VerbGamePage.tsx
│   │   ├── CapitalizationGamePage.tsx
│   │   ├── CorrectWritingGamePage.tsx
│   │   └── ScrambledSentenceGamePage.tsx
│   └── types/
│       ├── help.ts
│       ├── revision.ts
│       ├── verbs.ts
│       └── vocabulary.ts
└── package.json
```

El archivo entregado `App.tsx` no usa React Router: navega con `selectedActivity` y, para vocabulario, `selectedCategory`. Las actividades registradas son `vocabulary`, `verbs`, `scrambledSentences`, `correctWriting` y `capitalization`.

**Importante:** el siguiente flujo es orientativo para construir juegos; no todos los juegos tienen que implementarlo idénticamente. El Vocabulary Game **no corrige una respuesta escrita automáticamente**: muestra una tarjeta y permite al usuario **autoevaluarse** con uno de tres botones (10, 5 o 0 puntos). Los comportamientos concretos de los otros cuatro juegos no pueden certificarse sin sus páginas `.tsx`.

1. cargar ejercicios o tarjetas;
2. presentarlos (aleatoriamente cuando corresponda);
3. obtener respuesta o autoevaluación;
4. actualizar progreso y puntaje;
5. avanzar al siguiente ejercicio;
6. mostrar un resultado final;
7. permitir volver a empezar.

**Nota de inventario:** `tree.md` (24/10/2026) mostraba `H`, `D`, `SCH`, `K`, `Z`. El `vocabularyLoader.ts` entregado ahora **también importa y registra `P`**, pero no se incluyeron `P.json` ni `vocabulary.json` para comprobar sus contenidos o su presencia real en el disco.

---

# 2. Incorporar una nueva sección al Vocabulary Game

En la implementación actual, una sección del `Vocabulary Game` corresponde a una categoría de vocabulario como `H`, `D`, `SCH`, `K`, `Z` o `P` (registrada en el loader actual).

Como ejemplo, se agregará una nueva categoría llamada `A`.

---

## Paso 1: crear el archivo JSON de la nueva categoría

Crear el archivo:

```text
deutsch-cards/src/data/vocabulary/A.json
```

Agregar objetos con la estructura utilizada por el juego:

```json
[
  {
    "word": "Apfel",
    "article": "der",
    "type": "noun",
    "image": "A/der_Apfel.jpg"
  },
  {
    "word": "arbeiten",
    "article": "",
    "type": "verb",
    "image": "A/arbeiten.jpg"
  }
]
```

Según el **tipo `VocabularyItem` que usa realmente el juego (el declarado en `src/data/vocabularyLoader.ts`)**, cada palabra debe incluir:

- `word`: palabra en alemán;
- `article`: artículo del sustantivo; cadena vacía `""` para otros tipos;
- `type`: tipo de palabra;
- `image`: **ruta relativa dentro de `public/images/`**, sin prefijo `/images/`.

El JSX confirma que la imagen se carga usando `src={`/images/${currentCard.image}`}`. El archivo `src/types/vocabulary.ts` **define otro `VocabularyItem` diferente** (artículo opcional, solo tres tipos y campo `category`), pero **no es el tipo importado por `VocabularyGamePage.tsx`**. No cambies solo ese archivo esperando que afecte al juego; conviene unificar los tipos en una futura refactorización, pero no es un requisito para agregar una categoría.

Los tipos utilizados actualmente son:

```text
noun
verb
adjective
preposition
number
```

Para palabras que no son sustantivos, se utiliza un artículo vacío:

```json
"article": ""
```

---

## Paso 2: agregar las imágenes

Si el JSON contiene:

```json
"image": "A/der_Apfel.jpg"
```

la imagen debe estar ubicada en:

```text
deutsch-cards/public/images/A/der_Apfel.jpg
```

La ruta debe coincidir exactamente con:

- mayúsculas;
- minúsculas;
- extensión;
- caracteres especiales.

Por ejemplo, estas rutas no son necesariamente equivalentes:

```text
A/der_Apfel.jpg
A/der_apfel.jpg
a/der_Apfel.jpg
```

---

## Paso 3: registrar la categoría en `vocabulary.json`

Editar:

```text
deutsch-cards/src/data/vocabulary/vocabulary.json
```

Agregar la nueva categoría:

```json
[
  {
    "id": "H",
    "label": "H"
  },
  {
    "id": "D",
    "label": "D"
  },
  {
    "id": "SCH",
    "label": "SCH"
  },
  {
    "id": "K",
    "label": "K"
  },
  {
    "id": "Z",
    "label": "Z"
  },
  {
    "id": "P",
    "label": "P"
  },
  {
    "id": "A",
    "label": "A"
  }
]
```

El valor de `id` debe coincidir con el identificador utilizado en el loader. **No reemplaces el JSON real copiando esta lista de ejemplo:** conserva las categorías, orden y etiquetas que ya existan, y añade solo la nueva entrada. El archivo `vocabulary.json` actual no fue entregado; `P` está confirmada únicamente en el loader.

---

## Paso 4: importar los datos en `vocabularyLoader.ts`

Editar:

```text
deutsch-cards/src/data/vocabularyLoader.ts
```

Agregar el import:

```ts
import aWords from "./vocabulary/A.json"
```

El comienzo del archivo quedaría similar a:

```ts
import categories from "./vocabulary/vocabulary.json"
import hWords from "./vocabulary/H.json"
import dWords from "./vocabulary/D.json"
import schWords from "./vocabulary/SCH.json"
import KData from "./vocabulary/K.json"
import ZWords from "./vocabulary/Z.json"
import PWords from "./vocabulary/P.json"
import aWords from "./vocabulary/A.json"
```

---

## Paso 5: actualizar el tipo `VocabularyCategory`

En el mismo archivo, agregar `A` a la unión de identificadores:

```ts
export type VocabularyCategory = {
  id: "H" | "D" | "SCH" | "K" | "Z" | "P" | "A"
  label: string
}
```

Este cambio es importante porque la unión de TypeScript enumera los identificadores válidos. **La aserción** `categories as VocabularyCategory[]` del loader **no valida por sí sola** el contenido de `vocabulary.json`; cualquier discrepancia entre esa lista y `vocabularyByCategory` puede fallar en ejecución.

---

## Paso 6: agregar la categoría a `vocabularyByCategory`

Agregar la propiedad `A`:

```ts
export const vocabularyByCategory: Record<
  VocabularyCategory["id"],
  VocabularyItem[]
> = {
  H: hWords as VocabularyItem[],
  D: dWords as VocabularyItem[],
  SCH: schWords as VocabularyItem[],
  K: KData as VocabularyItem[],
  Z: ZWords as VocabularyItem[],
  P: PWords as VocabularyItem[],
  A: aWords as VocabularyItem[],
}
```

Si se agrega `A` al tipo, pero no se agrega aquí, aparecerá un error de TypeScript.

---

## Paso 7: comprobar la página inicial

`HomePage.tsx` recibe todas las categorías mediante esta propiedad:

```tsx
<HomePage
  categories={vocabularyCategories}
  ...
/>
```

Luego las muestra usando:

```tsx
{categories.map((category) => (
  <button
    key={category.id}
    onClick={() => onSelectCategory(category.id)}
  >
    {category.label}
  </button>
))}
```

Por lo tanto, normalmente no es necesario modificar `HomePage.tsx` para agregar una categoría de vocabulario. Al agregar la categoría a `vocabulary.json`, el botón se genera automáticamente.

---

## Paso 8: comprobar `App.tsx`

Cuando el usuario selecciona una categoría, `App.tsx` busca sus palabras:

```tsx
const selectedVocabulary =
  vocabularyByCategory[selectedCategory]
```

Después muestra:

```tsx
<VocabularyGamePage
  category={selectedCategory}
  vocabulary={selectedVocabulary}
  onBack={() => {
    setSelectedCategory(null)
    setSelectedActivity(null)
  }}
/>
```

No hace falta agregar una condición individual para cada categoría.

---

### Comportamiento confirmado de `VocabularyGamePage.tsx`

- Escoge aleatoriamente un índice no utilizado hasta agotar todas las tarjetas de la categoría.
- Muestra la imagen a partir de `/images/` y el campo `image` del JSON.
- Permite mostrar la respuesta (`article`, `word` y `type`).
- Reproduce el texto con `SpeechSynthesisUtterance`, `lang = "de-DE"` y `rate = 0.8`.
- **Autoevaluación:** `Richtig` = +10, `Artikel falsch` = +5, `Falsch` = 0; no valida automáticamente la respuesta del niño.
- Tras evaluar, avanza automáticamente; el final muestra `score / (vocabulary.length * 10)`.
- `restartGame()` reinicia puntaje, progreso y tarjetas usadas.
- Incluso para verbos, adjetivos, preposiciones y números se muestra el botón «Artikel falsch»; decidir si se mantiene es una **cuestión pedagógica**, no un paso necesario para registrar palabras.

## Paso 9: probar la nueva sección

Comprobar lo siguiente:

1. la nueva categoría aparece en la pantalla inicial;
2. el botón abre el `Vocabulary Game`;
3. aparecen las palabras de `A.json`;
4. las imágenes se cargan correctamente;
5. los artículos aparecen correctamente;
6. se puede escuchar la palabra;
7. el puntaje se actualiza;
8. el juego termina al completar todas las palabras;
9. el botón de reinicio funciona;
10. el botón de volver regresa a la pantalla principal.

---

# 3. Agregar ejemplos a los juegos existentes

La guía anterior indica que los juegos de revisión y verbos usan archivos JSON. Sus **rutas aparecen en `tree.md`**, pero no se adjuntaron los JSON ni las páginas React correspondientes para comprobar esquemas, criterios de validación, puntajes o límite de preguntas. Por eso las secciones 4–7 son instrucciones **provisionales basadas en la versión 1**, no confirmaciones técnicas.

Es importante:

- utilizar un `id` único **cuando el esquema de ese juego lo define** (los objetos de verbos mostrados aquí no incluyen `id`);
- mantener la estructura esperada;
- verificar la ortografía alemana;
- mantener un JSON válido;
- no eliminar accidentalmente las comas entre objetos.

---

# 4. Agregar ejemplos a `CapitalizationGame`

El archivo de datos es:

```text
deutsch-cards/src/data/revision/capitalization.json
```

Cada ejercicio utiliza:

```json
{
  "id": "capital-011",
  "prompt": "der hund liegt im garten.",
  "answer": "Der Hund liegt im Garten."
}
```

## Significado de cada propiedad

- `id`: identificador único;
- `prompt`: oración con mayúsculas incorrectas;
- `answer`: oración corregida.

## Ejemplo

```json
[
  {
    "id": "capital-010",
    "prompt": "die limonade ist gelb.",
    "answer": "Die Limonade ist gelb."
  },
  {
    "id": "capital-011",
    "prompt": "der hund liegt im garten.",
    "answer": "Der Hund liegt im Garten."
  },
  {
    "id": "capital-012",
    "prompt": "meine schwester liest ein buch.",
    "answer": "Meine Schwester liest ein Buch."
  }
]
```

## Reglas importantes

`prompt` y `answer` deben tener:

- la misma cantidad de caracteres;
- los mismos espacios;
- las mismas palabras;
- la misma puntuación.

Solo deberían cambiar las mayúsculas y minúsculas.

Por ejemplo, este ejercicio es correcto:

```json
{
  "id": "capital-013",
  "prompt": "das kind spielt im park.",
  "answer": "Das Kind spielt im Park."
}
```

Este ejercicio puede causar problemas porque cambia la cantidad de palabras:

```json
{
  "id": "capital-014",
  "prompt": "das kind spielt.",
  "answer": "Das Kind spielt im Park."
}
```

**Pendiente de verificación:** la versión 1 afirma que el juego compara caracteres posición por posición, pero no se entregó `CapitalizationGamePage.tsx`. Mantener las mismas palabras, espacios y signos, modificando **solo la capitalización**, es una recomendación segura para elaborar estos ejercicios, con independencia de la implementación.

---

# 5. Agregar ejemplos a `CorrectWritingGame`

El archivo de datos es:

```text
deutsch-cards/src/data/revision/correctWriting.json
```

Cada ejercicio tiene esta estructura:

```json
{
  "id": "write-002",
  "prompt": "DuhastdasBuch.",
  "answer": "Du hast das Buch."
}
```

## Ejemplo completo

```json
[
  {
    "id": "write-001",
    "prompt": "IchessedieSchokoladeimHaus.",
    "answer": "Ich esse die Schokolade im Haus."
  },
  {
    "id": "write-002",
    "prompt": "DuhastdasBuch.",
    "answer": "Du hast das Buch."
  },
  {
    "id": "write-003",
    "prompt": "DerHundschläftimGarten.",
    "answer": "Der Hund schläft im Garten."
  }
]
```

## Reglas importantes

- `prompt` es la oración que el usuario debe corregir;
- `answer` es la respuesta exacta esperada;
- los espacios internos son importantes;
- la puntuación es importante;
- las mayúsculas son importantes;
- cada `id` debe ser único.

**Según la guía V1; pendiente de verificar en `CorrectWritingGamePage.tsx`**, la comparación utiliza:

```ts
const answer = userAnswer.trim()
```

Esto elimina espacios al inicio y al final, pero no corrige automáticamente espacios internos.

Por ejemplo, estas respuestas no son necesariamente iguales:

```text
Ich esse die Schokolade im Haus.
Ich esse die  Schokolade im Haus.
```

La **guía V1 atribuye** al juego estas puntuaciones (aún no verificadas en código):

```text
Respuesta correcta: +10 puntos
Respuesta incorrecta: -3 puntos
```

No confundir con el **Vocabulary Game**, cuyo sistema de +10 / +5 / 0 sí se ha confirmado.

---

# 6. Agregar ejemplos a `VerbGame`

El archivo de datos es:

```text
deutsch-cards/src/data/verbs/endings.json
```

Los verbos pueden utilizar dos modalidades:

- `ending`;
- `fullForm`.

---

## 6.1 Verbos de tipo `ending`

Este tipo se utiliza para practicar terminaciones regulares.

```json
{
  "infinitive": "lernen",
  "exerciseType": "ending",
  "stem": "lern",
  "ich": "lerne",
  "thirdPerson": "lernt",
  "plural": "lernen",
  "english": "to learn",
  "spanish": "aprender"
}
```

En este caso:

- `stem` contiene la raíz;
- `ich` contiene la forma para `Ich`;
- `thirdPerson` contiene la forma para una tercera persona;
- `plural` contiene la forma plural;
- `exerciseType` es `ending`.

El juego muestra la raíz con un espacio vacío y ofrece las terminaciones:

```text
-e
-t
-en
```

---

## 6.2 Verbos de tipo `fullForm`

Este tipo se utiliza cuando el verbo tiene cambios especiales.

```json
{
  "infinitive": "tragen",
  "exerciseType": "fullForm",
  "ich": "trage",
  "thirdPerson": "trägt",
  "plural": "tragen",
  "english": "to carry",
  "spanish": "llevar"
}
```

En esta modalidad, el juego crea opciones con las formas completas:

```text
trage
trägt
tragen
```

Esta opción es útil para verbos como:

```text
schlafen → schläft
lesen → liest
essen → isst
sein → ist
haben → hat
```

---

## 6.3 Ejemplo agregando nuevos verbos

```json
[
  {
    "infinitive": "lernen",
    "exerciseType": "ending",
    "stem": "lern",
    "ich": "lerne",
    "thirdPerson": "lernt",
    "plural": "lernen",
    "english": "to learn",
    "spanish": "aprender"
  },
  {
    "infinitive": "tragen",
    "exerciseType": "fullForm",
    "ich": "trage",
    "thirdPerson": "trägt",
    "plural": "tragen",
    "english": "to carry",
    "spanish": "llevar"
  }
]
```

## Campos obligatorios

Todos los verbos deben tener:

```text
infinitive
exerciseType
ich
thirdPerson
plural
english
spanish
```

Los verbos de tipo `ending` también necesitan:

```text
stem
```

Los verbos de tipo `fullForm` pueden tener `stem`, pero no es necesario.

## Reglas importantes

- `exerciseType` debe ser exactamente `ending` o `fullForm`;
- revisar los caracteres `ä`, `ö`, `ü` y `ß`;
- verificar que cada forma corresponda al sujeto correcto;
- comprobar las traducciones;
- no duplicar verbos accidentalmente.

**Según la guía V1**, el juego combina verbos y sujetos de `VerbGamePage.tsx`; esta afirmación sigue pendiente de verificar con esa página.

La guía V1 indica el límite siguiente, **no confirmado todavía**:

```ts
const GAME_LENGTH = 15
```

**Si** el código sigue usando esa constante y la respeta al construir la partida, el límite sería de 15 ejercicios. Debe confirmarse con `VerbGamePage.tsx`.

---

# 7. Agregar ejemplos a `ScrambledSentenceGame`

El archivo de datos es:

```text
deutsch-cards/src/data/revision/scrambledSentences.json
```

Cada ejercicio utiliza:

```json
{
  "id": "schuettel-004",
  "answer": [
    "Die",
    "Katze",
    "schläft",
    "auf",
    "dem",
    "Sofa",
    "."
  ]
}
```

## Ejemplo completo

```json
[
  {
    "id": "schuettel-003",
    "answer": [
      "Der",
      "Schwan",
      "schwimmt",
      "auf",
      "dem",
      "See",
      "."
    ]
  },
  {
    "id": "schuettel-004",
    "answer": [
      "Die",
      "Katze",
      "schläft",
      "auf",
      "dem",
      "Sofa",
      "."
    ]
  }
]
```

## Reglas importantes

Cada palabra debe ser un elemento separado:

```json
[
  "Das",
  "Kind",
  "spielt",
  "im",
  "Garten",
  "."
]
```

No se debe guardar toda la oración como un solo elemento:

```json
[
  "Das Kind spielt im Garten."
]
```

El signo de puntuación debe ser un token separado:

```json
"."
```

La secuencia del arreglo representa el orden correcto de la oración. **Según la guía V1**, el juego mezcla los tokens al presentarlos; este comportamiento no está verificado todavía con el archivo React.

También es necesario que cada ejercicio tenga un `id` único:

```text
schuettel-001
schuettel-002
schuettel-003
```

La guía V1 menciona una función `formatSentence` para quitar espacios visuales antes de `.`, `!` y `?`, **pendiente de comprobar en `ScrambledSentenceGamePage.tsx`**.

**Advertencia pedagógica:** algunas oraciones alemanas tienen más de un orden correcto. Hasta comprobar cómo valida el juego, utiliza oraciones con una solución inequívoca con los tokens dados; de lo contrario, una alternativa gramaticalmente válida podría ser calificada como incorrecta.

---

# 8. Crear un juego completamente nuevo (ejemplo propuesto: `ArticleGame`)

> **Propuesta, no código existente.** Los archivos `ArticleGamePage.tsx`, `articleGame.json` y `types/articleGame.ts` no aparecen en el árbol de Sources ni entre los archivos adjuntos. Esta sección muestra **cómo crearlos** siguiendo la navegación confirmada. Los componentes de ayuda deben contrastarse con sus fuentes originales antes de considerar el nuevo juego listo.

La actividad de ejemplo ayuda a practicar `der`, `die` y `das`. Antes de desarrollar un juego, definir datos, respuesta esperada, reglas de puntaje, reintentos, avance, finalización y reinicio.

En este ejemplo la **regla de puntaje propuesta** es explícita: primera respuesta correcta, +10; primera respuesta incorrecta, −3; puede intentar de nuevo sin puntos ni penalizaciones adicionales y solo avanza después de acertar. Esta política evita ganar puntos infinitos por pulsaciones repetidas, pero **no es una regla global de la aplicación**.

## Paso 1: definir el tipo de ejercicio

Crear `deutsch-cards/src/types/articleGame.ts`:

```ts
export type ArticleExercise = {
  id: string
  word: string
  answer: "der" | "die" | "das"
}
```

## Paso 2: crear el archivo de datos

Crear `deutsch-cards/src/data/articleGame.json`:

```json
[
  { "id": "article-001", "word": "Haus", "answer": "das" },
  { "id": "article-002", "word": "Hund", "answer": "der" },
  { "id": "article-003", "word": "Schule", "answer": "die" }
]
```

Cada `id` debe ser único. El JSON se importa como módulo de Vite, al igual que los datos de vocabulario; los contenidos concretos se deben revisar lingüísticamente.

## Paso 3: crear la página funcional

Crear `deutsch-cards/src/pages/ArticleGamePage.tsx`. A diferencia del ejemplo incompleto de V1, el siguiente patrón incluye selección, bloqueo tras acertar, reintentos, puntaje, avance, final y reinicio. Utiliza la interfaz `GameHeader` / `GameHelp` **inferida por su uso real en `VocabularyGamePage.tsx`**; los archivos de estos componentes no fueron adjuntados.

```tsx
import { useState } from "react"
import articleData from "../data/articleGame.json"
import type { ArticleExercise } from "../types/articleGame"
import { GameHeader } from "../components/GameHeader"
import { GameHelp } from "../components/GameHelp"
import { gameHelp } from "../data/help/gameHelp"

type Props = { onBack: () => void }
type Article = ArticleExercise["answer"]
type Feedback = "correct" | "incorrect" | null

const sourceExercises = articleData as ArticleExercise[]

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const valueAtI = copy[i]!
    copy[i] = copy[j]!
    copy[j] = valueAtI
  }
  return copy
}

export function ArticleGamePage({ onBack }: Props) {
  const [exercises, setExercises] = useState<ArticleExercise[]>(
    () => shuffle(sourceExercises)
  )
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<Article | null>(null)
  const [firstAttemptUsed, setFirstAttemptUsed] = useState(false)
  const [finished, setFinished] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const exercise = exercises[index]

  function handleAnswer(answer: Article) {
    if (!exercise || finished || feedback === "correct") return
    const isCorrect = answer === exercise.answer
    setSelectedAnswer(answer)
    setFeedback(isCorrect ? "correct" : "incorrect")
    if (!firstAttemptUsed) {
      setScore((previous) => previous + (isCorrect ? 10 : -3))
      setFirstAttemptUsed(true)
    }
  }

  function handleNext() {
    if (feedback !== "correct") return
    if (index + 1 >= exercises.length) {
      setFinished(true)
      return
    }
    setIndex((previous) => previous + 1)
    setFeedback(null)
    setSelectedAnswer(null)
    setFirstAttemptUsed(false)
  }

  function handleRestart() {
    setExercises(shuffle(sourceExercises))
    setIndex(0)
    setScore(0)
    setFeedback(null)
    setSelectedAnswer(null)
    setFirstAttemptUsed(false)
    setFinished(false)
  }

  return (
    <>
      <GameHeader
        title="Artikel-Spiel · Articles"
        onBack={onBack}
        onHelp={() => setShowHelp(true)}
      />
      {showHelp && (
        <GameHelp
          content={gameHelp.articleGame}
          onClose={() => setShowHelp(false)}
        />
      )}

      {exercises.length === 0 ? (
        <main><p>Keine Übungen · No exercises available.</p></main>
      ) : finished ? (
        <main>
          <h2>Fertig! · Finished!</h2>
          <p>Punkte / Score: {score}</p>
          <button onClick={handleRestart}>Noch einmal · Play again</button>
        </main>
      ) : exercise ? (
        <main>
          <p>Wort / Word {index + 1} / {exercises.length}</p>
          <p>Punkte / Score: {score}</p>
          <h2>{exercise.word}</h2>
          {(["der", "die", "das"] as Article[]).map((article) => (
            <button
              key={article}
              onClick={() => handleAnswer(article)}
              disabled={feedback === "correct"}
              aria-pressed={selectedAnswer === article}
            >
              {article}
            </button>
          ))}
          {feedback === "correct" && (
            <p>Richtig! · Correct!</p>
          )}
          {feedback === "incorrect" && (
            <p>Noch einmal versuchen · Try again</p>
          )}
          {feedback === "correct" && (
            <button onClick={handleNext}>
              Weiter · {index + 1 === exercises.length ? "Finish" : "Next"}
            </button>
          )}
        </main>
      ) : null}
    </>
  )
}
```

**Notas de diseño:**

- La comparación de artículos es exacta porque el usuario elige un valor entre tres opciones.
- Los botones permanecen activos después de un error, pero el **puntaje solo cambia en el primer intento** de cada palabra.
- Al acertar, las opciones se deshabilitan y aparece «Weiter».
- El juego incluye mezcla de ejercicios y conserva la ayuda incluso si el JSON está vacío.
- Los estilos y mensajes finales son deliberadamente básicos: conviene adaptar la apariencia al resto del proyecto y probar accesibilidad, visualización móvil y casos límite.

## Paso 4: registrar el contenido de ayuda

Editar `deutsch-cards/src/data/help/gameHelp.ts` para agregar la entrada `articleGame`. La guía V1 afirma que `GameHelpCollection` se declara allí; **no se entregó el archivo para verificar el nombre o la ubicación exactos del tipo**. Si es una colección explícita, agregar la propiedad al tipo y al objeto; si el esquema es distinto, adaptar la entrada a esa implementación.

Ejemplo **basado en V1 y pendiente de cotejo**:

```ts
articleGame: {
  title: "Artikel-Spiel",
  subtitle: "Artículos · Articles",
  sections: [
    {
      heading: "Cómo jugar",
      lines: [
        "Elige der, die o das.",
        "Primera respuesta correcta: +10 puntos.",
        "Primera respuesta incorrecta: -3 puntos; puedes reintentar."
      ]
    },
    {
      heading: "Ejemplos",
      lines: ["der Hund", "die Schule", "das Haus"]
    }
  ]
},
```

Consultar `src/types/help.ts` si allí se define la forma de `GameHelpContent`.

## Paso 5: conectar el juego en `App.tsx`

`App.tsx` **sí está verificado**: importa individualmente las páginas, define el tipo `Activity`, renderiza cada juego según `selectedActivity` y al final muestra `HomePage`.

1. Importar `ArticleGamePage`:

   ```tsx
   import { ArticleGamePage } from "./pages/ArticleGamePage"
   ```

2. Agregar `"articleGame"` a la unión `Activity` sin quitar las cinco actividades existentes.

3. Añadir la condición de renderizado **antes** del `return` final de `HomePage`:

   ```tsx
   if (selectedActivity === "articleGame") {
     return (
       <ArticleGamePage onBack={() => setSelectedActivity(null)} />
     )
   }
   ```

4. Al invocar `<HomePage>`, añadir:

   ```tsx
   onSelectArticleGame={() => setSelectedActivity("articleGame")}
   ```

No es necesario instalar React Router para este patrón.

## Paso 6: conectar el botón en `HomePage.tsx`

Este archivo también está **verificado**. En `HomePageProps` añadir `onSelectArticleGame: () => void`, y luego incluir la propiedad en la desestructuración de `HomePage`. Finalmente, insertar un botón —por ejemplo, en la sección de repaso—:

```tsx
<button onClick={onSelectArticleGame} style={buttonStyle}>
  Artikel-Spiel
  <span style={englishLabelStyle}>Articles game</span>
</button>
```

Las constantes de estilo `buttonStyle` y `englishLabelStyle` **sí existen** en el `HomePage.tsx` adjunto.

## Paso 7: verificar el nuevo juego

- `npm run build` y `npm run lint`, **si existen esos scripts** en `package.json`.
- Página accesible desde el Home y retorno al Home.
- JSON vacío, un ejercicio y varios ejercicios.
- Respuesta incorrecta, reintento, correcta y clics repetidos.
- Puntuación de primer intento y reinicio a cero.
- Fin de partida y nuevo orden al reiniciar.
- Botón de ayuda, cierre y comportamiento con teclado; verificar `Escape` en el componente real.
- Revisión pedagógica de palabras, artículos y posibles ambigüedades.

---

# 9. Checklist para un juego nuevo

Antes de considerar terminado el juego, comprobar:

- [ ] existe un tipo TypeScript;
- [ ] existe el archivo JSON;
- [ ] cada ejercicio tiene un `id` único;
- [ ] la página React está creada;
- [ ] la página maneja una lista vacía;
- [ ] el juego aparece en `Activity`;
- [ ] la página está importada en `App.tsx`;
- [ ] existe una condición de renderizado;
- [ ] `HomePage` tiene el callback correspondiente;
- [ ] existe un botón para abrir el juego;
- [ ] el botón de volver funciona;
- [ ] se muestra el ejercicio actual;
- [ ] se pueden seleccionar respuestas;
- [ ] se valida la respuesta;
- [ ] se muestra feedback;
- [ ] se actualiza el puntaje;
- [ ] existe una política explícita para los reintentos (botón específico o nuevas selecciones, según el juego);
- [ ] existe un botón para avanzar;
- [ ] se muestra una pantalla final;
- [ ] el juego puede reiniciarse;
- [ ] existe contenido de ayuda;
- [ ] se ha comprobado si la ayuda se cierra con `Escape` (depende de `GameHelp.tsx`);
- [ ] las respuestas repetidas no otorgan puntos adicionales por accidente;
- [ ] el juego funciona con un JSON vacío, uno o varios ejercicios.

---

# 10. Verificación local

**Los archivos entregados no incluyen `package.json` ni dependencias instaladas:** no ha sido posible ejecutar estos comandos ni verificar los scripts disponibles. Si existen en el proyecto actual, desde `deutsch-cards` ejecutar:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Los comandos principales son:

```bash
npm run lint
```

Comprueba problemas de estilo y reglas de ESLint.

```bash
npm run build
```

En una configuración habitual de Vite + TypeScript ejecuta la comprobación de tipos y la compilación, **si el script `build` está definido así en el `package.json` real**.

Es especialmente importante ejecutar `npm run build` después de:

- agregar una categoría;
- agregar una página;
- modificar una unión de tipos;
- agregar imports;
- modificar las propiedades de `HomePage`;
- crear un nuevo juego.

---

# 11. Resumen rápido y grado de confianza

## Nueva categoría de Vocabulary Game — **confirmada con el código adjunto**

1. Crear `src/data/vocabulary/A.json` con `word`, `article`, `type` e `image` para cada palabra.
2. Crear las imágenes correspondientes bajo `public/images/A/` (o la ruta relativa elegida).
3. Añadir `{ "id": "A", "label": "A" }` al **JSON existente** `src/data/vocabulary/vocabulary.json`.
4. Importar `A.json` en `src/data/vocabularyLoader.ts`.
5. Agregar `"A"` a la unión `VocabularyCategory["id"]`.
6. Agregar `A: aWords as VocabularyItem[]` al objeto `vocabularyByCategory`.
7. Comprobar Home, tarjetas, audio, autoevaluación (10/5/0), fin y reinicio.

**Categorías registradas en el loader entregado:** `H`, `D`, `SCH`, `K`, `Z`, `P`. La presencia de la categoría `P` en `vocabulary.json` y del archivo `P.json` no se ha comprobado.

## Nuevos ejemplos — **rutas conocidas; validaciones pendientes**

| Juego | Archivo de datos señalado por `tree.md` | Forma descrita en guía V1 |
|---|---|---|
| Capitalization | `src/data/revision/capitalization.json` | `id`, `prompt`, `answer` |
| CorrectWriting | `src/data/revision/correctWriting.json` | `id`, `prompt`, `answer` |
| VerbGame | `src/data/verbs/endings.json` | `infinitive`, `exerciseType`, conjugaciones y traducciones; `stem` si `ending` |
| ScrambledSentence | `src/data/revision/scrambledSentences.json` | `id`, `answer` como tokens ordenados |

Antes de dar estas cuatro secciones como verificadas, revisar sus respectivas páginas y JSON. No dar por confirmados `trim()`, `formatSentence`, `GAME_LENGTH = 15` o el puntaje `+10/-3` de CorrectWriting sin ver el código.

## Juego nuevo — **propuesta de implementación**

Definir tipos y JSON; crear página con validación y protección frente a puntuaciones repetidas; registrar ayuda, import, `Activity`, condición de renderizado, callback y botón de Home. El ejemplo `ArticleGame` de la sección 8 es una propuesta **todavía no integrada ni compilada**.

## Archivos que faltan para cerrar la verificación

- `src/pages/CapitalizationGamePage.tsx`
- `src/pages/CorrectWritingGamePage.tsx`
- `src/pages/VerbGamePage.tsx`
- `src/pages/ScrambledSentenceGamePage.tsx`
- `src/data/revision/*.json`, `src/data/verbs/endings.json`
- `src/data/vocabulary/vocabulary.json`, `src/data/vocabulary/P.json` y algún JSON de categoría a modo de muestra
- `src/data/help/gameHelp.ts`, `src/types/help.ts`, `src/components/GameHelp.tsx`, `src/components/GameHeader.tsx`
- `package.json` (para confirmar comandos de verificación)

---

## Anexo: diferencias entre los tipos de vocabulario

**Tipo que usa `VocabularyGamePage.tsx`, desde `src/data/vocabularyLoader.ts`:**

```ts
export type VocabularyItem = {
  word: string
  article: string
  type: "noun" | "verb" | "adjective" | "preposition" | "number"
  image: string
}
```

**Otro tipo presente en `src/types/vocabulary.ts`:**

```ts
export type VocabularyItem = {
  word: string
  article?: string
  type: "noun" | "verb" | "adjective"
  image: string
  category: string
}
```

Estas definiciones **no son equivalentes**. No se ha demostrado que el segundo tipo intervenga en las páginas activas. La documentación usa el primer tipo porque coincide con el `import type` real del Vocabulary Game. Cualquier unificación futura debe hacerse como cambio de código separado y comprobar sus usos.

---

## Registro de verificación

| Fuente | Qué se pudo confirmar |
|---|---|
| `tree.md` (Sources) | Estructura del proyecto y rutas de archivos de juegos y datos; no valida contenido de los archivos |
| `App(1).tsx` | Actividades, selección de categoría, enrutamiento por estado y callbacks de Home |
| `HomePage(3).tsx` | Categorías generadas con `.map`; botones y estilos de juegos |
| `vocabularyLoader(1).ts` | Tipos de datos activos, imports `H/D/SCH/K/Z/P`, categorías válidas, mapa de datos |
| `VocabularyGamePage(3).tsx` | Elección aleatoria, imagen, SpeechSynthesis, 10/5/0, progreso, fin y reinicio |
| `vocabulary.ts` | Existencia de un tipo alternativo `VocabularyItem` con una forma distinta |
| `documentation_extending-games_Version1.md` | Fuente de los ejemplos de juegos de revisión/verbos y del diseño propuesto para `ArticleGame` cuando faltaba el código |

**No se han ejecutado pruebas, `lint` ni compilación.** Este archivo documenta lo verificado por inspección estática y separa lo no comprobado.
