import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

const App = () => {
  // states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // effect
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser((prevState) => {
          return { ...prevState, ...user };
        });
        setCards(cards);
      })
      .catch((error) => {
        console.log(`Ошибка - ${error}`);
      });
  }, []);

  // обработчик клика изменения аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  // обработчик клика изменения данных профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  // обработчик клика добавления новой карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  // обработчик клика показа полномасштабного изображения
  const handleCardFullImage = (card) => {
    setSelectedCard(card);
  };
  // обработчик лайка
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (!isLiked) {
      api
        .sendLike(card._id, card.likes)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(`Ошибка - ${error}`);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(`Ошибка - ${error}`);
        });
    }
  };
  // обработчик удаления карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((s) => s._id !== card._id));
      })
      .catch((error) => {
        console.log(`Ошибка - ${error}`);
      });
  };
  // обработчик обновления данных пользователя
  const handleUpdateProfile = ({ name, about }) => {
    api
      .updateProfileInfo(name, about)
      .then((user) => {
        setCurrentUser((prev) => {
          return { ...prev, ...user };
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка - ${error}`);
      });
  };
  // обработчик обновления аватарки
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .updateProfileAvatar(avatar)
      .then((user) =>
        setCurrentUser((prevState) => {
          return { ...prevState, ...user };
        })
      )
      .catch((error) => {
        console.log(`Ошибка - ${error}`);
      });
    closeAllPopups();
  };
  // обработчик добавления
  // новых карточек
  const handleAddPlaceSubmit = (newPlace) => {
    api
      .sendNewCard(newPlace)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((error) => {
        console.log(`Ошибка - ${error}`);
      });
    closeAllPopups();
  };
  // close all popups
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardFullImage}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateProfile}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* popup  confirm remove card */}
        <PopupWithForm title="Вы уверены?" name="confirm" />
        {/* popup  open full image */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
