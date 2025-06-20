import React from "react";

const RecipeChoices = ({ handleChange, label, choices, checked }) => {
  return (
    <div className="radio-buttons">
      {choices &&
        choices.map((choice) => (
          <li key={choice}>
            <input
              id={choice}
              value={choice}
              name={label}
              type="radio"
              onChange={handleChange}
              checked={checked === choice}
            />
            <label htmlFor={choice}>{choice}</label>
          </li>
        ))}
    </div>
  );
};

export default RecipeChoices;
