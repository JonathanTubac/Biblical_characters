import { useEffect, useState } from "react"
import MainMenu from "./components/MainMenu"
import PersonajesMenu from "./components/PersonajesMenu"
import JuanMenu from "./components/JuanMenu"
import LearnPage from "./pages/LearnPage"
import PlayPage from "./pages/PlayPage"
import JuanPlayPage from "./pages/JuanPlayPage"
import JuanLearnPage from "./pages/JuanLearnPage"
import characters from "./data/characters"
import juanQuestions from "./data/juan_questions"

const bookNames = Object.keys(characters)
const stats = {
  books: bookNames.length,
  characters: bookNames.reduce((total, book) => total + characters[book].length, 0),
  juanQuestions: juanQuestions.length,
}

function App() {
  const [view, setView] = useState("main")

  useEffect(() => {
    // Sincroniza la vista con el botón/gesto de "atrás" del navegador o del celular
    const onPopState = (event) => {
      // Las entradas de modales/paneles las maneja useHistoryGuard: aterrizar
      // en una de ellas no debe cambiar de página
      if (event.state?.__overlay) return
      setView(event.state?.view ?? "main")
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const navigate = (nextView) => {
    window.history.pushState({ view: nextView }, "")
    setView(nextView)
  }

  const goBack = () => window.history.back()

  switch (view) {
    case "play":
      return <PlayPage books={characters} onBack={goBack} />
    case "learn":
      return <LearnPage books={characters} onBack={goBack} />
    case "personajes":
      return <PersonajesMenu onSelect={navigate} onBack={goBack} stats={stats} />
    case "juan":
      return <JuanMenu onSelect={navigate} onBack={goBack} stats={stats} />
    case "juan-play":
      return <JuanPlayPage onBack={goBack} />
    case "juan-learn":
      return <JuanLearnPage onBack={goBack} />
    default:
      return <MainMenu onSelect={navigate} stats={stats} />
  }
}

export default App
