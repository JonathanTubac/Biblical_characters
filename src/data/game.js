export const TIME_OPTIONS = [
    { value: 15, label: '15s', desc: 'Contrarreloj' },
    { value: 30, label: '30s', desc: 'Ritmo ágil' },
    { value: 45, label: '45s', desc: 'Con calma' },
    { value: 60, label: '60s', desc: 'Sin prisa' },
    { value: 0, label: '∞', desc: 'Sin límite' },
]

export const MIN_QUESTIONS = 3

export const DEFAULT_CONFIG = {
    level: 'intermedio',
    time: 30,
    books: [],
    amount: 10,
}

export const timeLabel = (value) =>
    value === 0 ? 'sin límite de tiempo' : `${value} segundos por pregunta`

export const JUAN_LEVELS = [
    {
        id: 'facil',
        label: 'Fácil',
        desc: 'Preguntas directas sobre los pasajes más conocidos.',
    },
    {
        id: 'intermedio',
        label: 'Intermedio',
        desc: 'Hace falta conocer bien el relato y sus detalles.',
    },
    {
        id: 'dificil',
        label: 'Difícil',
        desc: 'Detalles finos para quienes dominan el texto del evangelio.',
    },
]

export const DEFAULT_JUAN_CONFIG = {
    level: 'intermedio',
    time: 30,
    capitulos: [],
    amount: 10,
}
