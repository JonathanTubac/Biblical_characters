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
