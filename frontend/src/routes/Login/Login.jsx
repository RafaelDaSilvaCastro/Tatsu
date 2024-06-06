import React, { useState } from 'react';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import logo from './logo.png'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login realizado com sucesso!')
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/Home')
    } catch (err) {
      const erro = JSON.stringify(err)
      toast.error('Erro ao realizar login')
    }

  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className='imagem'>
        <img className='logo' src={logo} />
      </div>
      <div className='login'>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <button type="submit">Login</button>
          <span>Não possui conta? <Link to='/register'>clique aqui</Link></span>
        </form>
      </div>
    </div>
  );
}