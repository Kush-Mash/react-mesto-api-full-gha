import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип Место" src={logo}/>

      <Routes>
        <Route path='/' element={
          <div className='header__info'>
            <span className='header__email'>{props.email}</span>
            <button className='header__exit' onClick={props.onSignOut}>Выйти</button>
          </div>
        } />
        <Route path='/sign-up' element={<Link className='header__link' to='/sign-in'>Войти</Link>} />
        <Route path='/sign-in' element={<Link className='header__link' to='/sign-up'>Регистрация</Link>} />
      </Routes>
    </header>
  );
};

export default Header;
