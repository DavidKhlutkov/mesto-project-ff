import "./pages/index.css";
import {
  openPopup,
  handleOverlayClick,
  handleCloseButtonClick,
} from "./components/modal.js";
import { createCard, userId } from "./components/card/card.js";
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
  deleteCardForm
} from "./components/constats.js";
import { validation, clearValidation, validationConfig} from "./components/validation.js";
import {
  getCards,
  getUser,
} from "./components/api.js";
import { handleCardDelete } from "./components/forms/deleteForm/deleteForm.js";
import { handleAvatarFormSubmit } from "./components/forms/avatarForm.js";
import { handleNewCardFormSubmit } from "./components/forms/newCardForm/newCardsForm.js";
import { handleFormSubmit, setInitialEditProfileFormValues} from "./components/forms/editForm.js";
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

// Слушатели форм
editForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleCardDelete);

// Функция с циклом выведения карточек на страницу
export function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  cards.forEach(card => {
    const cardElement = createCard(card, callbacksObject, userId);
    placesList.appendChild(cardElement);
  });
}
// Промис получения информации о пользователе и карточках
Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
        setUserInfo(user);
        renderCards(cards, callbacksObject, user._id);
    })
    .catch((err) => {
        console.error("Произошла ошибка при получении данных:", err);
    });
