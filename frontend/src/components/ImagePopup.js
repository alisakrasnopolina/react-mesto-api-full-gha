import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`popup popup_name_pic ${props.card.name ? 'popup_opened' : ''}`} id="popup_name_pic">
      <div className="popup__container">
        <div className="popup__image">
          <button type="button" className="popup__close hover" aria-label="кнопка для закрытия попапа" onClick={props.onClose}></button>
          <img alt={`Изображение ${props.card.name}`} className='popup__pic' src={props.card.link}/>
          <p className="popup__name">{props.card.name}</p>
        </div> 
      </div>
    </div>
  );
}

export default ImagePopup;