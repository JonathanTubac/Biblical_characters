import './Page.css'

export default function PlayPage({ books, onBack }) {
    return (
        <main className="page">
            <button type="button" className="page__back" onClick={onBack}>
                ← Menú
            </button>
            <h1 className="page__title">Adivina el personaje</h1>
            <p className="page__note">Modo de juego en construcción.</p>
        </main>
    )
}
