import React, { useState } from 'react';
import { auth } from '../../firebaseConnection';


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
      <h1>Crie sua conta no Tatsu</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}