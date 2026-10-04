import type { GameHelpContent } from "../../types/help"

type GameHelpCollection = {
  verbs: GameHelpContent
  scrambledSentences: GameHelpContent
  correctWriting: GameHelpContent
  capitalization: GameHelpContent
}

export const gameHelp: GameHelpCollection = {
  verbs: {
    title: "Verb-Endungen",
    subtitle: "Terminaciones verbales · Verb-Endungen",
    sections: [
      {
        heading: "🇩🇪 Deutsch",
        lines: [
          "Viele Verben folgen diesem Muster:",
          "Ich → -e",
          "Mama → -t",
          "Alle → -en",
        ],
      },
      {
        heading: "Beispiel: malen",
        lines: [
          "Ich male.",
          "Mama malt.",
          "Alle malen.",
        ],
      },
      {
        heading: "Besondere Formen",
        lines: [
          "Einige Verben ändern sich stärker.",
          "Diese Formen muss man besonders lernen:",
          "schlafen → schläft",
          "lesen → liest",
          "essen → isst",
          "sein → ist",
          "haben → hat",
        ],
      },
      {
        heading: "🇪🇸 Español",
        lines: [
          "Muchos verbos siguen este patrón:",
          "Ich → -e",
          "Mama → -t",
          "Alle → -en",
        ],
      },
      {
        heading: "Ejemplo: malen",
        lines: [
          "Ich male. → Yo pinto.",
          "Mama malt. → Mamá pinta.",
          "Alle malen. → Todos pintan.",
        ],
      },
      {
        heading: "Formas especiales",
        lines: [
          "Algunos verbos cambian más.",
          "Estas formas conviene aprenderlas especialmente:",
          "schlafen → schläft",
          "lesen → liest",
          "essen → isst",
          "sein → ist",
          "haben → hat",
        ],
      },
    ],
  },

  scrambledSentences: {
    title: "Schüttelsätze",
    subtitle: "Oraciones mezcladas · Schüttelsätze",
    sections: [
      {
        heading: "🇩🇪 Deutsch",
        lines: [
          "Bringe die Wörter in die richtige Reihenfolge.",
          "Du kannst so denken:",
          "Wer?",
          "↓",
          "Was macht er / sie?",
          "↓",
          "Was / wo / womit?",
        ],
      },
      {
        heading: "Beispiel",
        lines: [
          "Das Schwein | frisst | den Salat.",
        ],
      },
      {
        heading: "Merke",
        lines: [
          "Das konjugierte Verb steht meistens an Position 2.",
          "Vergiss den Punkt am Ende nicht.",
        ],
      },
      {
        heading: "🇪🇸 Español",
        lines: [
          "Coloca las palabras en el orden correcto.",
          "Puedes pensarlo así:",
          "¿Quién?",
          "↓",
          "¿Qué hace?",
          "↓",
          "¿Qué / dónde / con qué?",
        ],
      },
      {
        heading: "Ejemplo",
        lines: [
          "Das Schwein | frisst | den Salat.",
          "El cerdo | come | la ensalada.",
        ],
      },
      {
        heading: "Recuerda",
        lines: [
          "En estas oraciones simples, el verbo conjugado suele estar en la posición 2.",
          "No olvides el punto al final.",
        ],
      },
    ],
  },

  correctWriting: {
    title: "Schreibe richtig",
    subtitle: "Escribe correctamente · Schreibe richtig",
    sections: [
      {
        heading: "🇩🇪 Deutsch",
        lines: [
          "Achte auf:",
          "✓ Wörter richtig trennen",
          "✓ Das erste Wort im Satz großschreiben",
          "✓ Nomen großschreiben",
          "✓ Punkt am Ende nicht vergessen",
        ],
      },
      {
        heading: "Beispiel",
        lines: [
          "IchessedieSchokoladeimHaus.",
          "↓",
          "Ich esse die Schokolade im Haus.",
        ],
      },
      {
        heading: "🇪🇸 Español",
        lines: [
          "Presta atención a:",
          "✓ Separar correctamente las palabras",
          "✓ La primera palabra empieza con mayúscula",
          "✓ Los sustantivos alemanes llevan mayúscula",
          "✓ No olvidar el punto final",
        ],
      },
      {
        heading: "Ejemplo",
        lines: [
          "IchessedieSchokoladeimHaus.",
          "↓",
          "Ich esse die Schokolade im Haus.",
        ],
      },
    ],
  },

  capitalization: {
    title: "Groß oder klein?",
    subtitle: "¿Mayúscula o minúscula? · Groß oder klein?",
    sections: [
      {
        heading: "🇩🇪 Deutsch",
        lines: [
          "Groß schreibt man:",
          "✓ Nomen",
          "✓ Namen von Personen",
          "✓ Das erste Wort im Satz",
        ],
      },
      {
        heading: "Hilfen",
        lines: [
          "der / die / das → danach kommt oft ein Nomen",
          "ein / eine → danach kommt oft ein Nomen",
        ],
      },
      {
        heading: "Beispiele",
        lines: [
          "die Spinne",
          "das Haus",
          "ein Vogel",
          "eine Tafel",
        ],
      },
      {
        heading: "🇪🇸 Español",
        lines: [
          "Se escriben con mayúscula:",
          "✓ Los sustantivos",
          "✓ Los nombres de personas",
          "✓ La primera palabra de una oración",
        ],
      },
      {
        heading: "Pistas",
        lines: [
          "der / die / das → después suele venir un sustantivo",
          "ein / eine → después suele venir un sustantivo",
        ],
      },
      {
        heading: "Ejemplos",
        lines: [
          "die Spinne",
          "das Haus",
          "ein Vogel",
          "eine Tafel",
        ],
      },
    ],
  },
}