# Cocktail Curator 🍸  
**TECHIN 510 B Sp 25: Programming For Digital And Physical User Interfaces**

A full-stack application for managing and discovering cocktails, built with MERN stack and Streamlit.

## Project Structure

```
cocktail-curator/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── services/         # API services
│   ├── server.js         # Main server file
│   └── requirements.txt  # Backend dependencies
└── README.md             # Project documentation
```

## Requirements

### Backend (Node.js)
- Node.js >= 14.0.0
- MongoDB >= 4.4
- Dependencies listed in `server/package.json`

### Frontend (React)
- Node.js >= 14.0.0
- Dependencies listed in `client/package.json`

### Streamlit Dashboard
- Python >= 3.8
- Dependencies listed in `streamlit/requirements.txt`

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cocktail-curator
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Running the Application

1. Start the backend server (in server directory):
   ```bash
   npm run dev
   ```

2. Start the frontend (in client directory):
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

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

## API Documentation
The backend API documentation is available at `http://localhost:5000/api-docs` when the server is running.

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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

