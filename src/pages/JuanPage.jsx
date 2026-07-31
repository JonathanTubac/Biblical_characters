import juanQuestions from '../data/juan_questions'
import './Page.css'

export default function JuanPage({ onBack }) {
    const chapterCount = new Set(juanQuestions.map((question) => question.capitulo)).size

    return (
        <main className="page">
            <button type="button" className="page__back" onClick={onBack}>
                ← Menú
            </button>
            <h1 className="page__title">Evangelio de Juan</h1>
            <p className="page__note">
                Ya tenemos {juanQuestions.length} preguntas listas repartidas en {chapterCount}{' '}
                capítulos. El modo de juego para ponerlas a prueba está en camino.
            </p>
        </main>
    )
}
