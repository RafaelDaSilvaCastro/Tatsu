import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './ConfigReceita.css'

import Header from "../../assets/Component/Header/Header";


const options = [
  { value: '1', label: '1 Pessoa' },
  { value: '2', label: '2 Pessoa' },
  { value: '3', label: '3 Pessoa' },
  { value: '4', label: '4 Pessoa' },
];


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
    setActiveButton(buttonIndex); 
  };

  const [selectedOption, setSelectedOption] = useState(options[0].value); // Initial selected value

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };  

  return (
    
    <div className="ingredient-adder">
      <Header/>
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
    <div className="option-select">
      <select value={selectedOption} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className="actions">
      <Link  to='/Home'><button className='btnCancelar'>Cancelar</button></Link >
      <button className='btnGerar'>Gerar</button>          
    </div>
    </div>

  );
}