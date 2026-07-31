import '../pages/Page.css'
import './Menu.css'

/**
 * Componente genérico de menú en tarjetas, reutilizado tanto para el menú
 * principal como para los submenús de cada sección (personajes, Juan, etc.).
 */
export default function Menu({ eyebrow, title, titleAccent, tagline, options, stats, onSelect, onBack }) {
    return (
        <main id="menu" className="menu">
            <div className="menu__aura" aria-hidden="true" />

            {onBack && (
                <button type="button" className="page__back menu__back" onClick={onBack}>
                    ← Menú
                </button>
            )}

            <header className="menu__header">
                <p className="menu__eyebrow">{eyebrow}</p>
                <h1 className="menu__title">
                    {title}
                    {titleAccent && <span className="menu__title-accent">{titleAccent}</span>}
                </h1>
                <div className="menu__rule" aria-hidden="true">
                    <span />
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9z" />
                    </svg>
                    <span />
                </div>
                <p className="menu__tagline">{tagline}</p>
            </header>

            <nav className="menu__options" aria-label="Opciones">
                {options.map((option) => (
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
                    {stats.map((stat) => (
                        <div className="menu__stat" key={stat.label}>
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </footer>
            )}
        </main>
    )
}
