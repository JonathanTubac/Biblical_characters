import { useState } from 'react'
import BookModal from '../components/BookModal'
import { bookLabel, bookSummary } from '../data/books'
import './Page.css'
import './LearnPage.css'

export default function LearnPage({ books, onBack }) {
    const [activeBook, setActiveBook] = useState(null)

    const bookKeys = Object.keys(books)
    const total = bookKeys.reduce((count, book) => count + books[book].length, 0)

    return (
        <main className="page learn">
            <header className="learn__header">
                <button type="button" className="page__back" onClick={onBack}>
                    ← Menú
                </button>
                <h1 className="page__title">Explora las Escrituras</h1>
                <p className="page__note">
                    {total} personajes repartidos en {bookKeys.length} libros. Abre un libro para
                    conocer a sus protagonistas.
                </p>
            </header>

            <ul className="learn__grid">
                {bookKeys.map((book, index) => (
                    <li key={book}>
                        <button type="button" className="learn__book" onClick={() => setActiveBook(book)}>
                            <span className="learn__index" aria-hidden="true">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="learn__book-name">{bookLabel(book)}</span>
                            <span className="learn__book-desc">{bookSummary(book)}</span>
                            <span className="learn__book-footer">
                                <span className="learn__count">{books[book].length} personajes</span>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M4 12h15M13 6l6 6-6 6" />
                                </svg>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {activeBook && (
                <BookModal
                    key={activeBook}
                    book={activeBook}
                    characters={books[activeBook]}
                    onClose={() => setActiveBook(null)}
                />
            )}
        </main>
    )
}
