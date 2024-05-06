import React from 'react';
import './Header.css'; // Estilo CSS para o cabeçalho

const Header = ({ userPhoto, siteLogo }) => {
  return (
    <header className="header">
      <div className="menu-toggle">&#9776;</div>
      <div className="logo">
        <img src={siteLogo} alt="Logo do site" />
      </div>
      <div className="user-photo">
        <img src={userPhoto} alt="Foto do usuário" />
      </div>
    </header>
  );
}

export default Header;
