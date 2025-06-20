// import React, { useState } from "react";


const BaristaForm = () => {
  // Empty functions for now (we’ll add logic later)
  const onNewDrink = () => {};
  const onCheckAnswer = () => {};

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>

      <form>
        {/* Future form fields will go here */}
      </form>

      <button
        type="submit"
        className="button submit"
        onClick={onCheckAnswer}
      >
        Check Answer
      </button>

      <button
        type="button"
        className="button submit"
        onClick={onNewDrink}
      >
        New Drink
      </button>
    </div>
  );
};

export default BaristaForm;
