import {useContext} from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar" title="avatar" onClick={props.onEditAvatar} style={{backgroundImage: `url(${currentUser.avatar})`}}></div>
          <div className="profile__info">
            <div className="profile__edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button hover" onClick={props.onEditProfile} aria-label="кнопка открытия попапа для редактирования профиля"></button>
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button hover" onClick={props.onAddPlace} aria-label="кнопка открытия попапа для добавления карточки"></button>
      </section>
      <section className="elements">
        {props.cards.map((card, i) => (
          <Card onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} card={card} key={card._id}/>
        ))}
      </section>
    </main>
  );
}

export default Main;