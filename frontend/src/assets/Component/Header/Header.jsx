import React from 'react';
import './Header.css'; // Estilo CSS para o cabeçalho

import logo from './logo.png'
import userPhoto from './userPhoto.png'

const Header = () => {

  return (
    <header className="header">
      <div className='container'> 
        <div classname='menu-toggle'>
            <span className='linha'></span>
            <span className='linha'></span>
            <span className='linha'></span>
        </div>
        <div className="logo">
          <img src={logo} alt="Logo do site" />
        </div>
        <div className="user-photo">
          <img src={userPhoto} alt="Foto do usuário" />
        </div>
      </div>
    </header>
  );
}

export default Header;
