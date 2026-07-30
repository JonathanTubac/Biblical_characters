import { useEffect, useState } from 'react'
import { LEVELS, bookLabel, bookSummary } from '../data/books'
import './BookModal.css'

export default function BookModal({ book, characters, onClose }) {
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key !== 'Escape') return
            // Escape cierra primero el detalle del personaje, luego el modal
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
        <div className="modal" role="dialog" aria-modal="true" aria-label={bookLabel(book)}>
            <div className="modal__backdrop" onClick={onClose} />

            <article className="modal__panel">
                <button type="button" className="modal__close" onClick={onClose} aria-label="Cerrar">
                    ×
                </button>

                {selected ? (
                    <>
                        <button type="button" className="modal__back" onClick={() => setSelected(null)}>
                            ← {bookLabel(book)}
                        </button>

                        <header className="modal__header">
                            <h2 className="modal__name">{selected.personaje}</h2>
                            <p className="modal__desc">{selected.desc}</p>
                        </header>

                        <div className="modal__levels">
                            {LEVELS.map((level) => (
                                <section key={level.id} className={`modal__level modal__level--${level.id}`}>
                                    <h3 className="modal__level-title">
                                        <span className="modal__dot" aria-hidden="true" />
                                        {level.label}
                                    </h3>
                                    <ul className="modal__hints">
                                        {selected.pistas[level.id].map((hint) => (
                                            <li key={hint}>{hint}</li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <header className="modal__header">
                            <span className="modal__tag">{characters.length} personajes</span>
                            <h2 className="modal__title">{bookLabel(book)}</h2>
                            <p className="modal__desc">{bookSummary(book)}</p>
                        </header>

                        <ul className="modal__list">
                            {characters.map((character) => (
                                <li key={character.personaje}>
                                    <button
                                        type="button"
                                        className="modal__item"
                                        onClick={() => setSelected(character)}
                                    >
                                        <span className="modal__initial" aria-hidden="true">
                                            {character.personaje.charAt(0)}
                                        </span>
                                        <span className="modal__item-body">
                                            <span className="modal__item-name">{character.personaje}</span>
                                            <span className="modal__item-desc">{character.desc}</span>
                                        </span>
                                        <svg className="modal__arrow" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="m9 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </article>
        </div>
    )
}
