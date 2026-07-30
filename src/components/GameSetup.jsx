import { useState } from 'react'
import { LEVELS, bookLabel } from '../data/books'
import { DEFAULT_CONFIG, TIME_OPTIONS, timeLabel } from '../data/game'
import './GameSetup.css'

export default function GameSetup({ books, onStart, onBack }) {
    const bookKeys = Object.keys(books)

    const [level, setLevel] = useState(DEFAULT_CONFIG.level)
    const [time, setTime] = useState(DEFAULT_CONFIG.time)
    const [selectedBooks, setSelectedBooks] = useState(bookKeys)

    const allSelected = selectedBooks.length === bookKeys.length
    const questions = selectedBooks.reduce((total, book) => total + books[book].length, 0)
    const ready = selectedBooks.length > 0

    const toggleBook = (book) =>
        setSelectedBooks((current) =>
            current.includes(book) ? current.filter((item) => item !== book) : [...current, book]
        )

    const toggleAll = () => setSelectedBooks(allSelected ? [] : bookKeys)

    const start = () => {
        if (ready) onStart({ level, time, books: selectedBooks })
    }

    return (
        <main className="page setup">
            <header className="setup__header">
                <button type="button" className="page__back" onClick={onBack}>
                    ← Menú
                </button>
                <h1 className="page__title">Prepara tu partida</h1>
                <p className="page__note">
                    Elige qué tan difíciles serán las pistas, cuánto tiempo tienes para responder y
                    de qué libros saldrán los personajes.
                </p>
            </header>

            {/* Dificultad */}
            <section className="setup__section" aria-labelledby="setup-level">
                <div className="setup__section-head">
                    <span className="setup__step">Paso 1</span>
                    <h2 id="setup-level" className="setup__section-title">Dificultad</h2>
                </div>

                <div className="setup__levels" role="radiogroup" aria-labelledby="setup-level">
                    {LEVELS.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={level === option.id}
                            className={`setup__level setup__level--${option.id} ${
                                level === option.id ? 'is-active' : ''
                            }`}
                            onClick={() => setLevel(option.id)}
                        >
                            <span className="setup__dot" aria-hidden="true" />
                            <span className="setup__level-label">{option.label}</span>
                            <span className="setup__level-desc">{option.desc}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Tiempo por pregunta */}
            <section className="setup__section" aria-labelledby="setup-time">
                <div className="setup__section-head">
                    <span className="setup__step">Paso 2</span>
                    <h2 id="setup-time" className="setup__section-title">Tiempo por pregunta</h2>
                </div>

                <div className="setup__times" role="radiogroup" aria-labelledby="setup-time">
                    {TIME_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={time === option.value}
                            aria-label={option.desc}
                            className={`setup__time ${time === option.value ? 'is-active' : ''}`}
                            onClick={() => setTime(option.value)}
                        >
                            <span className="setup__time-value">{option.label}</span>
                            <span className="setup__time-desc">{option.desc}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Libros */}
            <section className="setup__section" aria-labelledby="setup-books">
                <div className="setup__section-head">
                    <span className="setup__step">Paso 3</span>
                    <h2 id="setup-books" className="setup__section-title">Libros</h2>
                    <button type="button" className="setup__toggle-all" onClick={toggleAll}>
                        {allSelected ? 'Quitar todos' : 'Seleccionar todos'}
                    </button>
                </div>

                <div className="setup__books">
                    {bookKeys.map((book) => {
                        const active = selectedBooks.includes(book)

                        return (
                            <button
                                key={book}
                                type="button"
                                aria-pressed={active}
                                className={`setup__book ${active ? 'is-active' : ''}`}
                                onClick={() => toggleBook(book)}
                            >
                                <span className="setup__check" aria-hidden="true">
                                    <svg viewBox="0 0 24 24">
                                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                                    </svg>
                                </span>
                                <span className="setup__book-name">{bookLabel(book)}</span>
                                <span className="setup__book-count">{books[book].length}</span>
                            </button>
                        )
                    })}
                </div>

                {!ready && (
                    <p className="setup__warning" role="alert">
                        Selecciona al menos un libro para empezar.
                    </p>
                )}
            </section>

            {/* Resumen */}
            <footer className="setup__footer">
                <p className="setup__summary">
                    <strong>{questions}</strong> personajes posibles · nivel{' '}
                    <strong>{LEVELS.find((option) => option.id === level).label.toLowerCase()}</strong> ·{' '}
                    {timeLabel(time)}
                </p>
                <button type="button" className="setup__start" onClick={start} disabled={!ready}>
                    Comenzar partida
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                </button>
            </footer>
        </main>
    )
}
