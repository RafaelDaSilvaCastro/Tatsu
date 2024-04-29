import React, { useState } from 'react';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit (event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logado com sucesso!');
      navigate('/Home')
    } catch (err) {
      alert(err)
      setErrorMessage('Erro ao logar: ' + err.message);
      console.error(err);
    }
    
  };

  return (
    <div className="login-container">
      <h1>Tatsu</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
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
        <button type="submit">Login</button>
        <p>Não possui conta? <Link to='/register'><span>clique aqui</span></Link></p>
      </form>
    </div>
  );
}