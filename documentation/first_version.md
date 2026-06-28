
# MVP mínimo

Tu primera versión podría tener solo esto:
```
Cargar vocabulario desde vocabulary.json
Mostrar una imagen
Mostrar botón “Ver respuesta”
Mostrar botón “Siguiente palabra”
Elegir palabras aleatoriamente
```

## Minimum structure
```
deutsch-cards/
│
├── public/
│   └── images/
│       ├── hund.jpg
│       └── haus.jpg
│
└── src/
    │
    ├── data/
    │   └── vocabulary.json
    │
    │
    ├── App.tsx
    │
    └── types/
        └── vocabulary.ts
```



---

## Lo que yo haría después del MVP

Una vez funcionando:

Nivel 2

Agregar categorías:

Animales
Comida
Escuela
Colores
Nivel 3

Agregar artículos:

[imagen]

¿der?
¿die?
¿das?
Nivel 4

Guardar progreso en localStorage

Hund → 5 aciertos
Haus → 2 errores
Nivel 5

Agregar audio

Botón:

🔊 Escuchar palabra

usando la síntesis de voz del navegador (SpeechSynthesis), sin pagar nada.

---