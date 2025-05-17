# Cocktail Curator 🍸  
**TECHIN 510 B Sp 25: Programming For Digital And Physical User Interfaces**

> **Important**: Before starting, please add your OpenAI API key to the `components/RecommendationFeature.tsx` file:
> ```
> // line 20
> apiKey: process.env.REACT_APP_OPENAI_API_KEY
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


## Project Structure
```
cocktail-curator/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ...             # Component files
│   │
│   ├── pages/              # Page components
│   │   └── ...             # Page files
│   │
│   ├── api/                # API integration
│   │   └── ...             # API related files
│   │
│   ├── server/             # Server-side code
│   │   └── ...             # Server implementation
│   │
│   ├── App.ts              # Main application component
│   ├── App.css             # Main application styles
│   ├── MarqueeText.js      # Scrolling text component
│   └── index.js            # Application entry point
│
├── public/                 # Static files
│   └── ...                 # Public assets
│
├── node_modules/           # Dependencies
├── .git/                   # Git repository
├── .gitignore             # Git ignore rules
├── package.json           # Project configuration
├── package-lock.json      # Dependency lock file
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Current Progress

- [x] Basic project structure setup
- [x] Backend API implementation
- [x] Frontend React application
- [x] Cocktail search functionality
- [x] Detailed cocktail view
- [x] Recommendation system
- [ ] User authentication
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

