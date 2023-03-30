import Form from "./Form";

const PopupWithForm = ({
  title,
  name,
  sumbitText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <Form
          title={title}
          name={name}
          sumbitText={sumbitText}
          className={"form_userAvatar popup__form"}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="button"
            className="button button_type_close"
            onClick={onClose}
          ></button>
        </Form>
      </div>
    </div>
  );
};

export default PopupWithForm;
