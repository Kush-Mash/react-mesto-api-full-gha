import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card.jsx";

function Main(props) {
  // Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-box">
          <img
            className="profile__avatar"
            alt="Аватар"
            src={currentUser.avatar}
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            title="Загрузить новый аватар"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку места"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__box">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
