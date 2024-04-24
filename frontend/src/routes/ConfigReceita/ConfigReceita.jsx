import React, { useState } from 'react';

import './ConfigReceita.css'

export default function ConfigReceita(){
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [activeButton, setActiveButton] = useState(null); 

  const handleInputChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient(''); // Clear input after adding
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    const filteredList = ingredientsList.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
    setIngredientsList(filteredList);
  };

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex); // Set the active button based on the index
  };

  return (
    <div className="ingredient-adder">
      <h1>Lista de ingredientes</h1>
      <ul className="ingredients-list">
        {ingredientsList.map((ingredient) => (
          <li key={ingredient}>
            {ingredient}
            <button className="remove-button" onClick={() => handleRemoveIngredient(ingredient)}>
              X
            </button>
          </li>
        ))}
      </ul>   
      <div className="ingredient-input">
        <input
          type="text"
          placeholder="Adicione um ingrediente"
          value={ingredient}
          onChange={handleInputChange}
        />
        <button onClick={handleAddIngredient}>+</button>
      </div>
      <label>Dificuldade da receita</label>
      <div className="button-toggle">
      <button
        className={activeButton === 0 ? 'button active' : 'button'}
        onClick={() => handleButtonClick(0)}
      >
        Fácil
      </button>
      <button
        className={activeButton === 1 ? 'button active' : 'button'}
        onClick={() => handleButtonClick(1)}
      >
        Intermediaria
      </button>
      <button
        className={activeButton === 2 ? 'button active' : 'button'}
        onClick={() => handleButtonClick(2)}
      >
        Dificil
      </button>
    </div>
    {activeButton}
    </div>

  );
}