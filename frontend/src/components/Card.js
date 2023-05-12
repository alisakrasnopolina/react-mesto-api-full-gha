import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (props.card.owner._id === currentUser._id);
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `elements__heart ${isLiked && 'elements__heart_condition_active'}` 
  );; 

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card);
  } 
  
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }  

  
  return (
      <div className="elements__card">
        {isOwn && <button type="button" className="elements__trash hover" aria-label="кнопка для удаления карточки" onClick={handleDeleteClick} />} 
        <div className="elements__pic" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}></div>
        <div className="elements__description">
          <p className="elements__name">{props.card.name}</p>
          <div className="elements__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="кнопка лайка карточки"></button>
            <div className="elements__number-of-likes">{props.card.likes.length}</div>
          </div>
        </div>
      </div>
  )
}

export default Card;
