import PopupWithForm from "./PopupWithForm.jsx";

function ConfirmationPopup(props) {
  function handleConfirmDelete(evt) {
    evt.preventDefault();
    props.onSubmit(props.card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleConfirmDelete}
    />
  );
}

export default ConfirmationPopup;
