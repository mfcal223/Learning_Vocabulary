# 28/10/26

# Lista de tareas
1. Crear un catálogo central de oraciones, conservando inicialmente los JSON actuales. Clasificar las oraciones que ya tenemos, sin perder ejercicios ni soluciones.
2. Implementar el sistema de filtrado por categoría. Los juegos recibirían una colección de ejercicios ya filtrados en lugar de cargar siempre toda la colección. 
3. Reorganizar el HOME para que la selección del grupo de vocabulario sea la primera decisión, conservando el repaso general. 
4. Migrar gradualmente los juegos de oraciones para que consulten la biblioteca central y generen sus propias representaciones. 
5. Adaptar después el juego de verbos, que tiene una estructura distinta y podría conservar su archivo endings.json, añadiendo solamente las referencias a los grupos correspondientes.
6. actualizar el documento de Game's architecture
   1. modificar / actualizar los cambios de diseño
   2. agregar una regla de diseño: no necesitamos que todos los juegos tengan ejercicios para cada grupo. Si una lista nueva contiene sustantivos y adjetivos, pero ningún verbo, no tendría sentido inventar ejercicios de conjugación solo para completar el menú.
7. se agrega un achivo central de traducciones uiText.ts. En el extremo superior derecho del HOME y del menú de cada letra aparecerán dos botones: ES / EN. El alemán siempre estará visible. El usuario decide si quiere acompañarlo con español o inglés. La preferencia se mantiene al navegar y también después de recargar la página, siempre que el navegador permita guardarla.
---

## Plan de refactorización

0 de 5

[ x ] Crear una biblioteca central de oraciones y clasificar los ejercicios existentes.
[ ] Implementar el filtrado de ejercicios por categoría de vocabulario.
[ ] Reorganizar el HOME: primero vocabulario, después tipo de juego.
[ ] Adaptar los juegos de oraciones para utilizar la biblioteca central.
[ ] Adaptar el juego de verbos y comprobar el funcionamiento general.


[idea siguiente] :
Seria posible que mantengamos en el Home los botones para los juegos de oraciones y vebos , y que si el jugador accede desde ahi, la app elija 10 oraciones randoms / 15 verbos random de todo el pool existente?

pero que si el jugador primero elige 1 letra, por ej, la Z. que sea redirigdo a una pagina donde luego pueda elegir cuál juego puntual jugar, para el sub-pool de palabras con "Z" ?
Nos aseguraremos que para cada letra haya al menos 10 opciones de oraciones que los juegos puedan utilizar.

---

## Cómo sería nuestra nueva biblioteca
Propongo que cada oración tenga una estructura semejante a esta:
{
  "id": "sentence-001",
  "text": "Ich esse die Schokolade im Haus.",
  "categories": ["H"],
  "focusWords": ["Haus"],
  "overrides": {
    "correctWriting": {
      "prompt": "IchessedieSchokoladeimHaus."
    }
  }
}




Este es un ejemplo de diseño, todavía no el archivo definitivo.

Hay tres ideas importantes:
- text almacena la oración correcta una sola vez.
- categories y focusWords permiten relacionarla con el vocabulario escolar.
- overrides permite conservar variantes específicas de un ejercicio cuando no queremos que se generen automáticamente.
De esta manera, no necesitamos guardar tres copias de Ich esse die Schokolade im Haus. para practicar diferentes habilidades.

```
// 11:05 hr - se aplicó esta estructura en el archivo sentences.json
  {
    "id": "sentence-014",
    "text": "Ich esse die Schokolade im Haus.",
    "categories": ["H", "D"],
    "focusWords": ["Haus", "Schokolade"],
    "exercises": {
      "correctWriting": {
        "sourceId": "write-001",
        "prompt": "IchessedieSchokoladeimHaus."
      }
    }
  }
```

---

agregamo botones ENG y SPA para que el  usuario elija el idioma de traduccion de la interfaz

agregamos casi 50 oraciones al pool y las clasificamos (reglas de clasificacion)