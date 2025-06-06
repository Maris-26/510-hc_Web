# Cocktail Curator 🍸  
**TECHIN 510 B Sp 25: Programming For Digital And Physical User Interfaces**

A modern web application for discovering, exploring, and managing your favorite cocktails. Built with React and TheCocktailDB API.

## Features

### Core Features
- **Browse Cocktails**: View a grid of cocktails with smooth animations and responsive design
- **Search & Filter**: Find cocktails by name, category, or type
- **Random Cocktail**: Get a random cocktail suggestion
- **Detailed View**: See complete cocktail information including ingredients and instructions
- **Collections**: Save your favorite cocktails (requires login)
- **Recommendation System**: Get personalized cocktail recommendations based on your preferences

### User Features
- **User Authentication**: Register and login to access personal features
- **Favorites**: Like and save your favorite cocktails
- **Collections View**: Access all your saved cocktails in one place

### UI/UX Features
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Automatic dark mode support
- **Smooth Animations**: Rolling text for long cocktail names
- **Infinite Scroll**: Load more cocktails as you scroll
- **Modern Interface**: Clean and intuitive user interface

## Quick Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
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

The application will open automatically in your browser at `http://localhost:3000`.

## Project Structure
```
cocktail-curator/
├── src/
│   ├── components/     # React components
│   │   ├── Auth/      # Authentication components
│   │   ├── Profile/   # User profile components
│   │   └── ...
│   ├── context/       # React context providers
│   ├── styles/        # CSS styles
│   ├── App.js         # Main application component
│   └── App.css        # Main styles
├── public/            # Static files
├── package.json       # Project configuration
└── README.md         # Documentation
```

## Usage Guide

### Browsing Cocktails
1. **All Cocktails**: View the main grid of cocktails
2. **Filter**: Use the search bar and filters to find specific cocktails
3. **Random**: Get a random cocktail suggestion
4. **Collections**: View your saved cocktails (requires login)

### Managing Favorites
1. Click the heart icon on any cocktail to add/remove from favorites
2. Login required to save favorites
3. Access all favorites in the Collections view

### Getting Recommendations
1. Click the "Recommendation" button
2. Answer a few questions about your preferences
3. Get personalized cocktail suggestions

## API Integration
The application uses TheCocktailDB API:
- Random cocktails: `/random.php`
- Search by name: `/search.php?s={name}`
- Filter by category: `/filter.php?c={category}`
- Filter by ingredient: `/filter.php?i={ingredient}`

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
- React team for the amazing framework
- All contributors who have helped improve this project

## Current Progress

- [x] Basic project structure setup
- [x] Backend API implementation
- [x] Frontend React application
- [x] Cocktail search functionality
- [x] Detailed cocktail view
- [x] User authentication
- [x] Favorite cocktails feature
- [x] Advanced filtering options

## API Endpoints

- `GET /api/cocktails/random` - Get a random cocktail
- `GET /api/cocktails/search?name={name}` - Search cocktails by name
- `GET /api/cocktails/{id}` - Get cocktail details by ID
- `GET /api/cocktails/ingredient/{ingredient}` - Filter by ingredient
- `GET /api/cocktails/category/{category}` - Filter by category

## Features
- Cocktail search and discovery
- User authentication
- Favorite cocktails management
- Data visualization dashboard
- Machine learning recommendations

---

## 1. Project Objectives

- **Collect and organize DIY cocktail recipes** from publicly available online sources into a structured, searchable format.  
- **Develop a responsive web interface** that allows users to search, filter, and view cocktail recipes based on ingredients, alcohol type, or flavor profile.  
- **Implement a feature for users to input available ingredients** and receive matching cocktail suggestions.

---

## 2. Target Users and Their Needs

- **Home cocktail enthusiasts** – Need simple, easy-to-follow recipes to make drinks with ingredients they already have.  
- **Beginner mixology learners** – Need guided instructions, visual clarity, and drink ideas for building their skills.  
- **Casual users hosting social events** – Need quick suggestions for popular or themed cocktails that fit their available ingredients and occasion.

---

## 3. Key Deliverables

- **Curated cocktail recipe dataset** – A structured collection of at least 100 cocktail recipes sourced from public websites.  
- **Searchable and filterable web interface** – A responsive browser application that allows users to explore recipes by ingredients, alcohol type, or flavor.  
- **Ingredient-matching recommendation feature** – A tool that suggests recipes based on user-input available ingredients.

---

## 4. Special Constraints (e.g., Regulatory Compliance)

- Recipes and images will only be collected from publicly available sources that allow reuse or will be clearly cited.  
- The site will focus on recipe discovery and will avoid promoting alcohol consumption, in line with student project and institutional guidelines.

---

## 5. Expected Outcome

- The final system will enable users to discover, filter, and learn how to make cocktails based on their preferences or available ingredients, with a focus on usability and interface quality.


## API
This application uses [TheCocktailDB API](https://www.thecocktaildb.com/api.php) for cocktail data.


## Another Version in the Branch Full


## License
MIT

