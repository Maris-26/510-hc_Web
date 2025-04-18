# Cocktail Curator

A lightweight web application for discovering cocktail recipes, built with React and TheCocktailDB API.

## Features

- 🔍 Search cocktails by name
- 🎲 Get random cocktail suggestions
- 📱 Responsive design
- ⚡ Fast and lightweight

## Quick Setup

### One-line Setup (Windows PowerShell)
```powershell
git clone https://github.com/yourusername/cocktail-curator.git; cd cocktail-curator; npm install; npm start
```

### Step-by-Step Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/cocktail-curator.git
cd cocktail-curator
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

The application will open automatically in your browser at `http://localhost:3000`.

## Project Structure
```
cocktail-curator/
├── src/            # Source code
│   ├── App.js     # Main application component
│   └── App.css    # Styles
├── public/         # Static files
├── package.json    # Project configuration
└── README.md       # Documentation
```

## Usage

1. **Search Cocktails**
   - Type a cocktail name in the search bar
   - Press Enter or click Search
   - View the list of matching cocktails

2. **Random Cocktail**
   - Click the "Random Cocktail" button
   - Get a random cocktail suggestion

3. **View Details**
   - Click on any cocktail card
   - See ingredients and instructions
   - Click "Back to Results" to return

## API
This application uses [TheCocktailDB API](https://www.thecocktaildb.com/api.php) for cocktail data.

## License
MIT

