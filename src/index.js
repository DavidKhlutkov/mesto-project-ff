import "./pages/index.css";
import {
  closePopup,
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
  newPlaceNameInput,
  newLinkInput,
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
  buttonDeleteCard,
  closeButton
} from "./components/constat.js";
import { validation, clearValidation } from "./components/validation.js";
import {
  getCards,
  postCard,
  getUser,
  patchUser,
  getAvatar,
  addLikeCard,
  deleteLikeCard,
  deleteCardApi
} from "./components/api.js";
let userId;
// Объект с колбэками
const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  countLikesCallback: countLikes,
};

// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
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
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardForm);
});

// открыть попап с формой добавления аватара
avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
});

// открыть попап с удалением карточки
export const openPopupDelete = () => {
  openPopup(popupDelete);
};

// закрыть попап с удалением карточки
const closePopupDelete = () => {
  closePopup(popupDelete);
};

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
      newPlaceFormElement.reset();
      closePopup(newCardForm);
    })
    .catch((err) => {
      console.log("Произошла ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      buttonNewCard.textContent = "Сохранить";
    });
}

// форма добавления аватара
function handleAvatarFormSubmit(event) {
  event.preventDefault();
  buttonEditAvatar.textContent = "Сохранение...";
  const avatar = avatarFormElement.elements['avatar-link'].value;
  getAvatar(avatar)
    .then((avatar) => {
      avatarImage.setAttribute("style", `background-image: url('${avatar}')`);
      closePopup(avatarFormElement);
      avatarFormElement.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      buttonEditAvatar.textContent = "Сохранить";
    });
}

// Функция удаления карточки
function deleteCard (deleteButton, id) {
  deleteCardApi(id)
    .then(() => {
      deleteButton.closest(".card").remove();
      closePopupDelete();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    })
}
// Форма удаления карточки
export function handleCardDelete(evt, deleteButton, id) {
  evt.preventDefault();
  deleteCard(deleteButton, id);
}

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
  .then(([userId, cards]) => {
    setUserInfo(userId);
    renderCards(cards, callbacksObject);
  })
  .catch((err) => {
    console.log("Произошла ошибка при получении данных:", err);
  });
