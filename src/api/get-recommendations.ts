import axios from 'axios';

interface UserPreferences {
  mood: string;
  occasion: string;
  taste: string;
  strength: string;
  season: string;
}

interface Recommendation {
  name: string;
  description: string;
  ingredients: string[];
  matchReason: string;
}

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const getRecommendations = async (preferences: UserPreferences): Promise<Recommendation[]> => {
  try {
    // Get random cocktails
    const response = await axios.get(`${API_URL}/random.php`);
    const cocktails = response.data.drinks;

    // Transform the cocktail data to match our recommendation format
    const recommendations: Recommendation[] = cocktails.map((cocktail: any) => {
      const ingredients: string[] = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
        }
      }

      return {
        name: cocktail.strDrink,
        description: cocktail.strInstructions,
        ingredients: ingredients,
        matchReason: `Perfect for your ${preferences.mood.toLowerCase()} mood and ${preferences.occasion.toLowerCase()} occasion. The ${preferences.taste.toLowerCase()} flavors will complement your taste preferences.`
      };
    });

    return recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
}; 