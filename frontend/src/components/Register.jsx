import React from 'react';
import { Link } from "react-router-dom";
import EntryForm from './EntryForm.jsx';

// Будем использовать управляемые элементы
function Register(props) {

  return (
    <div className="entry">
      <h2 className="entry__title">Регистрация</h2>
      <EntryForm
        buttonText="Зарегистрироваться"
        onSubmit={props.handleRegisterSubmit}
        onChange={props.handleChange}
        formValue={props.formValue}
      />
      <Link to="/sign-in" className="entry__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
