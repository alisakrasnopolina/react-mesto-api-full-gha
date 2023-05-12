import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm 
      onSubmit={handleSubmit}
      title="Новое место" 
      name="card" 
      button="Создать" 
      isOpen={props.isOpen} 
      onClose={props.onClose}
    > 
      <input 
        value={name}
        onChange={handleNameChange} 
        id="title-input" 
        name="name" 
        type="text" 
        placeholder="Название" 
        className="popup__input popup__input_data_title" 
        required 
        minLength="2" 
        maxLength="30"
      />
      <span className="popup__input-error title-input-error"></span>
      <input  
        value={link}
        onChange={handleLinkChange}
        id="link-input" 
        name="link" 
        type="url" 
        placeholder="Ссылка на картинку" 
        className="popup__input popup__input_data_link" 
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;