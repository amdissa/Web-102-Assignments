import React, { useState, useEffect } from 'react';
import RecipeChoices from "./Components/RecipeChoices";
import "./BaristaForm.css";
import drinksJson from "./Components/drinks.json";

const BaristaForm = () => {
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  const [ingredients, setIngredients] = useState({
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  });

  const [currentDrink, setCurrentDrink] = useState("");
  const [trueRecipe, setTrueRecipe] = useState({});

  // Automatically pick a drink on first load
  useEffect(() => {
    getNextDrink();
  }, []);

  const getNextDrink = () => {
    const randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    const randomDrink = drinksJson.drinks[randomDrinkIndex];

    setCurrentDrink(randomDrink.name);
    setTrueRecipe(randomDrink.ingredients);

    console.log("Selected drink:", randomDrink.name);
  };

  const onNewDrink = () => {
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });

    getNextDrink();
  };

  const onCheckAnswer = (e) => {
    e.preventDefault();
    console.log("User selected:", inputs);
    console.log("True recipe:", trueRecipe);
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Hi, I'd like to order a:</h2>

        <div className="drink-container">
          <h2 className="mini-header">{currentDrink || "No drink selected"}</h2>
          <button
            type="button"
            className="button newdrink"
            onClick={onNewDrink}
          >
            🔄
          </button>
        </div>

        <form onSubmit={onCheckAnswer}>
          {/* Temperature */}
          <h3>Temperature</h3>
          <div className="answer-space">{inputs["temperature"]}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="temperature"
            choices={ingredients["temperature"]}
            checked={inputs["temperature"]}
          />

          {/* Syrup */}
          <h3>Syrup</h3>
          <div className="answer-space">{inputs["syrup"]}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="syrup"
            choices={ingredients["syrup"]}
            checked={inputs["syrup"]}
          />

          {/* Milk */}
          <h3>Milk</h3>
          <div className="answer-space">{inputs["milk"]}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="milk"
            choices={ingredients["milk"]}
            checked={inputs["milk"]}
          />

          {/* Blended */}
          <h3>Blended</h3>
          <div className="answer-space">{inputs["blended"]}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="blended"
            choices={ingredients["blended"]}
            checked={inputs["blended"]}
          />
        </form>

        <button type="submit" className="button submit" onClick={onCheckAnswer}>
          Check Answer
        </button>

        <button type="button" className="button submit" onClick={onNewDrink}>
          New Drink
        </button>
      </div>
    </div>
  );
};

export default BaristaForm;
