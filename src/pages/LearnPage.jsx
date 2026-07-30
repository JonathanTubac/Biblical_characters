import './Page.css'

export default function LearnPage({ books, onBack }) {
    return (
        <main className="page">
            <button type="button" className="page__back" onClick={onBack}>
                ← Menú
            </button>
            <h1 className="page__title">Explora las Escrituras</h1>
            <p className="page__note">
                {Object.keys(books ?? {}).length} libros disponibles.
            </p>
        </main>
    )
}
