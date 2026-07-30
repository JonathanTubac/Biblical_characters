export const BOOK_LABELS = {
    genesis: 'Génesis',
    exodo: 'Éxodo',
    numeros: 'Números',
    josue: 'Josué',
    jueces: 'Jueces',
    rut: 'Rut',
}

export const BOOK_SUMMARIES = {
    genesis: 'Los orígenes del mundo, los patriarcas y las promesas.',
    exodo: 'La salida de Egipto y la ley entregada en el Sinaí.',
    numeros: 'El pueblo de Israel en el desierto camino a Canaán.',
    josue: 'La conquista y el reparto de la tierra prometida.',
    jueces: 'Líderes levantados por Dios en tiempos de caos.',
    rut: 'Lealtad y redención en tiempos de cosecha.',
}

export const LEVELS = [
    {
        id: 'facil',
        label: 'Fácil',
        desc: 'Pistas directas: escenas y datos que casi todos reconocen.',
    },
    {
        id: 'intermedio',
        label: 'Intermedio',
        desc: 'Pistas con más contexto; hay que conocer bien el relato.',
    },
    {
        id: 'dificil',
        label: 'Difícil',
        desc: 'Detalles finos para quienes dominan el texto bíblico.',
    },
]

export const bookLabel = (key) => BOOK_LABELS[key] ?? key
export const bookSummary = (key) => BOOK_SUMMARIES[key] ?? ''
