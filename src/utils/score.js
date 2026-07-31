export function scoreMessage(ratio) {
    if (ratio === 1) return '¡Perfecto! Te sabes el texto de memoria.'
    if (ratio >= 0.7) return 'Muy bien, dominas la mayoría de las respuestas.'
    if (ratio >= 0.4) return 'Vas por buen camino, repasa un poco más.'
    return 'Toca repasar un poco más y volver a intentarlo.'
}
