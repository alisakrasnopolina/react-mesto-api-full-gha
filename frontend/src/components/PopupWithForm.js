import React from 'react';

function PopupWithForm(props) {
  
  return (
    <div className={`popup popup_name_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <div className="popup__content">
          <button type="button" className="popup__close hover" onClick={props.onClose} aria-label="кнопка для закрытия попапа"></button>
          <h2 className="popup__title">{props.title}</h2>
          <form className={`popup__form popup_form_${props.name}`} onSubmit={props.onSubmit}>
            {props.children}
            <button type="submit" className="popup__submit-button">{props.button}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;