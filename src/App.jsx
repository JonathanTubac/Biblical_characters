import { useState } from "react"
import Menu from "./components/Menu"
import LearnPage from "./pages/LearnPage"
import characters from "./data/characters"

const books = Object.keys(characters)
const stats = {
  books: books.length,
  characters: books.reduce((total, book) => total + characters[book].length, 0),
}

function App() {
  const [view, setView] = useState("menu")

  if (view === "learn") {
    return <LearnPage books={characters} onBack={() => setView("menu")} />
  }

  return <Menu onSelect={setView} stats={stats} />
}

export default App
