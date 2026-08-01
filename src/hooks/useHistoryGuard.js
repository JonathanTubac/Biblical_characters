import { useEffect, useRef } from 'react'

/**
 * Sincroniza un modal/panel abierto con el historial del navegador para que
 * el botón o gesto de "atrás" del celular lo cierre en vez de salir de la
 * página. `onBack` se llama cuando el cierre ocurre por esa vía.
 */
export function useHistoryGuard(isOpen, onBack) {
    const pushedRef = useRef(false)
    const onBackRef = useRef(onBack)

    useEffect(() => {
        onBackRef.current = onBack
    })

    useEffect(() => {
        const onPopState = () => {
            if (pushedRef.current) {
                pushedRef.current = false
                onBackRef.current()
            }
        }

        window.addEventListener('popstate', onPopState)
        return () => window.removeEventListener('popstate', onPopState)
    }, [])

    useEffect(() => {
        if (isOpen && !pushedRef.current) {
            window.history.pushState({ __overlay: true }, '')
            pushedRef.current = true
        } else if (!isOpen && pushedRef.current) {
            // Se cerró por otra vía (botón, click afuera, etc.): se limpia
            // la entrada que quedó pendiente en el historial.
            pushedRef.current = false
            window.history.back()
        }
    }, [isOpen])
}
