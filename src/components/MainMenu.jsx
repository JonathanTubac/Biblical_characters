import Menu from './Menu'

const OPTIONS = [
    {
        id: 'personajes',
        label: 'Personajes',
        title: 'Personajes Bíblicos',
        desc: 'Adivina quién es cada personaje o recorre los libros para conocer su historia.',
        tag: 'Antiguo y Nuevo Testamento',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8.2" r="3.4" />
                <path d="M5 20c1-4 3.4-6.2 7-6.2s6 2.2 7 6.2" />
            </svg>
        ),
    },
    {
        id: 'juan',
        label: 'Juan',
        title: 'Evangelio de Juan',
        desc: 'Ponte a prueba con preguntas sobre la vida y las palabras de Jesús según Juan.',
        tag: 'Modo trivia',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3.5h9.5A2.5 2.5 0 0 1 18 6v14.5H8.5A2.5 2.5 0 0 1 6 18z" />
                <path d="M6 18a2.5 2.5 0 0 1 2.5-2.5H18" />
                <path d="M9 8h6M9 11.2h6" />
            </svg>
        ),
    },
]

export default function MainMenu({ onSelect, stats }) {
    return (
        <Menu
            eyebrow="Antiguo y Nuevo Testamento"
            title="La Biblia"
            titleAccent="en Juego"
            tagline="Dos formas de recorrer la Escritura: adivina personajes o pon a prueba lo que sabes del evangelio de Juan."
            options={OPTIONS}
            onSelect={onSelect}
            stats={
                stats && [
                    { value: stats.characters, label: 'Personajes' },
                    { value: stats.books, label: 'Libros' },
                    { value: stats.juanQuestions, label: 'Preguntas de Juan' },
                ]
            }
        />
    )
}
