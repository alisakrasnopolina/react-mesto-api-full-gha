import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about  || '');
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm 
      onSubmit={handleSubmit}
      title="Редактировать профиль" 
      name="edit-profile" 
      button="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose}
    >
      <input 
        value={name}
        onChange={handleNameChange}
        id="name-input" 
        name="name" 
        type="text" 
        placeholder="Имя" 
        className="popup__input popup__input_data_name" 
        required 
        minLength="2" 
        maxLength="40"
      />
      <span className="popup__input-error name-input-error"></span>
      <input 
        value={description}
        onChange={handleDescriptionChange}
        id="about-input" 
        name="about" 
        type="text" 
        placeholder="О себе" 
        className="popup__input popup__input_data_about" 
        required 
        minLength="2" 
        maxLength="200"
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;