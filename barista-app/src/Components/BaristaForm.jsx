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
  
  const [correct_temp, setCheckedTemperature] = useState("");
  const [correct_syrup, setCheckedSyrup] = useState("");
  const [correct_milk, setCheckedMilk] = useState("");
  const [correct_blended, setCheckedBlended] = useState("");

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
    console.log("New drink clicked!");

    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });

    setCheckedTemperature("");
    setCheckedSyrup("");
    setCheckedMilk("");
    setCheckedBlended("");

    getNextDrink();
  };

  const onCheckAnswer = (e) => {
    e.preventDefault();

    if (trueRecipe.temperature !== inputs.temperature) {
      setCheckedTemperature("wrong");
    } else {
      setCheckedTemperature("correct");
    }

    if (trueRecipe.syrup !== inputs.syrup) {
      setCheckedSyrup("wrong");
    } else {
      setCheckedSyrup("correct");
    }

    if (trueRecipe.milk !== inputs.milk) {
      setCheckedMilk("wrong");
    } else {
      setCheckedMilk("correct");
    }

    if (trueRecipe.blended !== inputs.blended) {
      setCheckedBlended("wrong");
    } else {
      setCheckedBlended("correct");
    }
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

        <form className="container" onSubmit={onCheckAnswer}>
          {/* Temperature */}
          <div className="mini-container">
            <h3>Temperature</h3>
            <div className="answer-space" id={correct_temp}>
              {inputs["temperature"]}
            </div>
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
          </div>

          {/* Syrup */}
          <div className="mini-container">
            <h3>Syrup</h3>
            <div className="answer-space" id={correct_syrup}>
              {inputs["syrup"]}
            </div>
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
          </div>

          {/* Milk */}
          <div className="mini-container">
            <h3>Milk</h3>
            <div className="answer-space" id={correct_milk}>
              {inputs["milk"]}
            </div>
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
          </div>

          {/* Blended */}
          <div className="mini-container">
            <h3>Blended</h3>
            <div className="answer-space" id={correct_blended}>
              {inputs["blended"]}
            </div>
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
          </div>
              </form>
          <button type="submit" className="button submit">
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