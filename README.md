# Alias

Simple realisation of Alias game.

## Run locally

Open `index.html` in a modern browser. The game works completely offline thanks to the built-in service worker.

To manage the words list, visit `admin.html` (default password: `admin`). Words are stored in the browser using IndexedDB and persist between sessions. On first launch the database is populated from `words.json`.

## Deploy

All files can be hosted directly on GitHub Pages or any static file server. No backend is required.
