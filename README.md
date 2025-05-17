# Cocktail Curator 🍸  
**TECHIN 510 B Sp 25: Programming For Digital And Physical User Interfaces**

> **Important**: Before starting, please add your OpenAI API key to the `.env` file:
> ```
> OPENAI_API_KEY=your_api_key_here
> ```

A modern web application for exploring and discovering cocktails. Built with React and TypeScript, featuring a beautiful masonry grid layout and interactive cocktail details.

## Features

- **Random Cocktail Discovery**: Browse through a collection of random cocktails
- **Search Functionality**: Find specific cocktails by name
- **Responsive Design**: Beautiful masonry grid layout that works on all devices
- **Interactive Details**: View detailed information about each cocktail including ingredients and instructions
- **Random Cocktail Feature**: Get a random cocktail suggestion with one click
- **Marquee Text**: Long cocktail names are displayed with a smooth scrolling effect
- **Back to Top**: Easy navigation with a floating back-to-top button
- **Smart Recommendations**: Get personalized cocktail suggestions based on your preferences and available ingredients
- **Ingredient Matching**: Find cocktails you can make with ingredients you have on hand
- **Category Filtering**: Browse cocktails by type, alcohol content, or occasion

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Maris-26/510-hc_Web.git
cd 510-hc_Web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Browsing Cocktails
- The app starts with a grid of random cocktails
- Use the "Load More" button to fetch additional random cocktails
- Click on any cocktail card to view its details

### Searching
- Use the search bar at the top to find specific cocktails
- Enter the cocktail name and press Enter or click Search
- Results will be displayed in the same grid layout

### Viewing Details
- Click on any cocktail card to view its full details
- Details include:
  - Cocktail name
  - Image
  - Complete list of ingredients with measurements
  - Preparation instructions
- Use the "Back to Grid" button to return to the main view

### Random Cocktail
- Click the "Random Cocktail" button to get a random cocktail suggestion
- The app will display a random cocktail from the current collection

## Technologies Used

- React
- TypeScript
- React Masonry CSS
- Axios for API calls
- TheCocktailDB API

## API Reference

This application uses [TheCocktailDB API](https://www.thecocktaildb.com/api.php) for cocktail data.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TheCocktailDB for providing the cocktail data API
- React Masonry CSS for the grid layout
- All contributors who have helped improve this project

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

## Current Progress

- [x] Basic project structure setup
- [x] Backend API implementation
- [x] Frontend React application
- [x] Cocktail search functionality
- [x] Detailed cocktail view
- [x] Main page with interactions
   - Shows a Pinterest-style infinite scroll grid of random cocktails on load.  
   - Rolls the title if it is over length.
   - Shows all matches in a grid when searching.
   - The "Random Cocktail" button shows a single random cocktail detail from the current grid (random or search).
   - The "Back to Grid" button returns to the previous grid and re-enables infinite scroll if in random mode.
- [x] Smart recommendations system
- [x] User authentication
- [ ] Advanced filtering options

## API Endpoints

- `GET /api/cocktails/random` - Get a random cocktail
- `GET /api/cocktails/search?name={name}` - Search cocktails by name
- `GET /api/cocktails/{id}` - Get cocktail details by ID
- `GET /api/cocktails/ingredient/{ingredient}` - Filter by ingredient
- `GET /api/cocktails/category/{category}` - Filter by category

## Project Objectives

- **Collect and organize DIY cocktail recipes** from publicly available online sources into a structured, searchable format.  
- **Develop a responsive web interface** that allows users to search, filter, and view cocktail recipes based on ingredients, alcohol type, or flavor profile.  
- **Implement a feature for users to input available ingredients** and receive matching cocktail suggestions.

## Target Users

- **Home cocktail enthusiasts** – Need simple, easy-to-follow recipes to make drinks with ingredients they already have.  
- **Beginner mixology learners** – Need guided instructions, visual clarity, and drink ideas for building their skills.  
- **Casual users hosting social events** – Need quick suggestions for popular or themed cocktails that fit their available ingredients and occasion.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TheCocktailDB for providing the cocktail data API
- React Masonry CSS for the grid layout
- All contributors who have helped improve this project

