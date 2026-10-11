import type { GameHelpContent } from "../../types/help"

type GameHelpCollection = {
  vocabulary: GameHelpContent
  verbs: GameHelpContent
  scrambledSentences: GameHelpContent
  correctWriting: GameHelpContent
  capitalization: GameHelpContent
}

export const gameHelp: GameHelpCollection = {
  vocabulary: {
    title: "Wortschatz",
    subtitle: "Vocabulary · Vocabulario · Wortschatz",
    sections: [
      {
        heading: "🇩🇪 Deutsch",
        lines: [
          "Sieh dir das Bild an und sage das deutsche Wort.",
          "Vergiss den Artikel nicht: der, die oder das.",
        ],
      },
      {
        heading: "Die Knöpfe",
        lines: [
          "👁️ Antwort zeigen → zeigt das richtige Wort",
          "🔊 Wort anhören → spielt die Aussprache ab",
          "✅ Richtig → Wort und Artikel sind richtig · +10",
          "🟡 Artikel falsch → Wort richtig, Artikel falsch · +5",
          "❌ Falsch → Wort ist nicht richtig · 0",
        ],
      },

      {
        heading: "🇬🇧 English",
        lines: [
          "Look at the picture and say the German word.",
          "Do not forget the article: der, die or das.",
        ],
      },
      {
        heading: "The buttons",
        lines: [
          "👁️ Show answer → shows the correct word",
          "🔊 Listen to word → plays the German pronunciation",
          "✅ Correct → word and article are correct · +10",
          "🟡 Wrong article → word is correct, article is wrong · +5",
          "❌ Wrong → the word is incorrect · 0",
        ],
      },

      {
        heading: "🇪🇸 Español",
        lines: [
          "Mira la imagen y di la palabra en alemán.",
          "No olvides el artículo: der, die o das.",
        ],
      },
      {
        heading: "Los botones",
        lines: [
          "👁️ Mostrar respuesta → muestra la palabra correcta",
          "🔊 Escuchar palabra → reproduce la pronunciación",
          "✅ Correcto → palabra y artículo correctos · +10",
          "🟡 Artículo incorrecto → palabra correcta, artículo incorrecto · +5",
          "❌ Incorrecto → la palabra no es correcta · 0",
        ],
      },
    ],
  },

  verbs: {
    title: "Verb-Endungen",
    subtitle: "Verb endings · Terminaciones verbales · Verb-Endungen",
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
        heading: "🇬🇧 English",
        lines: [
          "Many verbs follow this pattern:",
          "Ich → -e",
          "Mama → -t",
          "Alle → -en",
        ],
      },
      {
        heading: "Example: malen",
        lines: [
          "Ich male. → I paint.",
          "Mama malt. → Mum paints.",
          "Alle malen. → Everyone paints.",
        ],
      },
      {
        heading: "Special forms",
        lines: [
          "Some verbs change more than just their ending.",
          "These forms need special attention:",
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
    subtitle: "Scrambled sentences · Oraciones mezcladas · Schüttelsätze",
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
        heading: "🇬🇧 English",
        lines: [
          "Put the words in the correct order.",
          "You can think of it like this:",
          "Who?",
          "↓",
          "What does he / she do?",
          "↓",
          "What / where / with what?",
        ],
      },
      {
        heading: "Example",
        lines: [
          "Das Schwein | frisst | den Salat.",
          "The pig | eats | the salad.",
        ],
      },
      {
        heading: "Remember",
        lines: [
          "In these simple sentences, the conjugated verb is usually in position 2.",
          "Do not forget the full stop at the end.",
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
    subtitle: "Write correctly · Escribe correctamente · Schreibe richtig",
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
        heading: "🇬🇧 English",
        lines: [
          "Pay attention to:",
          "✓ Separate the words correctly",
          "✓ Start the first word of the sentence with a capital letter",
          "✓ German nouns begin with a capital letter",
          "✓ Do not forget the full stop at the end",
        ],
      },
      {
        heading: "Example",
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
    subtitle: "Uppercase or lowercase? · ¿Mayúscula o minúscula? · Groß oder klein?",
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
        heading: "🇬🇧 English",
        lines: [
          "Use a capital letter for:",
          "✓ Nouns",
          "✓ Names of people",
          "✓ The first word of a sentence",
        ],
      },
      {
        heading: "Clues",
        lines: [
          "der / die / das → a noun often comes after these articles",
          "ein / eine → a noun often comes after these articles",
        ],
      },
      {
        heading: "Examples",
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


/*---- DE y ESP -----*/
/*
import type { GameHelpContent } from "../../types/help"

type GameHelpCollection = {
  vocabulary: GameHelpContent
  verbs: GameHelpContent
  scrambledSentences: GameHelpContent
  correctWriting: GameHelpContent
  capitalization: GameHelpContent
}

export const gameHelp: GameHelpCollection = {
  vocabulary: {
    title: "Wortschatz",
    subtitle: "Vocabulario · Wortschatz",
    sections: [
      {
        heading: "🇩🇪 Deutsch",
        lines: [
          "Sieh dir das Bild an und sage das deutsche Wort.",
          "Vergiss den Artikel nicht: der, die oder das.",
        ],
      },
      {
        heading: "Die Knöpfe",
        lines: [
          "👁️ Antwort zeigen → zeigt das richtige Wort",
          "🔊 Wort anhören → spielt die Aussprache ab",
          "✅ Richtig → Wort und Artikel sind richtig · +10",
          "🟡 Artikel falsch → Wort richtig, Artikel falsch · +5",
          "❌ Falsch → Wort ist nicht richtig · 0",
        ],
      },
      {
        heading: "🇪🇸 Español",
        lines: [
          "Mira la imagen y di la palabra en alemán.",
          "No olvides el artículo: der, die o das.",
        ],
      },
      {
        heading: "Los botones",
        lines: [
          "👁️ Mostrar respuesta → muestra la palabra correcta",
          "🔊 Escuchar palabra → reproduce la pronunciación",
          "✅ Correcto → palabra y artículo correctos · +10",
          "🟡 Artículo incorrecto → palabra correcta, artículo incorrecto · +5",
          "❌ Incorrecto → la palabra no es correcta · 0",
        ],
      },
    ],
  },

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
*/