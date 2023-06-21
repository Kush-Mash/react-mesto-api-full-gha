import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      job: description,
    });
  }
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      name="user-info"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="popup__input popup__input_type_name"
        type="text"
        minLength="2"
        maxLength="40"
        name="name"
        placeholder="Имя"
        onChange={handleChangeName}
        value={name || ""}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="job-input"
        className="popup__input popup__input_type_job"
        type="text"
        minLength="2"
        maxLength="200"
        name="job"
        placeholder="О себе"
        onChange={handleChangeAbout}
        value={description || ""}
        required
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
