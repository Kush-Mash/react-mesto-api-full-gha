import React from "react";

function PopupWithForm(props) {
  const popupOpened = props.isOpen ? "popup_opened" : "";

  return (
    <div className={`popup popup_modify_${props.name} ${popupOpened}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_modify_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__button" type="submit">
            {props.buttonText}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
