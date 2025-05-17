import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface Recommendation {
  name: string;
  description: string;
  ingredients: string[];
  matchReason: string;
}

const RecommendationFeature: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const questions: Question[] = [
    {
      id: 'mood',
      text: 'How are you feeling today?',
      options: ['Happy', 'Sad', 'Energetic', 'Relaxed', 'Stressed']
    },
    {
      id: 'occasion',
      text: 'What\'s the occasion?',
      options: ['Celebration', 'Casual gathering', 'Date night', 'Solo relaxation', 'Business meeting']
    },
    {
      id: 'taste',
      text: 'What flavors do you generally prefer?',
      options: ['Sweet', 'Sour', 'Bitter', 'Spicy', 'Balanced']
    },
    {
      id: 'strength',
      text: 'How strong do you prefer your drinks?',
      options: ['Light', 'Medium', 'Strong', 'Very strong', 'Non-alcoholic']
    },
    {
      id: 'season',
      text: 'What season do you associate with your current mood?',
      options: ['Spring', 'Summer', 'Fall', 'Winter', 'Any season']
    }
  ];

  const handleAnswer = (answer: string): void => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/get-recommendations', answers);
      const recommendations = response.data;
      
      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('No recommendations received');
      }
      
      localStorage.setItem('userRecommendations', JSON.stringify(recommendations));
      navigate('/recommendations');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError('Failed to get recommendations. Please try again.');
      const fallbackRecommendations: Recommendation[] = [
        {
          name: "Classic Mojito",
          description: "A refreshing minty cocktail perfect for any occasion",
          ingredients: ["White rum", "Fresh mint", "Lime juice", "Sugar", "Soda water"],
          matchReason: `Perfect for your ${answers.mood?.toLowerCase() || 'current'} mood and ${answers.occasion?.toLowerCase() || 'any'} occasion.`
        },
        {
          name: "Old Fashioned",
          description: "A sophisticated cocktail with rich flavors",
          ingredients: ["Bourbon", "Angostura bitters", "Sugar", "Orange peel"],
          matchReason: `The rich flavors complement your preference for ${answers.taste?.toLowerCase() || 'balanced'} tastes.`
        },
        {
          name: "Seasonal Spritz",
          description: "A light and refreshing seasonal cocktail",
          ingredients: ["Prosecco", "Aperol", "Soda water", "Orange slice"],
          matchReason: `This ${answers.season?.toLowerCase() || 'seasonal'}-inspired drink matches your mood perfectly.`
        }
      ];
      localStorage.setItem('userRecommendations', JSON.stringify(fallbackRecommendations));
      navigate('/recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  return React.createElement('div', { className: 'max-w-2xl mx-auto p-6' },
    React.createElement('h1', { className: 'text-2xl font-bold mb-6' }, 'Let\'s find your perfect drink!'),
    React.createElement('div', { className: 'mb-8' },
      React.createElement('div', { className: 'w-full bg-gray-200 h-2 rounded-full' },
        React.createElement('div', {
          className: 'bg-blue-500 h-2 rounded-full transition-all',
          style: { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
        })
      ),
      React.createElement('p', { className: 'text-sm text-gray-600 mt-2' },
        `Question ${currentQuestion + 1} of ${questions.length}`
      )
    ),
    error && React.createElement('div', { className: 'text-red-500 mb-4' }, error),
    isLoading
      ? React.createElement('div', { className: 'text-center' },
          React.createElement('p', { className: 'text-lg mb-4' },
            'Generating your personalized recommendations...'
          ),
          React.createElement('div', {
            className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'
          })
        )
      : React.createElement(React.Fragment, null,
          React.createElement('h2', { className: 'text-xl mb-4' },
            questions[currentQuestion].text
          ),
          React.createElement('div', { className: 'grid grid-cols-1 gap-3' },
            questions[currentQuestion].options.map((option) =>
              React.createElement('button', {
                key: option,
                onClick: () => handleAnswer(option),
                className: 'p-4 rounded-lg border hover:bg-blue-50 transition-colors'
              }, option)
            )
          )
        )
  );
};

export default RecommendationFeature; 