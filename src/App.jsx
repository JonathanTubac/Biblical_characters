import { useState } from "react"
import MainMenu from "./components/MainMenu"
import PersonajesMenu from "./components/PersonajesMenu"
import LearnPage from "./pages/LearnPage"
import PlayPage from "./pages/PlayPage"
import JuanPage from "./pages/JuanPage"
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
  const goToMain = () => setView("main")
  const goToPersonajes = () => setView("personajes")

  switch (view) {
    case "play":
      return <PlayPage books={characters} onBack={goToPersonajes} />
    case "learn":
      return <LearnPage books={characters} onBack={goToPersonajes} />
    case "personajes":
      return <PersonajesMenu onSelect={setView} onBack={goToMain} stats={stats} />
    case "juan":
      return <JuanPage onBack={goToMain} />
    default:
      return <MainMenu onSelect={setView} stats={stats} />
  }
}

export default App
