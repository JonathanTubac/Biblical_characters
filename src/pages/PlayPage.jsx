import { useState } from 'react'
import GameSetup from '../components/GameSetup'
import { bookLabel } from '../data/books'
import { timeLabel } from '../data/game'
import './Page.css'

export default function PlayPage({ books, onBack }) {
    const [config, setConfig] = useState(null)

    if (!config) {
        return <GameSetup books={books} onStart={setConfig} onBack={onBack} />
    }

    return (
        <main className="page">
            <button type="button" className="page__back" onClick={() => setConfig(null)}>
                ← Configuración
            </button>
            <h1 className="page__title">Adivina el personaje</h1>
            <p className="page__note">
                Partida en nivel {config.level}, {timeLabel(config.time)}, sobre{' '}
                {config.books.map(bookLabel).join(', ')}.
            </p>
            <p className="page__note">La ronda de preguntas todavía está en construcción.</p>
        </main>
    )
}
