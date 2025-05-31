# Cocktail Curator 🍸  
**TECHIN 510 B Sp 25: Programming For Digital And Physical User Interfaces**

A full-stack application for managing and discovering cocktails, built with MERN stack and Streamlit.

## Quick Setup

### Step-by-Step Setup
1. Clone the repository:
```bash
git clone https://github.com/Maris-26/510-hc_Web.git
cd 510-hc_Web
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


## Current Progress

- [x] Basic project structure setup
- [x] Backend API implementation
- [x] Frontend React application
- [x] Cocktail search functionality
- [x] Detailed cocktail view
- [ ] User authentication
- [ ] Favorite cocktails feature
- [ ] Advanced filtering options

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

