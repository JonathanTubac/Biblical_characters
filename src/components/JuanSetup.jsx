import { useState } from 'react'
import { DEFAULT_JUAN_CONFIG, JUAN_LEVELS, MIN_QUESTIONS, TIME_OPTIONS, timeLabel } from '../data/game'
import './GameSetup.css'

export default function JuanSetup({ questions, onStart, onBack }) {
    const chapters = [...new Set(questions.map((question) => question.capitulo))].sort((a, b) => a - b)

    const countAvailable = (level, selectedChapters) =>
        questions.filter(
            (question) => question.dificultad === level && selectedChapters.includes(question.capitulo)
        ).length

    const [level, setLevel] = useState(DEFAULT_JUAN_CONFIG.level)
    const [time, setTime] = useState(DEFAULT_JUAN_CONFIG.time)
    const [selectedChapters, setSelectedChapters] = useState(chapters)
    // Se guarda como texto para poder borrar el campo mientras se escribe
    const [amount, setAmount] = useState(String(DEFAULT_JUAN_CONFIG.amount))

    const allSelected = selectedChapters.length === chapters.length
    const available = countAvailable(level, selectedChapters)

    const max = available
    const min = Math.min(MIN_QUESTIONS, max)
    const parsedAmount = Number.parseInt(amount, 10)
    const amountValid = Number.isInteger(parsedAmount) && parsedAmount >= min && parsedAmount <= max

    const ready = selectedChapters.length > 0 && amountValid

    // Si al cambiar dificultad o capítulos el número deja de caber, se recorta al máximo posible
    const fitAmount = (nextMax) => {
        const value = Number.parseInt(amount, 10)
        if (Number.isInteger(value) && value > nextMax) setAmount(String(nextMax))
    }

    const selectLevel = (nextLevel) => {
        setLevel(nextLevel)
        fitAmount(countAvailable(nextLevel, selectedChapters))
    }

    const toggleChapter = (chapter) => {
        const next = selectedChapters.includes(chapter)
            ? selectedChapters.filter((item) => item !== chapter)
            : [...selectedChapters, chapter]

        setSelectedChapters(next)
        fitAmount(countAvailable(level, next))
    }

    const toggleAll = () => {
        const next = allSelected ? [] : chapters
        setSelectedChapters(next)
        fitAmount(countAvailable(level, next))
    }

    // Al salir del campo se ajusta lo que quedó fuera de rango o vacío
    const normalizeAmount = () => {
        const value = Number.parseInt(amount, 10)
        if (!Number.isInteger(value)) return setAmount(String(Math.min(DEFAULT_JUAN_CONFIG.amount, max)))
        setAmount(String(Math.min(Math.max(value, min), max)))
    }

    const start = () => {
        if (ready) onStart({ level, time, capitulos: selectedChapters, amount: parsedAmount })
    }

    return (
        <main className="page setup">
            <header className="setup__header">
                <button type="button" className="page__back" onClick={onBack}>
                    ← Menú
                </button>
                <h1 className="page__title">Prepara tu partida</h1>
                <p className="page__note">
                    Elige la dificultad de las preguntas, cuánto tiempo tienes para responder y de qué
                    capítulos del evangelio de Juan saldrán.
                </p>
            </header>

            {/* Dificultad */}
            <section className="setup__section" aria-labelledby="setup-level">
                <div className="setup__section-head">
                    <span className="setup__step">Paso 1</span>
                    <h2 id="setup-level" className="setup__section-title">Dificultad</h2>
                </div>

                <div className="setup__levels" role="radiogroup" aria-labelledby="setup-level">
                    {JUAN_LEVELS.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={level === option.id}
                            className={`setup__level setup__level--${option.id} ${
                                level === option.id ? 'is-active' : ''
                            }`}
                            onClick={() => selectLevel(option.id)}
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

            {/* Capítulos */}
            <section className="setup__section" aria-labelledby="setup-chapters">
                <div className="setup__section-head">
                    <span className="setup__step">Paso 3</span>
                    <h2 id="setup-chapters" className="setup__section-title">Capítulos</h2>
                    <button type="button" className="setup__toggle-all" onClick={toggleAll}>
                        {allSelected ? 'Quitar todos' : 'Seleccionar todos'}
                    </button>
                </div>

                <div className="setup__books">
                    {chapters.map((chapter) => {
                        const active = selectedChapters.includes(chapter)
                        const count = questions.filter(
                            (question) => question.capitulo === chapter && question.dificultad === level
                        ).length

                        return (
                            <button
                                key={chapter}
                                type="button"
                                aria-pressed={active}
                                className={`setup__book ${active ? 'is-active' : ''}`}
                                onClick={() => toggleChapter(chapter)}
                            >
                                <span className="setup__check" aria-hidden="true">
                                    <svg viewBox="0 0 24 24">
                                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                                    </svg>
                                </span>
                                <span className="setup__book-name">Cap. {chapter}</span>
                                <span className="setup__book-count">{count}</span>
                            </button>
                        )
                    })}
                </div>

                {selectedChapters.length === 0 && (
                    <p className="setup__warning" role="alert">
                        Selecciona al menos un capítulo para empezar.
                    </p>
                )}
            </section>

            {/* Cantidad de preguntas */}
            <section className="setup__section" aria-labelledby="setup-amount">
                <div className="setup__section-head">
                    <span className="setup__step">Paso 4</span>
                    <h2 id="setup-amount" className="setup__section-title">Cuántas preguntas</h2>
                </div>

                <div className="setup__amount">
                    <input
                        id="setup-amount-input"
                        type="number"
                        inputMode="numeric"
                        className={`setup__amount-input ${!amountValid ? 'is-invalid' : ''}`}
                        value={amount}
                        min={min}
                        max={max}
                        onChange={(event) => setAmount(event.target.value)}
                        onBlur={normalizeAmount}
                        disabled={max === 0}
                        aria-describedby="setup-amount-help"
                        aria-invalid={!amountValid}
                    />

                    <div className="setup__amount-info">
                        <p id="setup-amount-help" className="setup__amount-help">
                            {max === 0
                                ? 'Elige capítulos para habilitar este campo.'
                                : min === max
                                  ? `Los capítulos elegidos solo dan para ${max} ${
                                        max === 1 ? 'pregunta' : 'preguntas'
                                    }.`
                                  : `Entre ${min} y ${max} preguntas, según las ${max} disponibles en este nivel.`}
                        </p>

                        {max > 0 && (
                            <div className="setup__amount-presets">
                                {[10, 20, 30].map(
                                    (preset) =>
                                        preset >= min &&
                                        preset <= max && (
                                            <button
                                                key={preset}
                                                type="button"
                                                className={`setup__preset ${
                                                    parsedAmount === preset ? 'is-active' : ''
                                                }`}
                                                onClick={() => setAmount(String(preset))}
                                            >
                                                {preset}
                                            </button>
                                        )
                                )}
                                <button
                                    type="button"
                                    className={`setup__preset ${parsedAmount === max ? 'is-active' : ''}`}
                                    onClick={() => setAmount(String(max))}
                                >
                                    Todas
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {max > 0 && !amountValid && (
                    <p className="setup__warning" role="alert">
                        Escribe un número entero entre {min} y {max}.
                    </p>
                )}
            </section>

            {/* Resumen */}
            <footer className="setup__footer">
                <p className="setup__summary">
                    <strong>{amountValid ? parsedAmount : '—'}</strong> preguntas · nivel{' '}
                    <strong>{JUAN_LEVELS.find((option) => option.id === level).label.toLowerCase()}</strong> ·{' '}
                    {timeLabel(time)} · {selectedChapters.length} capítulos
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
