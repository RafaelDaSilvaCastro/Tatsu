import React, { useState } from 'react';
import { auth } from '../../firebaseConnection';
import logo from '../Login/logo.png'

import { 
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/Home')
      alert('FOI'); // Success message
    } catch (error) {
      alert('Erro ao criar conta '+ error);
      console.error('Error creating user:', error);
    }
  }

  return (
    <div className="login-container">
      <div className='imagem'>
        <img className='logo' src={logo}/>
      </div>
      <div className='login'>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
      <h2>Crie sua conta no Tatsu</h2>
        <input
          type="text"
          id="email"
          placeholder="✉️ E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="🔒 Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      </div>
    </div>
  );
}