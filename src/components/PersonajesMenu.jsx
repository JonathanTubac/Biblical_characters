import Menu from './Menu'

const OPTIONS = [
    {
        id: 'play',
        label: 'Jugar',
        title: 'Adivina el personaje',
        desc: 'Tres pistas, tres niveles. Descubre de quién se trata antes de quedarte sin intentos.',
        tag: 'Modo reto',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.6 20.4 7v10L12 21.4 3.6 17V7z" />
                <path d="M12 2.6V12l8.4 5M12 12 3.6 17" />
                <circle cx="12" cy="7.4" r="1.1" />
                <circle cx="8.1" cy="14.2" r="1.1" />
                <circle cx="15.9" cy="14.2" r="1.1" />
            </svg>
        ),
    },
    {
        id: 'learn',
        label: 'Aprender',
        title: 'Explora las Escrituras',
        desc: 'Recorre los libros y conoce la historia de cada personaje antes de ponerte a prueba.',
        tag: 'Modo libre',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4.8c2.9-1.1 5.4-1.1 8 .6 2.6-1.7 5.1-1.7 8-.6v13.4c-2.9-1.1-5.4-1.1-8 .6-2.6-1.7-5.1-1.7-8-.6z" />
                <path d="M12 5.4v13.4" />
                <path d="M6.9 9.1h2.6M14.5 9.1h2.6M6.9 12.6h2.6M14.5 12.6h2.6" />
            </svg>
        ),
    },
]

export default function PersonajesMenu({ onSelect, onBack, stats }) {
    return (
        <Menu
            eyebrow="Antiguo y Nuevo Testamento"
            title="Personajes"
            titleAccent="Bíblicos"
            tagline="Pistas, historias y personajes que marcaron la Escritura. Elige cómo quieres empezar."
            options={OPTIONS}
            onSelect={onSelect}
            onBack={onBack}
            stats={
                stats && [
                    { value: stats.books, label: 'Libros' },
                    { value: stats.characters, label: 'Personajes' },
                    { value: 3, label: 'Niveles' },
                ]
            }
        />
    )
}
