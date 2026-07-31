import { JUAN_LEVELS, timeLabel } from '../data/game'
import { scoreMessage } from '../utils/score'
import './Game.css'

export default function JuanResults({ results, config, onRestart, onReconfigure, onExit }) {
    const total = results.length
    const correct = results.filter((result) => result.correct).length
    const missed = results.filter((result) => !result.correct)
    const ratio = total > 0 ? correct / total : 0
    const level = JUAN_LEVELS.find((option) => option.id === config.level)

    return (
        <main className="page results">
            <header className="results__header">
                <span className="results__tag">Partida terminada</span>
                <h1 className="results__score">
                    {correct}
                    <span>/ {total}</span>
                </h1>
                <p className="results__message">{scoreMessage(ratio)}</p>
                <p className="results__config">
                    Nivel {level.label.toLowerCase()} · {timeLabel(config.time)} · {config.capitulos.length}{' '}
                    capítulos
                </p>
            </header>

            <div className="results__meter" role="img" aria-label={`${Math.round(ratio * 100)}% de aciertos`}>
                <div className="results__meter-fill" style={{ width: `${ratio * 100}%` }} />
            </div>

            {missed.length > 0 && (
                <section className="results__missed">
                    <h2 className="results__missed-title">Para repasar</h2>
                    <ul>
                        {missed.map((result, position) => (
                            <li key={`${result.referencia}-${position}`}>
                                <span className="results__missed-name">{result.respuesta}</span>
                                <span className="results__missed-book">{result.referencia}</span>
                                {result.timedOut && <span className="results__missed-flag">sin tiempo</span>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <footer className="results__actions">
                <button type="button" className="results__primary" onClick={onRestart}>
                    Jugar otra vez
                </button>
                <button type="button" className="results__ghost" onClick={onReconfigure}>
                    Cambiar configuración
                </button>
                <button type="button" className="results__ghost" onClick={onExit}>
                    Menú
                </button>
            </footer>
        </main>
    )
}
