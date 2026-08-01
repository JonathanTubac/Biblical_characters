import { useEffect, useState } from 'react'
import { JUAN_LEVELS } from '../data/game'
import { juanChapterDetail } from '../data/juan_chapters'
import './BookModal.css'
import './JuanChapterModal.css'

export default function JuanChapterModal({ chapter, questions, onClose }) {
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key !== 'Escape') return
            // Escape cierra primero el detalle de la pregunta, luego el modal
            if (selected) setSelected(null)
            else onClose()
        }

        document.addEventListener('keydown', onKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
        }
    }, [selected, onClose])

    return (
        <div className="modal modal--juan" role="dialog" aria-modal="true" aria-label={`Capítulo ${chapter}`}>
            <div className="modal__backdrop" onClick={onClose} />

            <article className="modal__panel">
                <button type="button" className="modal__close" onClick={onClose} aria-label="Cerrar">
                    ×
                </button>

                {selected ? (
                    <>
                        <button type="button" className="modal__back" onClick={() => setSelected(null)}>
                            ← Capítulo {chapter}
                        </button>

                        <header className="modal__header">
                            <span className="modal__tag">{selected.referencia}</span>
                            <h2 className="modal__name">{selected.pregunta}</h2>
                        </header>

                        <div className="modal__levels">
                            <section className={`modal__level modal__level--${selected.dificultad}`}>
                                <h3 className="modal__level-title">
                                    <span className="modal__dot" aria-hidden="true" />
                                    Respuesta
                                </h3>
                                <p className="modal__desc">{selected.respuesta}</p>
                            </section>
                        </div>

                        <p className="modal__desc" style={{ marginTop: '1.2rem' }}>
                            {selected.explicacion}
                        </p>
                    </>
                ) : (
                    <>
                        <header className="modal__header">
                            <span className="modal__tag">{questions.length} preguntas</span>
                            <h2 className="modal__title">Capítulo {chapter}</h2>
                            <p className="modal__desc">{juanChapterDetail(chapter)}</p>
                        </header>

                        <div className="modal__levels">
                            {JUAN_LEVELS.map((level) => {
                                const items = questions.filter((question) => question.dificultad === level.id)
                                if (items.length === 0) return null

                                return (
                                    <section key={level.id} className={`modal__level modal__level--${level.id}`}>
                                        <h3 className="modal__level-title">
                                            <span className="modal__dot" aria-hidden="true" />
                                            {level.label}
                                        </h3>
                                        <ul className="modal__list">
                                            {items.map((question) => (
                                                <li key={question.id}>
                                                    <button
                                                        type="button"
                                                        className="modal__item"
                                                        onClick={() => setSelected(question)}
                                                    >
                                                        <span className="modal__initial" aria-hidden="true">
                                                            {level.label.charAt(0)}
                                                        </span>
                                                        <span className="modal__item-body">
                                                            <span className="modal__item-name">{question.pregunta}</span>
                                                            <span className="modal__item-desc">{question.referencia}</span>
                                                        </span>
                                                        <svg className="modal__arrow" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path d="m9 5 7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )
                            })}
                        </div>
                    </>
                )}
            </article>
        </div>
    )
}
