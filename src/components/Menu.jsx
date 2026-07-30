import './Menu.css'

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

export default function Menu({ onSelect, stats }) {
    return (
        <main id="menu" className="menu">
            <div className="menu__aura" aria-hidden="true" />

            <header className="menu__header">
                <p className="menu__eyebrow">Antiguo y Nuevo Testamento</p>
                <h1 className="menu__title">
                    Personajes
                    <span className="menu__title-accent">Bíblicos</span>
                </h1>
                <div className="menu__rule" aria-hidden="true">
                    <span />
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9z" />
                    </svg>
                    <span />
                </div>
                <p className="menu__tagline">
                    Pistas, historias y personajes que marcaron la Escritura. Elige cómo quieres empezar.
                </p>
            </header>

            <nav className="menu__options" aria-label="Modos de juego">
                {OPTIONS.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        className={`menu__card menu__card--${option.id}`}
                        onClick={() => onSelect?.(option.id)}
                    >
                        <span className="menu__card-tag">{option.tag}</span>
                        <span className="menu__card-icon" aria-hidden="true">
                            {option.icon}
                        </span>
                        <span className="menu__card-label">{option.label}</span>
                        <span className="menu__card-title">{option.title}</span>
                        <span className="menu__card-desc">{option.desc}</span>
                        <span className="menu__card-cta" aria-hidden="true">
                            Entrar
                            <svg viewBox="0 0 24 24">
                                <path d="M4 12h15M13 6l6 6-6 6" />
                            </svg>
                        </span>
                    </button>
                ))}
            </nav>

            {stats && (
                <footer className="menu__stats">
                    <div className="menu__stat">
                        <strong>{stats.books}</strong>
                        <span>Libros</span>
                    </div>
                    <div className="menu__stat">
                        <strong>{stats.characters}</strong>
                        <span>Personajes</span>
                    </div>
                    <div className="menu__stat">
                        <strong>3</strong>
                        <span>Niveles</span>
                    </div>
                </footer>
            )}
        </main>
    )
}
