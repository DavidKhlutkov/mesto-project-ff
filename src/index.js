import "./pages/index.css";
import {
  closePopup,
  openPopup,
  handleOverlayClick,
  handleCloseButtonClick,
} from "./components/modal.js";
// import {initialCards} from './components/cards.js';
import { createCard, handleLike, deleteCard, countLikes } from "./components/card.js";
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
  newPlaceNameInput,
  newLinkInput,
  buttonNewCard,
  buttonTypeCard,
  profileAddButton,
  nameInput,
  jobInput,
  avatarForm,
  avatarFormElement,
  avatarButton,
  avatarImage,
} from "./components/constat.js";
import { validation, clearValidation } from "./components/validation.js";
import {
  getCards,
  postCard,
  getUser,
  patchUser,
  getAvatar,
} from "./components/api.js";
let userId;
// Объект с колбэками
const callbacksObject = {
  deleteCardCallback: deleteCard,
  openImageCallback: openImagePopup,
  likeCardCallback: handleLike,
  countLikesCallback: countLikes,
};

// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
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
  userId = { id: dataUser._id };
}

// Функция с циклом выведения карточек на страницу
function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    const cardElement = createCard(cards[i], callbacksObject, userId);
    placesList.appendChild(cardElement);
  }
}

//Поля формы
function setInitialEditProfileFormValues(dataUser) {
  if (dataUser) {
    nameInput.value = userNameElement.textContent;
    jobInput.value = userJobElement.textContent;
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
  openPopup(newCardForm);
});

// открыть попап с формой добавления аватара
avatarImage.addEventListener("click", () => {
  openPopup(avatarForm);
});

// слушатели обработчиков закрытия по оверлей и кнопке закрытия
popupsArray.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  popup.addEventListener("click", handleOverlayClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
});

//форма редактирования профиля
export function handleFormSubmit(evt) {
  evt.preventDefault();
  buttonEditProfile.textContent = "Сохранение...";
  // отправка данных профиля
  patchUser(nameInput.value, jobInput.value)
    .then((dataUser) => {
      setInitialEditProfileFormValues(dataUser);
      closePopup(evt.target.closest(".popup_is-opened"));
      editFormElement.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при редактировании профиля:", err);
    })
    .finally(() => {
      clearValidation(editFormElement, validationConfig);
      buttonEditProfile.textContent = "Сохранить";
    });
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  buttonNewCard.textContent = "Сохранение...";
  // создание новой карточки 
  postCard(newPlaceNameInput.value, newLinkInput.value)
    .then((card) => {
      const createNewCard = createCard(card, callbacksObject, userId);
      placesList.prepend(createNewCard);
      newPlaceForm.reset();
      closePopup(newCardForm);
    })
    .catch((err) => {
      console.log("Произошла ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      clearValidation(newCardForm, validationConfig);
      buttonNewCard.textContent = "Сохранить";
    });
}

// форма добавления аватара
function handleAvatarFormSubmit(event) {
  event.preventDefault();
  buttonEditAvatar.textContent = "Сохранение...";
  getAvatar(formAvatar.elements.link.value)
    .then((avatar) => {
      avatarImage.setAttribute("style", `background-image: url('${avatar}')`);
      closePopup(avatarFormElement);
      formAvatar.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      clearValidation(avatarForm, validationConfig);
      buttonEditAvatar.textContent = "Сохранить";
    });
}

// Слушатели форм
newPlaceFormElement.addEventListener("submit", handleNewCardFormSubmit);
newCardForm.addEventListener("submit", (event) =>
  handleNewCardFormSubmit(event)
);
avatarForm.addEventListener("submit", (event) => {
  handleAvatarFormSubmit(event, buttonEditAvatar);
});

// Промис получения информации о пользователе и карточках
Promise.all([getUser(), getCards()])
  .then(([userId, cards]) => {
    setUserInfo(userId);
    renderCards(cards, callbacksObject);
  })
  .catch((err) => {
    console.log("Произошла ошибка при получении данных:", err);
  });
