import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './ConfigReceita.css'

import Header from "../../assets/Component/Header/Header";


const options = [
  { value: 'option1', label: '1 Pessoa' },
  { value: 'option2', label: '2 Pessoas' },
  { value: 'option3', label: '3 Pessoas' },
  { value: 'option4', label: '4 Pessoas' },
];

const dificult = [
  { value: 'option1', label: 'Fácil'},
  { value: 'option2', label: 'Intermediária'},
  { value: 'option3', label: 'Difícil'},
]


export default function ConfigReceita() {
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const handleInputChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient('');
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

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [selectedOption2, setSelectedOption2] = useState(options[0].value);


  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddIngredient();
    }
  };
return (

    <div className="ingredient-adder">
      <Header />
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
        <input className='teste'
          type="text"
          placeholder="Adicione um ingrediente"
          value={ingredient}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        <button onClick={handleAddIngredient}>+</button>
      </div>
      <div className='borda'>
        <label className='nome-campo'>Dificuldade da receita</label>
        <div className="button-toggle">
          {/* <button
            className={activeButton === 0 ? 'button active' : 'button'}
            onClick={() => handleButtonClick(0)}
          >
            Fácil
          </button>
          <button
            className={activeButton === 1 ? 'button active' : 'button'}
            onClick={() => handleButtonClick(1)}
          >
            Intermediária
          </button>
          <button
            className={activeButton === 2 ? 'button active' : 'button'}
            onClick={() => handleButtonClick(2)}
          >
            Difícil
          </button> */}
          <select value={selectedOption2} onChange={handleChange2}>
            {dificult.map((dificult) => (
              <option key={dificult.value} value={dificult.value}>
                {dificult.label}
              </option>
            ))}
          </select>

        </div>
      </div>
      <label className='nome-campo'>Número de pessoas</label>
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
        <Link to='/Home'><button className='btnCancelar'>Cancelar</button></Link >
        <button className='btnGerar'>Gerar</button>
      </div>
    </div>

  );
}