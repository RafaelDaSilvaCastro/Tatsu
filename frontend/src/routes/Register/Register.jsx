import React, { useState } from 'react';
import { auth } from '../../firebaseConnection';
import logo from '../Login/logo.png'

import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
    try {

      if (password.length < 6) {

        toast.error('Sua senha deve ter mais do que seis caracteres')
      }
      else {
        if (regexEmail.test(email)) {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate('/')
          toast.success('Sua conta foi criada com sucesso!  🤩 ')
          }
          else {
           toast.error('Formato de email inválido  😞')
          }   
      }



    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(`Erro desconhecido: ${error}`)
    }
  }

  return (
    <div className="login-container">
      <ToastContainer />
      <div className='imagem'>
        <img className='logo' src={logo} />
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