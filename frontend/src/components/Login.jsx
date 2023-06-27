import React from 'react';
import EntryForm from './EntryForm.jsx';

function Login(props) {

  return (
    <div className="entry">
      <h2 className="entry__title">Вход</h2>
      <EntryForm
        buttonText="Войти"
        onSubmit={props.handleLoginSubmit}
        onChange={props.handleChange}
        formValue={props.formValue}
      />
    </div>
  );
}

export default Login;
