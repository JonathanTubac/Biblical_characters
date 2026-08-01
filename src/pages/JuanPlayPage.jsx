import { useState } from 'react'
import JuanSetup from '../components/JuanSetup'
import JuanRound from '../components/JuanRound'
import juanQuestions from '../data/juan_questions'
import './Page.css'

export default function JuanPlayPage({ onBack }) {
    const [config, setConfig] = useState(null)
    // Cambiar la clave remonta la ronda y vuelve a barajar el mazo
    const [round, setRound] = useState(0)

    const start = (nextConfig) => {
        setConfig(nextConfig)
        setRound((value) => value + 1)
    }

    if (!config) {
        return <JuanSetup questions={juanQuestions} onStart={start} onBack={onBack} />
    }

    return (
        <JuanRound
            key={round}
            questions={juanQuestions}
            config={config}
            onRestart={() => setRound((value) => value + 1)}
            onReconfigure={() => setConfig(null)}
            onExit={onBack}
        />
    )
}
