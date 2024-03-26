import "./pages/index.css";
import {
  handleOverlayClick,
  openPopup,
  handleCloseButtonClick
} from "./components/modal.js";
import { createCard, handleLikes } from "./components/card.js";
import {
  popupsArray,
  placesList,
  editForm,
  editFormElement,
  profileEditButton,
  userNameElement,
  userJobElement,
  newCardForm,
  profileAddButton,
  avatarForm,
  avatarImage,
  deleteCardForm,
} from "./components/constats.js";
import { validation, clearValidation, validationConfig} from "./components/validation.js";
import {
  getCards,
  getUser,
} from "./components/api.js";
import { handleCardDelete, openPopupDelete } from "./components/forms/deleteForm.js";
import { handleAvatarFormSubmit } from "./components/forms/avatarForm.js";
import { handleNewCardFormSubmit } from "./components/forms/newCardsForm.js";
import { handleFormSubmit, setInitialEditProfileFormValues} from "./components/forms/editForm.js";
validation(validationConfig);

function openImagePopup(
  cardImg,
  popupImage,
  popupImageCaption,
  buttonTypeCard
) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openPopup(buttonTypeCard);
}
// Объект с колбэками
const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  handleLikesCallback: handleLikes,
};

// открыть попап с данными профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openPopup(editForm);
});

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

// информация о пользователе
let userId = "";

function setUserInfo(user) {
  userNameElement.textContent = user.name;
  userJobElement.textContent = user.about;
  avatarImage.setAttribute(
    "style",
    `background-image: url('${user.avatar}')`
  );
  userId = user._id;
}
// Функция с циклом выведения карточек на страницу
function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  cards.forEach(card => {
    const cardElement = createCard(card, callbacksObject, userId);
    placesList.appendChild(cardElement);
  });
}

// Слушатели форм
editForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", (event) => {
  handleNewCardFormSubmit(event, callbacksObject, userId);
});
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleCardDelete);
// Промис получения информации о пользователе и карточках
Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
        setUserInfo(user);
        renderCards(cards, callbacksObject, user._id);
    })
    .catch((err) => {
        console.error("Произошла ошибка при получении данных:", err);
    });
