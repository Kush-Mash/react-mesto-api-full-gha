function EntryForm(props) {

  return (
    <form className="entry__form" onSubmit={props.onSubmit}>
      <input
        className="entry__input"
        required
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={props.formValue.email}
        onChange={props.onChange}
      />
      <input
      className="entry__input"
        required
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={props.formValue.password}
        onChange={props.onChange}
      />
      <button
        className="entry__button"
        type="submit"
      >
        {props.buttonText}
      </button>
    </form>
  );
}

export default EntryForm;
