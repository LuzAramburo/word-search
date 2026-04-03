# Word Soup

## Overview

Word Soup is a word search game built with React, TypeScript, and Vite. Word Soup challenges players to find words hidden within a grid of letters. It offers a fun and engaging experience suitable for players of all ages.

## Features

- **Three Levels of Difficulty:** Choose from easy, medium, or hard difficulty levels.
- **Randomized Word Grid:** Each game generates a unique grid of letters and allows players to select a subject for word themes.
- **Multiplayer/Tournament Mode:** Compete against other players in real-time tournaments.
- **Firebase Integration:** Utilizes Firebase Auth for user authentication and Firestore for storing game data.

## Technologies Used

- **Frontend:** React, TypeScript, Vite
- **Backend:** Firebase (Auth, Firestore Database)

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/word-soup.git`
2. Navigate to the project directory: `cd word-soup`
3. Copy `.env.example` to `.env` and fill in your Firebase credentials
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

### Docker

You can also run the project with Docker Compose:

```bash
# Development — hot reload on localhost:5173
docker compose up dev

# Local production simulation — nginx on localhost:8080
docker compose up prod
```

> The `prod` service builds the static bundle and serves it with nginx. This is for local testing only — the project is deployed to Netlify via GitHub.

## Contributing

Contributions are welcome! Please follow these guidelines when contributing to the project:

- Fork the repository and create your branch from `main`.
- Open a pull request describing the changes made.
- Ensure the code adheres to the project's coding standards.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/LuzAramburo/word-search/blob/master/LICENSE) file for details.

## Acknowledgments

- Inspired by classic word search puzzles book I got in Walmart.
- Built with 💙 by [Luz Aramburo](https://github.com/LuzAramburo)

# Roadmap
https://trello.com/b/MYcA2WEJ/word-soup
