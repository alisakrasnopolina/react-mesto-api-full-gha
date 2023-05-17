import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import AddPlacePopup from './AddPlacePopup'
import * as Auth from '../utils/Auth';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App(props) {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [titleInfoTooltip, setTitleInfoTooltip] = React.useState('');
  const [isRegister, setRegister] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((res) => {
          setCards(res)
        })
        .catch((err) => {console.log(err)}); 
      api.getProfile()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {console.log(err)});
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>  state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {console.log(err)}); 
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {console.log(err)}); 
  } 

  function handleUpdateUser({name, about}) {
    api.editProfile({name, about})
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {console.log(err)});
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {console.log(err)});
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups()
      })
      .catch((err) => {console.log(err)});
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('Authorized');
    if (token) {
      Auth.getContent()
        .then((res) => {
          if (res) {
            setUserEmail(res.data)
            setLoggedIn(true);
            navigate("/", {replace: true})
          }
        })
        .catch((err) => {console.log(err)});
    }
   } 

  function handleSignOut(){
    localStorage.removeItem('Authorized');
    setLoggedIn(false);
    navigate("/sign-in", {replace: true});
  }

  function handleChangeTitle(isReg) {
    if (isReg) {
      setTitleInfoTooltip('Вы успешно зарегистрировались!')
    } else {
      setTitleInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.')
    }
  }

  function handleLogin(email, password) {
    Auth.authorization(email, password)
      .then((data) => {
        if (data.token){
          const userData = {
            email: email
          }
          setUserEmail(userData)
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch(err => {
        console.log(err)
        setInfoTooltip(true);
        setRegister(false);
        handleChangeTitle(false);
      });
  }

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        setRegister(true)
        handleChangeTitle(true)
        setInfoTooltip(true);
      })
      .catch((err) => {
        setRegister(false)
        handleChangeTitle(false)
        setInfoTooltip(true);
        console.log(err)
      });
  }

  return (
    <div>
      <Routes>
        <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        <Route path="/" element={
          <ProtectedRoute loggedIn={loggedIn} element={
            <CurrentUserContext.Provider value={currentUser}>
              <Header userData={userEmail.email} loggedIn={loggedIn} onSignOut={handleSignOut}/>
              <Main
                onEditProfile = {handleEditProfileClick} 
                onEditAvatar = {handleEditAvatarClick} 
                onAddPlace = {handleAddPlaceClick} 
                onCardClick = {handleCardClick}
                onCardLike = {handleCardLike}
                onCardDelete = {handleCardDelete}
                cards = {cards}
              />
              <Footer/>
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
              <PopupWithForm 
                title="Вы уверены?" 
                name="sure" 
                button="Да" 
              />
              <ImagePopup 
                card={selectedCard} 
                onClose={closeAllPopups}
              />
            </CurrentUserContext.Provider> 
          }/>
        }/>
        <Route path="/sign-up" element={
          <>
            <Header title="Войти" loggedIn={loggedIn} path={'/sign-in'}/>
            <Register onRegister={handleRegister} />
          </>
        }/>
        <Route path="/sign-in" element={
          <>
            <Header title="Регистрация" loggedIn={loggedIn} path={'/sign-up'}/>
            <Login onLogin={handleLogin}/>
          </>
        }/>
      </Routes>
      <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltip} isRegister={isRegister} title={titleInfoTooltip}/>
  </div>
  );
}

export default App;