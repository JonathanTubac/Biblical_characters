export function shuffle(items) {
    const copy = [...items]

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = copy[i]
        copy[i] = copy[j]
        copy[j] = temp
    }

    return copy
}

const OPTIONS_PER_QUESTION = 4

/**
 * Arma el mazo de preguntas: baraja los personajes de los libros elegidos,
 * toma los primeros `amount` y genera para cada uno sus pistas del nivel y
 * 4 opciones de respuesta. Sin `amount` entran todos.
 */
export function buildDeck(books, selectedBooks, level, amount) {
    const pool = selectedBooks.flatMap((book) =>
        (books[book] ?? []).map((character) => ({ ...character, book }))
    )

    // Los distractores salen de todo el mazo, no solo de las preguntas elegidas
    const names = [...new Set(pool.map((character) => character.personaje))]
    const selection = amount > 0 ? shuffle(pool).slice(0, amount) : shuffle(pool)

    return selection.map((character) => {
        const distractors = shuffle(names.filter((name) => name !== character.personaje)).slice(
            0,
            OPTIONS_PER_QUESTION - 1
        )

        return {
            personaje: character.personaje,
            desc: character.desc,
            book: character.book,
            hints: character.pistas[level],
            options: shuffle([character.personaje, ...distractors]),
        }
    })
}
