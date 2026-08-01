import Menu from './Menu'

const OPTIONS = [
    {
        id: 'juan-play',
        label: 'Jugar',
        title: 'Preguntas del evangelio',
        desc: 'Configura dificultad, tiempo y capítulos, y pon a prueba lo que sabes.',
        tag: 'Modo trivia',
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
        id: 'juan-learn',
        label: 'Aprender',
        title: 'Repasa capítulo por capítulo',
        desc: 'Recorre los 21 capítulos y revisa cada pregunta con su respuesta y explicación.',
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

export default function JuanMenu({ onSelect, onBack, stats }) {
    return (
        <Menu
            eyebrow="Nuevo Testamento"
            title="Evangelio de"
            titleAccent="Juan"
            tagline="Elige si quieres jugar a contrarreloj o repasar las preguntas con calma, capítulo por capítulo."
            options={OPTIONS}
            onSelect={onSelect}
            onBack={onBack}
            stats={
                stats && [
                    { value: stats.juanQuestions, label: 'Preguntas' },
                    { value: 21, label: 'Capítulos' },
                    { value: 3, label: 'Niveles' },
                ]
            }
        />
    )
}
