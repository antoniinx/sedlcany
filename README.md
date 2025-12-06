# Cycling Trail Quiz Game

A Next.js web application featuring a quiz game for cycling trails around a city. Explore different routes, answer questions, and earn points!

## Features

- 🚴 Three predefined cycling quiz trails
- 🗺️ Interactive Leaflet maps showing route paths
- ❓ Quiz questions with multiple choice answers
- 📊 Points tracking and completion statistics
- 📱 Responsive design for desktop and mobile
- 🎨 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/
│   ├── Map.js          # Leaflet map component
│   ├── Navbar.js       # Top navigation bar
│   ├── Quiz.js         # Quiz question component
│   └── RouteCard.js    # Trail card component
├── data/
│   └── routes.js       # Trail data and quiz questions
├── pages/
│   ├── _app.js         # App wrapper with Navbar
│   ├── index.js        # Main landing page
│   └── route/
│       └── [id].js     # Individual trail quiz page
├── styles/
│   └── globals.css     # Global styles and Tailwind imports
└── package.json
```

## Trails

1. **Historic Oak Route** - Learn about historic oak trees
2. **Riverside Elm Adventure** - Discover elm trees and wildlife
3. **Maple Leaf Challenge** - Explore maple trees and their features

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- Leaflet.js & React-Leaflet
- OpenStreetMap tiles

## License

This project is open source and available for educational purposes.


