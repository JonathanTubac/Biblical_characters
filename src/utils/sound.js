const PAGE_FLIPS = 8
const FLIP_THROTTLE = 140

const VOLUMES = {
    flip: 0.35,
    success: 0.5,
    fail: 0.5,
}

const cache = new Map()
let lastFlip = 0

function load(src, volume) {
    if (!cache.has(src)) {
        const audio = new Audio(src)
        audio.preload = 'auto'
        audio.volume = volume
        cache.set(src, audio)
    }

    return cache.get(src)
}

function play(src, volume) {
    const audio = load(src, volume)
    audio.currentTime = 0
    // El navegador puede bloquear la reproducción antes de la primera interacción
    audio.play().catch(() => {})
}

/** Un pasar de página al azar, con un mínimo de separación entre sonidos */
export function playPageFlip() {
    const now = Date.now()
    if (now - lastFlip < FLIP_THROTTLE) return
    lastFlip = now

    const number = Math.floor(Math.random() * PAGE_FLIPS) + 1
    play(`/sounds/page_flip_${number}.mp3`, VOLUMES.flip)
}

export const playSuccess = () => play('/sounds/success.mp3', VOLUMES.success)
export const playFail = () => play('/sounds/fail.mp3', VOLUMES.fail)
