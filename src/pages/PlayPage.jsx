import { useState } from 'react'
import GameSetup from '../components/GameSetup'
import GameRound from '../components/GameRound'
import './Page.css'

export default function PlayPage({ books, onBack }) {
    const [config, setConfig] = useState(null)
    // Cambiar la clave remonta la ronda y vuelve a barajar el mazo
    const [round, setRound] = useState(0)

    const start = (nextConfig) => {
        setConfig(nextConfig)
        setRound((value) => value + 1)
    }

    if (!config) {
        return <GameSetup books={books} onStart={start} onBack={onBack} />
    }

    return (
        <GameRound
            key={round}
            books={books}
            config={config}
            onRestart={() => setRound((value) => value + 1)}
            onReconfigure={() => setConfig(null)}
            onExit={onBack}
        />
    )
}
