import React, { useState } from 'react';
import RecommendationFeature from './RecommendationFeature';

const HomePage = () => {
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [questions, setQuestions] = useState(null);

  const questionPool = [
    {
      question: "If your personality was a season, which would it be?",
      options: ["Spring - Fresh and Renewing", "Summer - Bright and Energetic", "Autumn - Rich and Reflective", "Winter - Mysterious and Deep", "A Mix of All Seasons"]
    },
    {
      question: "What kind of adventure would you embark on right now?",
      options: ["A Journey of Discovery", "A Quest for Knowledge", "A Search for Serenity", "An Exploration of Culture", "A Path of Transformation"]
    },
    {
      question: "Which element resonates with your current mood?",
      options: ["Fire - Passionate and Dynamic", "Water - Flowing and Adaptable", "Earth - Grounded and Stable", "Air - Light and Free", "A Combination of Elements"]
    },
    {
      question: "What kind of story would you want to tell about this moment?",
      options: ["A Tale of Adventure", "A Story of Growth", "A Journey of Discovery", "A Moment of Reflection", "A Celebration of Life"]
    },
    {
      question: "If you could create any atmosphere, what would it feel like?",
      options: ["Warm and Cozy", "Fresh and Energizing", "Mysterious and Intriguing", "Peaceful and Calm", "Vibrant and Dynamic"]
    },
    {
      question: "What kind of energy are you seeking?",
      options: ["Creative and Inspiring", "Calm and Centered", "Playful and Fun", "Deep and Meaningful", "Balanced and Harmonious"]
    },
    {
      question: "Which landscape speaks to your soul?",
      options: ["Mountains - Majestic and Strong", "Ocean - Deep and Flowing", "Forest - Mysterious and Alive", "Desert - Vast and Open", "Garden - Nurturing and Growing"]
    },
    {
      question: "What kind of journey would you like to take?",
      options: ["A Path of Discovery", "A Road of Transformation", "A Trail of Adventure", "A Way of Reflection", "A Route of Connection"]
    },
    {
      question: "Which time of day resonates with you?",
      options: ["Dawn - New Beginnings", "Noon - Full of Energy", "Sunset - Reflective", "Night - Mysterious", "Twilight - Magical"]
    },
    {
      question: "What kind of experience would you like to create?",
      options: ["A Moment of Wonder", "A Time of Connection", "A Space for Reflection", "An Opportunity for Growth", "A Celebration of Life"]
    }
  ];

  const startRecommendation = () => {
    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 5);
    setQuestions(selectedQuestions);
    setShowRecommendation(true);
  };

  return (
    <div className="home-container">
      {!showRecommendation ? (
        <div className="start-section">
          <h1>Welcome to Cocktail Recommendations</h1>
          <p>Get your personalized cocktail recommendation based on your preferences</p>
          <button onClick={startRecommendation} className="start-button">
            Get Personalized Recommendation
          </button>
        </div>
      ) : questions && (
        <RecommendationFeature questions={questions} />
      )}
    </div>
  );
};

export default HomePage; 