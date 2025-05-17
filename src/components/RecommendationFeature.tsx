import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAI from 'openai';

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

// Initialize OpenAI with the API key directly
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

const RecommendationFeature: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    try {
      const prompt = `Based on the following preferences, recommend 3 cocktails:
        Mood: ${answers.mood}
        Occasion: ${answers.occasion}
        Taste preference: ${answers.taste}
        Strength preference: ${answers.strength}
        Season: ${answers.season}
        
        For each cocktail, provide:
        1. Name
        2. Brief description
        3. Key ingredients (as an array of strings)
        4. Why it matches their preferences
        
        Format the response as a JSON array with these fields:
        [
          {
            "name": "Cocktail Name",
            "description": "Brief description",
            "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
            "matchReason": "Why this matches their preferences"
          }
        ]`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a cocktail expert who provides personalized drink recommendations. Always return a valid JSON array."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      });

      const content = completion.choices[0].message?.content || '[]';
      const recommendations = JSON.parse(content);
      
      // Ensure we have an array of recommendations
      const finalRecommendations = Array.isArray(recommendations) ? recommendations : [recommendations];
      
      localStorage.setItem('userRecommendations', JSON.stringify(finalRecommendations));
      navigate('/recommendations');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Fallback to basic recommendations if API call fails
      const fallbackRecommendations: Recommendation[] = [
        {
          name: "Classic Mojito",
          description: "A refreshing minty cocktail perfect for any occasion",
          ingredients: ["White rum", "Fresh mint", "Lime juice", "Sugar", "Soda water"],
          matchReason: `Perfect for your ${answers.mood.toLowerCase()} mood and ${answers.occasion.toLowerCase()} occasion.`
        },
        {
          name: "Old Fashioned",
          description: "A sophisticated cocktail with rich flavors",
          ingredients: ["Bourbon", "Angostura bitters", "Sugar", "Orange peel"],
          matchReason: `The rich flavors complement your preference for ${answers.taste.toLowerCase()} tastes.`
        },
        {
          name: "Seasonal Spritz",
          description: "A light and refreshing seasonal cocktail",
          ingredients: ["Prosecco", "Aperol", "Soda water", "Orange slice"],
          matchReason: `This ${answers.season.toLowerCase()}-inspired drink matches your mood perfectly.`
        }
      ];
      localStorage.setItem('userRecommendations', JSON.stringify(fallbackRecommendations));
      navigate('/recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Let's find your perfect drink!</h1>
      <div className="mb-8">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {isLoading ? (
        <div className="text-center">
          <p className="text-lg mb-4">Generating your personalized recommendations...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : (
        <>
          <h2 className="text-xl mb-4">{questions[currentQuestion].text}</h2>
          <div className="grid grid-cols-1 gap-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="p-4 rounded-lg border hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationFeature; 