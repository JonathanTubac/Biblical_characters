# Personajes Bíblicos

A React + Vite web app for learning and testing your knowledge of biblical
characters. It ships with **232 characters across 39 books** of the Old and New
Testament, each one with a full description and three sets of hints ordered by
difficulty.

> The app interface and all character data are in **Spanish**. This README is in
> English.

## Modes

### Aprender (Learn)

A grid of the 39 books, each with a short summary and its character count.
Opening a book shows its characters; picking one reveals the long description
plus all three hint sets (easy / intermediate / hard) side by side. Hovering or
focusing a book plays a random page-flip sound.

### Jugar (Play)

A multiple-choice quiz — "¿Quién soy?" — with a four-step setup:

1. **Difficulty** — `facil`, `intermedio` or `dificil`. Selects which of the
   three hint sets is shown for every question.
2. **Time per question** — 15s, 30s, 45s, 60s or unlimited (`∞`). Running out
   of time counts as a miss.
3. **Books** — pick any subset; the character pool and the maximum number of
   questions adjust as you toggle them.
4. **Question count** — minimum 3, capped by the characters available in the
   selected books. Presets: 10 / 20 / 30 / all.

Each question shows three hints and four answer options (the correct name plus
three distractors drawn from the whole selected pool). After answering, the app
reveals the character's description and source book. The results screen shows
the score, a completion meter, and a "Para repasar" list of every character you
missed, flagging the ones you timed out on.

## Getting started

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # eslint
```

Requires Node 18+ (Vite 8).

## Project structure

```
src/
├── App.jsx                  # view switch: menu | learn | play
├── main.jsx
├── components/
│   ├── Menu.jsx             # landing screen with mode cards and stats
│   ├── GameSetup.jsx        # difficulty, timer, books, question count
│   ├── GameRound.jsx        # question loop, countdown, scoring
│   ├── GameResults.jsx      # final score and review list
│   └── BookModal.jsx        # book → character → hints drill-down
├── pages/
│   ├── LearnPage.jsx
│   └── PlayPage.jsx
├── data/
│   ├── characters.js        # imports every book; key order = display order
│   ├── books.js             # book labels, summaries, difficulty levels
│   ├── game.js              # timer options, defaults, min questions
│   └── books/               # 39 files, one per book
└── utils/
    ├── deck.js              # shuffle + question deck builder
    └── sound.js             # cached audio playback with throttling
public/
├── sounds/                  # 8 page flips, success, fail
├── fonts/                   # self-hosted woff2
└── icons.svg, favicon.svg, icon_logo.webp
```

State lives in `useState` — there is no router and no external state library.
`App.jsx` swaps between three views, and `PlayPage` bumps a `round` key to
remount `GameRound` and reshuffle the deck.

## Adding a character

Character data lives in `src/data/books/<book>.js`, each exporting an array of
objects in this shape:

```js
{
    personaje: "Rut",
    desc: "Joven moabita casada con Mahlón, uno de los hijos de Noemí…",
    pistas: {
        facil:      ["Era moabita", "Fui leal a mi suegra", "Soy bisabuela del rey David"],
        intermedio: ["Dije 'a donde tú vayas, iré yo'", "…", "…"],
        dificil:    ["Mi primer esposo fue Mahlón, hijo de Noemí", "…", "…"],
    },
}
```

Hints are written in the first person, as if the character were speaking. All
three levels are required — the quiz reads `pistas[level]` directly and the
learn modal renders every level.

To add a whole book: create the file under `src/data/books/`, import it in
`src/data/characters.js` (position in that object determines display order), and
add its entries to `BOOK_LABELS` and `BOOK_SUMMARIES` in `src/data/books.js`.

## Stack

React 19 · Vite 8 · plain CSS (one stylesheet per component, BEM-style naming) ·
ESLint 10. No UI framework, no router, no test suite.
