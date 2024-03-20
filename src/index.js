import "./pages/index.css";
import {
  openPopup,
  handleOverlayClick,
  handleCloseButtonClick,
} from "./components/modal.js";
// import {initialCards} from './components/cards.js';
import { createCard } from "./components/card.js";
import {
  popupsArray,
  placesList,
  editForm,
  editFormElement,
  buttonEditProfile,
  profileEditButton,
  userNameElement,
  userJobElement,
  popupImageCaption,
  newPlaceFormElement,
  newCardForm,
  buttonNewCard,
  buttonTypeCard,
  profileAddButton,
  nameInput,
  jobInput,
  avatarForm,
  avatarFormElement,
  buttonEditAvatar,
  avatarImage,
  deletePopup,
  deleteCardForm,
  closeButton
} from "./components/constat.js";
import { validation, clearValidation, validationConfig} from "./components/validation.js";
import {
  getCards,
  getUser,
  addLikeCard,
  deleteLikeCard,
} from "./components/api.js";
import { openPopupDelete, closePopupDelete, handleCardDelete } from "./components/forms/deleteForm.js";
import { handleAvatarFormSubmit } from "./components/forms/avatarForm.js";
import { handleNewCardFormSubmit } from "./components/forms/newCardsForm.js";
import { handleFormSubmit, setInitialEditProfileFormValues} from "./components/forms/editForm.js";

let userId;
// Объект с колбэками
const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  countLikesCallback: countLikes,
};

validation(validationConfig);

// информация о пользователе
function setUserInfo(dataUser) {
  userNameElement.textContent = dataUser.name;
  userJobElement.textContent = dataUser.about;
  avatarImage.setAttribute(
    "style",
    `background-image: url('${dataUser.avatar}')`
  );
  userId = dataUser._id;
}

// Функция с циклом выведения карточек на страницу
function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    const cardElement = createCard(cards[i], callbacksObject, userId);
    placesList.appendChild(cardElement);
  }
}

// открыть попап с данными профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openPopup(editForm);
});

// открыть попап с картинкой
export function openImagePopup(
  cardImg,
  popupImage,
  popupImageCaption,
  buttonTypeCard
) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  clearValidation(newPlaceFormElement, validationConfig);
  openPopup(buttonTypeCard);
}

// открыть попап с формой добавления карточки
profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardForm);
});

// открыть попап с формой добавления аватара
avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
});

// слушатели обработчиков закрытия по оверлей и кнопке закрытия
popupsArray.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  popup.addEventListener("click", handleOverlayClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
});

// Функция подсчета лайков
 function countLikes(cardLikeCounter, cardLikeButton, cards) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    // Пользователю уже понравилась карточка, поэтому выполните операцию "не нравится".
    deleteLikeCard(cards._id)
    .then((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении лайка:", err);
    });
  } else {
    // понравилась карта, поэтому выполните аналогичную операцию
    addLikeCard(cards._id)
    .then((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении лайка:", err);
    });
  }
}

// Слушатели форм
editForm.addEventListener("submit", (evt) => handleFormSubmit(evt));
newCardForm.addEventListener("submit", (evt) => handleNewCardFormSubmit(evt));
avatarForm.addEventListener("submit", (evt) => handleAvatarFormSubmit(evt));
closeButton.addEventListener('click', closePopupDelete);
deleteCardForm.addEventListener('submit', (evt) => handleCardDelete(evt, deleteButton, cardId));

// Промис получения информации о пользователе и карточках
Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
        setUserInfo(user);
        renderCards(cards, callbacksObject, user._id);
    })
    .catch((err) => {
        console.log("Произошла ошибка при получении данных:", err);
    });
