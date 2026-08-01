import { useState } from 'react'
import JuanChapterModal from '../components/JuanChapterModal'
import juanQuestions from '../data/juan_questions'
import { playPageFlip } from '../utils/sound'
import './Page.css'
import './LearnPage.css'

export default function JuanLearnPage({ onBack }) {
    const [activeChapter, setActiveChapter] = useState(null)

    const chapters = [...new Set(juanQuestions.map((question) => question.capitulo))].sort((a, b) => a - b)
    const total = juanQuestions.length

    return (
        <main className="page learn">
            <header className="learn__header">
                <button type="button" className="page__back" onClick={onBack}>
                    ← Menú
                </button>
                <h1 className="page__title">Evangelio de Juan</h1>
                <p className="page__note">
                    {total} preguntas repartidas en {chapters.length} capítulos. Abre uno para repasar
                    sus preguntas, respuestas y explicaciones.
                </p>
            </header>

            <ul className="learn__grid">
                {chapters.map((chapter) => {
                    const count = juanQuestions.filter((question) => question.capitulo === chapter).length

                    return (
                        <li key={chapter}>
                            <button
                                type="button"
                                className="learn__book"
                                onClick={() => setActiveChapter(chapter)}
                                onMouseEnter={playPageFlip}
                                onFocus={playPageFlip}
                            >
                                <span className="learn__index" aria-hidden="true">
                                    {String(chapter).padStart(2, '0')}
                                </span>
                                <span className="learn__book-name">Capítulo {chapter}</span>
                                <span className="learn__book-footer">
                                    <span className="learn__count">{count} preguntas</span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M4 12h15M13 6l6 6-6 6" />
                                    </svg>
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ul>

            {activeChapter && (
                <JuanChapterModal
                    key={activeChapter}
                    chapter={activeChapter}
                    questions={juanQuestions.filter((question) => question.capitulo === activeChapter)}
                    onClose={() => setActiveChapter(null)}
                />
            )}
        </main>
    )
}
