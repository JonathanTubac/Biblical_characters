import { useState } from "react"
import Menu from "./components/Menu"
import LearnPage from "./pages/LearnPage"
import PlayPage from "./pages/PlayPage"
import characters from "./data/characters"

const bookNames = Object.keys(characters)
const stats = {
  books: bookNames.length,
  characters: bookNames.reduce((total, book) => total + characters[book].length, 0),
}

function App() {
  const [view, setView] = useState("menu")
  const goToMenu = () => setView("menu")

  switch (view) {
    case "play":
      return <PlayPage books={characters} onBack={goToMenu} />
    case "learn":
      return <LearnPage books={characters} onBack={goToMenu} />
    default:
      return <Menu onSelect={setView} stats={stats} />
  }
}

export default App
