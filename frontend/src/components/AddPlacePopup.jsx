import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="new-place"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title-place-input"
        className="popup__input popup__input_type_title-place"
        type="text"
        minLength="2"
        maxLength="30"
        name="name"
        placeholder="Название"
        value={name}
        onChange={handleChangeName}
        required
      />
      <span className="popup__input-error title-place-input-error"></span>
      <input
        id="link-place-input"
        className="popup__input popup__input_type_link-place"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
        required
      />
      <span className="popup__input-error link-place-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
