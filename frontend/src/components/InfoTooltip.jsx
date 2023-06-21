import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip(props) {

  return (
  <div className={`popup popup_modify_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
      <img
        className="popup__img"
        src={props.isRegister ? success : fail}
        alt={props.isRegister
          ? 'Регистрация пройдена'
          : 'Регистрация не пройдена'} />
      <h3 className="popup__message">
        {props.isRegister
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </h3>
      <button
        className="popup__close-button"
        type="button"
        aria-label="Закрыть"
        onClick={props.onClose}
      ></button>
    </div>
  </div>
  )
}

export default InfoTooltip;
