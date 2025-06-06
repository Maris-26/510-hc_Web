import React, { useState } from 'react';
import { Groq } from 'groq-sdk';
import axios from 'axios';
import '../styles/RecommendationFeature.css';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const RecommendationFeature = () => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const startQuiz = async () => {
    setLoadingQuestions(true);
    try {
      const client = new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const prompt = `You must respond with a valid JSON object containing exactly 5 questions. Each question must have exactly 5 options.
        The response must be in this exact format, with no additional text:
        {
          "questions": [
            {
              "question": "question text",
              "options": ["option1", "option2", "option3", "option4", "option5"]
            }
          ]
        }
        Generate creative, abstract questions about personality, mood, and experience.
        Remember: Your entire response must be valid JSON, starting with { and ending with }.`;

      const completion = await client.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { 
            role: "system", 
            content: "You are a JSON generator. You must always respond with valid JSON only, no additional text." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('No response from API');
      }

      const response = completion.choices[0].message.content.trim();
      let questionsData;
      
      try {
        questionsData = JSON.parse(response);
      } catch (error) {
        console.error('Invalid JSON response:', response);
        throw new Error('Invalid response format from API');
      }
      
      if (!questionsData.questions || !Array.isArray(questionsData.questions) || questionsData.questions.length !== 5) {
        console.error('Invalid questions format:', questionsData);
        throw new Error('Invalid questions format');
      }

      const validQuestions = questionsData.questions.every(q => 
        q.question && 
        Array.isArray(q.options) && 
        q.options.length === 5
      );

      if (!validQuestions) {
        console.error('Invalid question format:', questionsData);
        throw new Error('Invalid question format');
      }

      setQuestions(questionsData.questions);
      setShowStartButton(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      setRecommendation('Sorry, there was an error generating questions. Please try again.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleAnswer = (answer) => {
    setPreferences(prev => ({
      ...prev,
      [step]: answer
    }));

    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      getRecommendation({
        ...preferences,
        [step]: answer
      });
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setPreferences({});
    setRecommendation('');
    setShowStartButton(true);
    setQuestions([]);
  };

  const validateCocktail = async (cocktailName) => {
    try {
      // Clean the cocktail name
      const cleanName = cocktailName
        .replace(/^["']|["']$/g, '') // Remove quotes
        .replace(/^The\s+/i, '') // Remove leading "The"
        .replace(/'s\s+Cup$/i, ' Cup') // Fix Pimm's Cup format
        .trim();

      console.log('Searching for cocktail:', cleanName);

      // First try exact match
      let response = await axios.get(`${API_URL}/search.php?s=${encodeURIComponent(cleanName)}`);
      
      // If no exact match, try fuzzy search
      if (!response.data.drinks || response.data.drinks.length === 0) {
        // Try with first letter
        response = await axios.get(`${API_URL}/search.php?f=${encodeURIComponent(cleanName.charAt(0))}`);
        if (response.data.drinks) {
          // Find the closest match
          const closestMatch = response.data.drinks.find(drink => 
            drink.strDrink.toLowerCase().includes(cleanName.toLowerCase()) ||
            cleanName.toLowerCase().includes(drink.strDrink.toLowerCase())
          );
          if (closestMatch) {
            console.log('Found closest match:', closestMatch.strDrink);
            return closestMatch;
          }
        }
      } else {
        console.log('Found exact match:', response.data.drinks[0].strDrink);
      }
      
      return response.data.drinks && response.data.drinks.length > 0 ? response.data.drinks[0] : null;
    } catch (error) {
      console.error('Error validating cocktail:', error);
      return null;
    }
  };

  const getRecommendation = async (finalPreferences) => {
    setLoading(true);
    try {
      const client = new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const prompt = `Based on these personal preferences:
        ${Object.entries(finalPreferences).map(([index, value]) => 
          `- ${questions[index].question}: ${value}`
        ).join('\n')}
        
        Recommend a cocktail from TheCocktailDB that would create the perfect experience for these preferences.
        Consider this as a daily recommendation, so feel free to suggest different cocktails that match these preferences.
        The explanation should be clear and relatable, focusing on how this cocktail creates the experience they're looking for.
        
        Format your response exactly like this:
        Cocktail Name: [exact name of the cocktail]
        Explanation: [a clear, relatable explanation of how this cocktail matches their preferences]
        
        Important: The cocktail must exist in TheCocktailDB database. If you're unsure about a cocktail, choose a well-known classic.`;

      const completion = await client.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 1.2,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('No response from Groq');
      }

      const response = completion.choices[0].message.content;
      console.log('AI Response:', response);
      
      const nameMatch = response.match(/Cocktail Name:\s*([^\n]+)/i);
      if (nameMatch) {
        const cocktailName = nameMatch[1].trim();
        console.log('Extracted cocktail name:', cocktailName);
        const cocktailData = await validateCocktail(cocktailName);
        
        if (!cocktailData) {
          const retryPrompt = `${prompt}\n\nPlease recommend a different cocktail that definitely exists in TheCocktailDB. Make sure to use the exact name as it appears in the database.`;
          const retryCompletion = await client.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [{ role: "user", content: retryPrompt }],
            temperature: 1.2,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
          });
          
          if (retryCompletion.choices?.[0]?.message?.content) {
            const retryResponse = retryCompletion.choices[0].message.content;
            console.log('Retry Response:', retryResponse);
            const retryNameMatch = retryResponse.match(/Cocktail Name:\s*([^\n]+)/i);
            if (retryNameMatch) {
              const retryCocktailName = retryNameMatch[1].trim();
              console.log('Retry cocktail name:', retryCocktailName);
              const retryCocktailData = await validateCocktail(retryCocktailName);
              if (retryCocktailData) {
                const explanation = retryResponse.match(/Explanation:\s*([^\n]+)/i)?.[1]?.trim() || '';
                setRecommendation(formatCocktailResponse(retryCocktailData, explanation));
              } else {
                throw new Error('Unable to find a suitable cocktail recommendation');
              }
            }
          } else {
            throw new Error('Unable to find a suitable cocktail recommendation');
          }
        } else {
          const explanation = response.match(/Explanation:\s*([^\n]+)/i)?.[1]?.trim() || '';
          setRecommendation(formatCocktailResponse(cocktailData, explanation));
        }
      } else {
        throw new Error('Could not extract cocktail name from response');
      }
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setRecommendation(`Sorry, there was an error getting your recommendation: ${error.message}`);
    }
    setLoading(false);
  };

  const formatCocktailResponse = (cocktail, explanation) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure ? measure.trim() : ''} ${ingredient}`.trim());
      }
    }

    return {
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
      category: cocktail.strCategory,
      type: cocktail.strAlcoholic,
      glass: cocktail.strGlass,
      explanation: explanation,
      ingredients: ingredients,
      instructions: cocktail.strInstructions
    };
  };

  return (
    <div className="recommendation-container">
      <h2>Get Your Daily Cocktail Recommendation</h2>
      {loadingQuestions ? (
        <div className="loading">Generating your personalized questions...</div>
      ) : loading ? (
        <div className="loading">Getting your personalized recommendation...</div>
      ) : (
        <>
          {showStartButton && (
            <button 
              className="start-button"
              onClick={startQuiz}
              disabled={loadingQuestions}
            >
              {loadingQuestions ? 'Loading...' : 'Start'}
            </button>
          )}
          {!showStartButton && !recommendation && questions.length > 0 && (
            <div className="question-container">
              <h3>{questions[step].question}</h3>
              <div className="options-grid">
                {questions[step].options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          {loading && <div className="loading">Getting your recommendation...</div>}
          {recommendation && (
            <div className="recommendation-container">
              <div className="cocktail-detail">
                <div className="cocktail-header">
                  <h2>{recommendation.name}</h2>
                  {recommendation.image && (
                    <img src={recommendation.image} alt={recommendation.name} />
                  )}
                </div>

                <div className="cocktail-info">
                  {recommendation.category && (
                    <p><strong>Category:</strong> {recommendation.category}</p>
                  )}
                  {recommendation.type && (
                    <p><strong>Type:</strong> {recommendation.type}</p>
                  )}
                  {recommendation.glass && (
                    <p><strong>Glass:</strong> {recommendation.glass}</p>
                  )}
                </div>

                <div className="cocktail-ingredients">
                  <h3>Ingredients</h3>
                  <ul>
                    {recommendation.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="cocktail-instructions">
                  <h3>Instructions</h3>
                  <p>{recommendation.instructions}</p>
                </div>

                <div className="cocktail-match">
                  <h3>Why This Matches Your Preferences</h3>
                  <p>{recommendation.explanation}</p>
                </div>
              </div>
              <button className="reset-button" onClick={resetQuiz}>
                Get Another Recommendation
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendationFeature; 