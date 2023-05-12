import React from 'react';
import GoodLogo from '../images/approve-sign.svg';
import BadLogo from '../images/something-wrong-sign.svg';
import { useNavigate } from  'react-router-dom'; 


function InfoTooltip(props) {

  const navigate = useNavigate(); 

  function closePopup() {
    props.onClose()
    if (props.isRegister) {
      navigate('/sign-in', {replace: true});
    }
  }

  return(
    <div className={`popup popup_name_approve ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <div className="popup__content popup__content_name_approve">
          <button type="button" className="popup__close hover" onClick={closePopup} aria-label="кнопка для закрытия попапа"></button>
          <img src={props.isRegister ? GoodLogo : BadLogo} alt="Логотип" className="popup__logo"/>
          <h2 className="popup__title popup__title_name_approve">{props.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;