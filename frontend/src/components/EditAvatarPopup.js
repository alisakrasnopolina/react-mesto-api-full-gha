import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

  } 

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm 
      onSubmit={handleSubmit}
      title="Обновить аватар" 
      name="edit-avatar" 
      button="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose}
    >
      <input  
        ref={avatarRef}
        id="avatar-input" 
        name="link" 
        type="url" 
        placeholder="Ссылка на картинку" 
        className="popup__input popup__input_data_link" 
        required
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;