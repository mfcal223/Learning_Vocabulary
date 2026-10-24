# Guía para ampliar Learning_Vocabulary

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
│   │   └── vocabulary/
│   │       ├── vocabulary.json
│   │       ├── vocabularyLoader.ts
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

La aplicación no utiliza React Router. La navegación se controla desde `App.tsx` mediante el estado `selectedActivity`.

Los juegos siguen normalmente este flujo:

1. cargar ejercicios desde un archivo JSON;
2. mezclar los ejercicios;
3. mostrar un ejercicio;
4. recibir una respuesta;
5. mostrar feedback;
6. actualizar el puntaje;
7. avanzar al siguiente ejercicio;
8. mostrar una pantalla final;
9. permitir reiniciar la partida.

---

# 2. Incorporar una nueva sección al Vocabulary Game

En la implementación actual, una sección del `Vocabulary Game` corresponde a una categoría de vocabulario como `H`, `D`, `SCH`, `K` o `Z`.

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

Cada palabra debe incluir:

- `word`: palabra en alemán;
- `article`: artículo, si corresponde;
- `type`: tipo de palabra;
- `image`: ruta de la imagen.

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
    "id": "A",
    "label": "A"
  }
]
```

El valor de `id` debe coincidir con el identificador utilizado en el loader.

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
import aWords from "./vocabulary/A.json"
```

---

## Paso 5: actualizar el tipo `VocabularyCategory`

En el mismo archivo, agregar `A` a la unión de identificadores:

```ts
export type VocabularyCategory = {
  id: "H" | "D" | "SCH" | "K" | "Z" | "A"
  label: string
}
```

Este cambio es importante porque TypeScript necesita conocer todos los identificadores válidos.

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

Los juegos existentes cargan sus ejercicios desde archivos JSON. En la mayoría de los casos, para agregar ejemplos solo es necesario editar el archivo correspondiente.

Es importante:

- utilizar un `id` único;
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

El juego compara los caracteres posición por posición. Por eso, las cadenas deben tener la misma estructura.

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

El juego actualmente utiliza:

```ts
const answer = userAnswer.trim()
```

Esto elimina espacios al inicio y al final, pero no corrige automáticamente espacios internos.

Por ejemplo, estas respuestas no son necesariamente iguales:

```text
Ich esse die Schokolade im Haus.
Ich esse die  Schokolade im Haus.
```

El juego asigna:

```text
Respuesta correcta: +10 puntos
Respuesta incorrecta: -3 puntos
```

La lógica ya está implementada en `CorrectWritingGamePage.tsx`.

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

El juego genera combinaciones entre cada verbo y los sujetos definidos en `VerbGamePage.tsx`.

Actualmente se utiliza:

```ts
const GAME_LENGTH = 15
```

Por lo tanto, una partida genera como máximo 15 ejercicios.

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

La secuencia del arreglo debe ser el orden correcto de la oración. El juego se encarga de mezclar automáticamente los tokens.

También es necesario que cada ejercicio tenga un `id` único:

```text
schuettel-001
schuettel-002
schuettel-003
```

La función `formatSentence` corrige la presentación visual para evitar espacios antes de `.`, `!` y `?`.

---

# 8. Crear un juego completamente nuevo

Como ejemplo, se creará un juego llamado `ArticleGame`, para practicar los artículos alemanes:

```text
der
die
das
```

El procedimiento es similar para cualquier otro juego.

---

## Paso 1: definir la idea del juego

Antes de programar, definir:

- qué debe aprender el usuario;
- cuál será la pregunta;
- cuáles serán las respuestas;
- cómo se valida la respuesta;
- cómo se calcula el puntaje;
- si habrá reintentos;
- cuándo termina la partida;
- cómo se reinicia.

Ejemplo:

```text
Mostrar una palabra y pedir al usuario su artículo.
Respuesta correcta: +10 puntos.
Respuesta incorrecta: -3 puntos.
Después de una respuesta incorrecta, permitir reintentar.
```

---

## Paso 2: definir el tipo TypeScript

Crear:

```text
deutsch-cards/src/types/articleGame.ts
```

Contenido:

```ts
export type ArticleExercise = {
  id: string
  word: string
  answer: "der" | "die" | "das"
}
```

El tipo debe representar exactamente la estructura de los datos.

---

## Paso 3: crear el archivo JSON

Crear:

```text
deutsch-cards/src/data/articleGame.json
```

Contenido de ejemplo:

```json
[
  {
    "id": "article-001",
    "word": "Haus",
    "answer": "das"
  },
  {
    "id": "article-002",
    "word": "Hund",
    "answer": "der"
  },
  {
    "id": "article-003",
    "word": "Schule",
    "answer": "die"
  }
]
```

Cada ejercicio debe tener un identificador único.

---

## Paso 4: crear la página React

Crear:

```text
deutsch-cards/src/pages/ArticleGamePage.tsx
```

La página debe recibir una función `onBack`:

```tsx
type ArticleGamePageProps = {
  onBack: () => void
}
```

La estructura inicial puede ser:

```tsx
import { useState } from "react"
import articleData from "../data/articleGame.json"
import type { ArticleExercise } from "../types/articleGame"

import { GameHeader } from "../components/GameHeader"
import { GameHelp } from "../components/GameHelp"
import { gameHelp } from "../data/help/gameHelp"

type ArticleGamePageProps = {
  onBack: () => void
}

type Feedback = "correct" | "incorrect" | null

export function ArticleGamePage({
  onBack,
}: ArticleGamePageProps) {
  const allExercises =
    articleData as ArticleExercise[]

  const [currentExerciseIndex, setCurrentExerciseIndex] =
    useState(0)

  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null)

  const [feedback, setFeedback] =
    useState<Feedback>(null)

  const [score, setScore] =
    useState(0)

  const [showHelp, setShowHelp] =
    useState(false)

  const [gameFinished, setGameFinished] =
    useState(false)

  const exercise =
    allExercises[currentExerciseIndex]

  if (allExercises.length === 0) {
    return (
      <>
        <GameHeader
          title="Artikel-Spiel"
          onBack={onBack}
          onHelp={() => setShowHelp(true)}
        />

        <main>
          <p>No hay ejercicios disponibles.</p>
        </main>
      </>
    )
  }

  return (
    <>
      <GameHeader
        title="Artikel-Spiel · Article game"
        onBack={onBack}
        onHelp={() => setShowHelp(true)}
      />

      {showHelp && (
        <GameHelp
          content={gameHelp.articleGame}
          onClose={() => setShowHelp(false)}
        />
      )}

      <main>
        <p>Palabra: {exercise.word}</p>

        <button onClick={() => setSelectedAnswer("der")}>
          der
        </button>

        <button onClick={() => setSelectedAnswer("die")}>
          die
        </button>

        <button onClick={() => setSelectedAnswer("das")}>
          das
        </button>
      </main>
    </>
  )
}
```

Después de crear la estructura básica, implementar:

- validación de respuestas;
- feedback correcto o incorrecto;
- botón de reintento;
- botón para avanzar;
- puntaje;
- pantalla final;
- botón para volver a jugar.

---

## Paso 5: agregar la ayuda del juego

Editar:

```text
deutsch-cards/src/data/help/gameHelp.ts
```

Primero, actualizar el tipo `GameHelpCollection`:

```ts
type GameHelpCollection = {
  vocabulary: GameHelpContent
  verbs: GameHelpContent
  scrambledSentences: GameHelpContent
  correctWriting: GameHelpContent
  capitalization: GameHelpContent
  articleGame: GameHelpContent
}
```

Después agregar el contenido:

```ts
articleGame: {
  title: "Artikel-Spiel",
  subtitle: "Artículos · Articles",
  sections: [
    {
      heading: "Cómo jugar",
      lines: [
        "Elige el artículo correcto para cada palabra.",
        "Selecciona der, die o das.",
      ],
    },
    {
      heading: "Ejemplos",
      lines: [
        "der Hund",
        "die Schule",
        "das Haus",
      ],
    },
  ],
},
```

La estructura de ayuda está definida en:

```text
deutsch-cards/src/types/help.ts
```

---

## Paso 6: importar la nueva página en `App.tsx`

Editar:

```text
deutsch-cards/src/App.tsx
```

Agregar:

```tsx
import { ArticleGamePage } from "./pages/ArticleGamePage"
```

---

## Paso 7: agregar la actividad al tipo `Activity`

Actualizar la unión:

```ts
type Activity =
  | "vocabulary"
  | "verbs"
  | "scrambledSentences"
  | "correctWriting"
  | "capitalization"
  | "articleGame"
```

Si se omite este paso, TypeScript no reconocerá `"articleGame"` como una actividad válida.

---

## Paso 8: agregar la condición de renderizado

Antes del `return` que muestra `HomePage`, agregar:

```tsx
if (selectedActivity === "articleGame") {
  return (
    <ArticleGamePage
      onBack={() => setSelectedActivity(null)}
    />
  )
}
```

---

## Paso 9: agregar el callback a `HomePageProps`

Editar:

```text
deutsch-cards/src/pages/HomePage.tsx
```

Agregar la nueva propiedad:

```tsx
type HomePageProps = {
  categories: VocabularyCategory[]
  onSelectCategory: (
    categoryId: VocabularyCategory["id"]
  ) => void
  onSelectVerbs: () => void
  onSelectScrambledSentences: () => void
  onSelectCorrectWriting: () => void
  onSelectCapitalization: () => void
  onSelectArticleGame: () => void
}
```

También agregarla a la lista de propiedades recibidas:

```tsx
export function HomePage({
  categories,
  onSelectCategory,
  onSelectVerbs,
  onSelectScrambledSentences,
  onSelectCorrectWriting,
  onSelectCapitalization,
  onSelectArticleGame,
}: HomePageProps) {
```

---

## Paso 10: agregar el botón en `HomePage.tsx`

Agregar un botón dentro de la sección correspondiente:

```tsx
<button
  onClick={onSelectArticleGame}
  style={buttonStyle}
>
  Artikel-Spiel
  <span style={englishLabelStyle}>
    Articles game
  </span>
</button>
```

---

## Paso 11: conectar el callback en `App.tsx`

Dentro de `<HomePage />`, agregar:

```tsx
<HomePage
  categories={vocabularyCategories}
  onSelectCategory={(categoryId) => {
    setSelectedActivity("vocabulary")
    setSelectedCategory(categoryId)
  }}
  onSelectVerbs={() =>
    setSelectedActivity("verbs")
  }
  onSelectScrambledSentences={() =>
    setSelectedActivity("scrambledSentences")
  }
  onSelectCorrectWriting={() =>
    setSelectedActivity("correctWriting")
  }
  onSelectCapitalization={() =>
    setSelectedActivity("capitalization")
  }
  onSelectArticleGame={() =>
    setSelectedActivity("articleGame")
  }
/>
```

Si se agrega la nueva propiedad a `HomePageProps`, pero no se proporciona desde `App.tsx`, TypeScript mostrará un error.

---

## Paso 12: implementar la lógica del juego

La página nueva debería mantener estados similares a los juegos existentes:

```tsx
const [currentExerciseIndex, setCurrentExerciseIndex] =
  useState(0)

const [selectedAnswer, setSelectedAnswer] =
  useState<string | null>(null)

const [feedback, setFeedback] =
  useState<Feedback>(null)

const [score, setScore] =
  useState(0)

const [gameFinished, setGameFinished] =
  useState(false)
```

La función para comprobar una respuesta puede seguir este patrón:

```tsx
function handleAnswer(answer: string) {
  setSelectedAnswer(answer)

  if (answer === exercise.answer) {
    setFeedback("correct")
    setScore((currentScore) => currentScore + 10)
  } else {
    setFeedback("incorrect")
    setScore((currentScore) => currentScore - 3)
  }
}
```

Para avanzar:

```tsx
function handleNext() {
  if (
    currentExerciseIndex ===
    allExercises.length - 1
  ) {
    setGameFinished(true)
    return
  }

  setCurrentExerciseIndex(
    (currentIndex) => currentIndex + 1
  )

  setSelectedAnswer(null)
  setFeedback(null)
}
```

Para reiniciar:

```tsx
function handleRestart() {
  setCurrentExerciseIndex(0)
  setSelectedAnswer(null)
  setFeedback(null)
  setScore(0)
  setGameFinished(false)
}
```

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
- [ ] existe un botón de reintento;
- [ ] existe un botón para avanzar;
- [ ] se muestra una pantalla final;
- [ ] el juego puede reiniciarse;
- [ ] existe contenido de ayuda;
- [ ] la ayuda se puede cerrar con `Escape`.

---

# 10. Verificación local

Desde la carpeta `deutsch-cards`, ejecutar:

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

Ejecuta TypeScript y luego compila la aplicación con Vite.

Es especialmente importante ejecutar `npm run build` después de:

- agregar una categoría;
- agregar una página;
- modificar una unión de tipos;
- agregar imports;
- modificar las propiedades de `HomePage`;
- crear un nuevo juego.

---

# 11. Resumen rápido

## Nueva sección del Vocabulary Game

1. Crear un nuevo archivo JSON.
2. Agregar las imágenes.
3. Registrar la categoría en `vocabulary.json`.
4. Importar el JSON en `vocabularyLoader.ts`.
5. Agregar el identificador al tipo `VocabularyCategory`.
6. Agregar los datos a `vocabularyByCategory`.
7. Probar la categoría desde la pantalla inicial.

## Nuevos ejemplos

### CapitalizationGame

Editar:

```text
src/data/revision/capitalization.json
```

Agregar:

```json
{
  "id": "capital-011",
  "prompt": "der hund liegt im garten.",
  "answer": "Der Hund liegt im Garten."
}
```

### CorrectWritingGame

Editar:

```text
src/data/revision/correctWriting.json
```

Agregar:

```json
{
  "id": "write-002",
  "prompt": "DuhastdasBuch.",
  "answer": "Du hast das Buch."
}
```

### VerbGame

Editar:

```text
src/data/verbs/endings.json
```

Agregar un verbo de tipo `ending` o `fullForm`.

### ScrambledSentenceGame

Editar:

```text
src/data/revision/scrambledSentences.json
```

Agregar una oración como arreglo de tokens:

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

## Juego completamente nuevo

1. Definir la mecánica.
2. Definir el tipo TypeScript.
3. Crear el archivo JSON.
4. Crear la página React.
5. Agregar la ayuda.
6. Agregar la actividad en `App.tsx`.
7. Agregar el import.
8. Agregar la condición de renderizado.
9. Agregar el callback en `HomePageProps`.
10. Agregar el botón.
11. Implementar respuestas, puntaje, feedback y reinicio.
12. Ejecutar `npm run lint`.
13. Ejecutar `npm run build`.
14. Probar toda la experiencia de usuario.