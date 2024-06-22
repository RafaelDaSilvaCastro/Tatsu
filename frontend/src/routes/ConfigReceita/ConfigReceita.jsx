import { db } from '../../firebaseConnection';
import { doc, setDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import './ConfigReceita.css'

import Header from "../../assets/Component/Header/Header";

import axios from "axios"


const options = [
  { value: '1 Pessoa', label: '1 Pessoa' },
  { value: '2 Pessoa', label: '2 Pessoa' },
  { value: '3 Pessoa', label: '3 Pessoa' },
  { value: '4 Pessoa', label: '4 Pessoa' },
];


export default function ConfigReceita() {
  const navigate = useNavigate();
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

  const [selectedOption, setSelectedOption] = useState(options[0].value); // Initial selected value

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  async function handleRevenue(){
    const req = await axios({
      method: 'get',
      url: 'http://161.35.234.165/Receita',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        "dificuldade": activeButton,
        "porcaoPessoas": selectedOption,
        "ingredientes": ingredientsList
      }
    });

    const objReceita = req.data
    console.log(objReceita.success)
    if(objReceita.success){
      const receita = objReceita.data[3]
      const nomeReceita = receita.titulo
      const revenueId = receita.id
      const user = JSON.parse(localStorage.getItem('@detailUser'))
      const userId = user.uid

      await setDoc(doc(db, "historico", nomeReceita), {
        json: JSON.stringify(receita),
        userId: userId,
        revenueId: revenueId
      })
      .then(()=>{
        console.log('Receita salva com sucesso......')
        localStorage.setItem('@revenueId', revenueId)
      })
      .catch((err)=>{
        console.log('Erro ao salvar receita: '+ err)
      })
    
    
      navigate('/receita');
      
    }
    else{
      alert('Erro ao gerar receita tente outra configuração')  
    }
    
  }



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
        />

        <button onClick={handleAddIngredient}>+</button>
      </div>
      <div className='borda'>
        <label className='nome-campo'>Dificuldade da receita</label>
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
        <button className='btnGerar' onClick={async ()=> await handleRevenue() } >Gerar</button>
      </div>
    </div>

  );
}