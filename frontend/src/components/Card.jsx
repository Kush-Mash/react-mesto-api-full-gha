import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  // Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__toggle ${
    isLiked && "element__toggle_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
    <li className="element">
      <img
        className="element__mask-group"
        alt={`Ваша фотография места ${props.card.name}`}
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="element__wrapper">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="element__counter">{props.card.likes.length}</span>
        </div>
      </div>
      {/* Используем переменную isOwn для условного рендеринга */}
      {isOwn && (
        <button
          className="element__trash"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;
