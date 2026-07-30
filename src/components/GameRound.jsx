import { useEffect, useState } from 'react'
import GameResults from './GameResults'
import { bookLabel } from '../data/books'
import { buildDeck } from '../utils/deck'
import { playFail, playSuccess } from '../utils/sound'
import './Game.css'

export default function GameRound({ books, config, onReconfigure, onExit, onRestart }) {
    // El mazo se baraja una sola vez por partida
    const [deck] = useState(() => buildDeck(books, config.books, config.level, config.amount))

    const [index, setIndex] = useState(0)
    const [selected, setSelected] = useState(null)
    const [remaining, setRemaining] = useState(config.time)
    const [results, setResults] = useState([])
    const [finished, setFinished] = useState(false)

    const question = deck[index]
    const isTimed = config.time > 0
    const timedOut = isTimed && remaining === 0 && selected === null
    const resolved = selected !== null || timedOut

    useEffect(() => {
        if (!isTimed || resolved) return

        // Al arrancar cada pregunta el tiempo siempre parte del configurado
        let left = config.time

        const id = setInterval(() => {
            left -= 1
            setRemaining(left)

            if (left <= 0) {
                clearInterval(id)
                playFail()
            }
        }, 1000)

        return () => clearInterval(id)
    }, [isTimed, resolved, index, config.time])

    if (finished || !question) {
        return (
            <GameResults
                results={results}
                config={config}
                onRestart={onRestart}
                onReconfigure={onReconfigure}
                onExit={onExit}
            />
        )
    }

    const score = results.filter((result) => result.correct).length

    const answer = (option) => {
        if (resolved) return

        const correct = option === question.personaje
        if (correct) playSuccess()
        else playFail()

        setSelected(option)
        setResults((current) => [
            ...current,
            { personaje: question.personaje, book: question.book, correct },
        ])
    }

    const next = () => {
        // Si se acabó el tiempo el resultado aún no se registró
        const pending = timedOut
            ? [...results, { personaje: question.personaje, book: question.book, correct: false, timedOut: true }]
            : results

        setResults(pending)

        if (index + 1 >= deck.length) {
            setFinished(true)
            return
        }

        setIndex(index + 1)
        setSelected(null)
        setRemaining(config.time)
    }

    const progress = isTimed ? (remaining / config.time) * 100 : 100

    return (
        <main className="page game">
            <header className="game__bar">
                <button type="button" className="page__back" onClick={onReconfigure}>
                    ← Salir
                </button>

                <span className="game__progress">
                    Pregunta {index + 1} <span>/ {deck.length}</span>
                </span>

                <span className="game__score">
                    {score} <span>pts</span>
                </span>
            </header>

            {isTimed && (
                <div className="game__timer">
                    <div
                        className={`game__timer-fill ${remaining <= 5 ? 'is-urgent' : ''}`}
                        style={{ width: `${progress}%` }}
                    />
                    <span className="game__timer-value">{remaining}s</span>
                </div>
            )}

            <section className="game__card">
                <span className="game__label">¿Quién soy?</span>

                <ul className="game__hints">
                    {question.hints.map((hint, position) => (
                        <li key={hint}>
                            <span className="game__hint-number" aria-hidden="true">
                                {position + 1}
                            </span>
                            {hint}
                        </li>
                    ))}
                </ul>
            </section>

            <ul className="game__options">
                {question.options.map((option, position) => {
                    const isCorrect = option === question.personaje
                    const state = !resolved
                        ? ''
                        : isCorrect
                          ? 'is-correct'
                          : option === selected
                            ? 'is-wrong'
                            : 'is-dim'

                    return (
                        <li key={option}>
                            <button
                                type="button"
                                className={`game__option ${state}`}
                                onClick={() => answer(option)}
                                disabled={resolved}
                            >
                                <span className="game__option-key" aria-hidden="true">
                                    {String.fromCharCode(65 + position)}
                                </span>
                                {option}
                            </button>
                        </li>
                    )
                })}
            </ul>

            {resolved && (
                <footer className="game__feedback">
                    <p className={`game__verdict ${selected === question.personaje ? 'is-win' : 'is-lose'}`}>
                        {selected === question.personaje
                            ? '¡Correcto!'
                            : timedOut
                              ? `Se acabó el tiempo. Era ${question.personaje}.`
                              : `Casi. Era ${question.personaje}.`}
                    </p>
                    <p className="game__explain">
                        <span className="game__book">{bookLabel(question.book)}</span>
                        {question.desc}
                    </p>
                    <button type="button" className="game__next" onClick={next}>
                        {index + 1 >= deck.length ? 'Ver resultados' : 'Siguiente'}
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 12h15M13 6l6 6-6 6" />
                        </svg>
                    </button>
                </footer>
            )}
        </main>
    )
}
