const PopupWithForm = ({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          onSubmit={onSubmit}
          action="#"
          name={name}
          className="form_userAvatar popup__form form"
        >
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="button button_type_submit">
            <span className="button__text">
              {name === "confirm" ? "Да" : "Сохранить"}
            </span>
          </button>
          <button
            type="button"
            className="button button_type_close"
            onClick={onClose}
          ></button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
