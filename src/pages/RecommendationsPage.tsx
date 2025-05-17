import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';

interface Recommendation {
  name: string;
  description: string;
  ingredients: string[];
  matchReason: string;
}

const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem('userRecommendations');
    if (!storedRecommendations) {
      navigate('/recommendations/onboarding');
      return;
    }

    try {
      const parsedRecommendations = JSON.parse(storedRecommendations);
      // Ensure we have an array of recommendations
      if (!Array.isArray(parsedRecommendations)) {
        // If it's a single object, wrap it in an array
        if (typeof parsedRecommendations === 'object' && parsedRecommendations !== null) {
          setRecommendations([parsedRecommendations]);
        } else {
          // If the data is invalid, redirect to onboarding
          navigate('/recommendations/onboarding');
          return;
        }
      } else {
        setRecommendations(parsedRecommendations);
      }
    } catch (error) {
      console.error('Error parsing recommendations:', error);
      navigate('/recommendations/onboarding');
      return;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Personalized Recommendations</h1>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {recommendations.map((recommendation, index) => (
          <div key={index} className="mb-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2">{recommendation.name}</h2>
              <p className="text-gray-600 mb-4">{recommendation.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside">
                  {recommendation.ingredients.map((ingredient, i) => (
                    <li key={i} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Why this matches you:</h3>
                <p className="text-gray-700">{recommendation.matchReason}</p>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/recommendations/onboarding')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get New Recommendations
        </button>
      </div>
    </div>
  );
};

export default RecommendationsPage; 