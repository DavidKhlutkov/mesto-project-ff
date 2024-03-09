import "./pages/index.css";
import {
    closePopup,
    openPopup,
    handleOverlayClick,
    handleCloseButtonClick
} from './components/modal.js';
import {initialCards} from './components/cards.js';
import {
  createCard,  
  handleLike, 
  deleteCard,
} from './components/card.js';
import {
  buttonEditProfile,
  buttonNewCard,
  buttonTypeCard,
  profileEditButton,
  profileAddButton,
  nameInput,
  placesList,
  jobInput,
  userNameElement,
  userJobElement, 
  popupImageCaption,
  popupsArray,
  editForm,
  editFormElement,
  newPlaceFormElement,
  newCardForm,
  avatarForm,
  avatarFormElement,
  avatarImage
} from './components/constat.js';
import { validation, clearValidation} from './components/validation.js';
import {   getCards,
  postCard,
  // deleteCardApi,
  getUser,
  patchUser,
  // addLikeCard,
  // deleteLikeCard,
  // addAvatar
} from './components/api.js';

// Объект с колбэками
export const callbacksObject = {
  deleteCardCallback: deleteCard,
  openImageCallback: openImagePopup,
  likeCardCallback: handleLike
} ; 

// Валидация
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

validation(validationConfig);

// информация о пользователе
 function getUserInfo (dataUser) {
  userNameElement.textContent = dataUser.name;
  userJobElement.textContent = dataUser.about;
  avatarImage.setAttribute("style", `background-image: url('${dataUser.avatar}')`);
}

//Поля формы
function setInitialEditProfileFormValues(dataUser) {
  if (dataUser) {
    nameInput.value = dataUser.name;
    jobInput.value = dataUser.about;
  }
}

// открыть попап с данными профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openPopup(editForm);
});

// Функция открытия попапа с картинкой
export function openImagePopup( cardImg, popupImage, popupImageCaption, buttonTypeCard ) {
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

// слушатели обработчиков закрытия по оверлей и кнопке закрытия
popupsArray.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  popup.addEventListener('click', handleOverlayClick);
  closeButton.addEventListener('click', handleCloseButtonClick);
});

//форма редактирования профиля
export function handleFormSubmit(evt) {
  evt.preventDefault();
  buttonEditProfile.textContent = 'Сохранение...';
  // отправка данных профиля
  patchUser({
    name: nameInput.value,
    about: jobInput.value
  }).then((dataUser) => {
    setInitialEditProfileFormValues(dataUser);
    closePopup(evt.target.closest(".popup_is-opened"));// закрыть попап автоматически можно вызовом соответствующей функции
    editFormElement.reset();// очистка формы
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    clearValidation(editFormElement, validationConfig);
    buttonEditProfile.textContent = 'Сохранить';
  })
}

//Форма добавления карточки
function handleNewCardFormSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  buttonNewCard.textContent = 'Сохранение...';
  // Получаем значения полей формы
  const placeNameInput = event.target.querySelector('.popup__input[name="place-name"]');
  const linkInput = event.target.querySelector('.popup__input[name="link"]');
  const placeName = placeNameInput?.value || '';
  const link = linkInput?.value || '';
  // Создаем новую карточку
  const newCard = createCard( data = { name: placeName, link: link } , callbacksObject);
  postCard(data = { name: placeName, link: link })
    .then(() => {
      // Добавляем новую карточку в начало контейнера для карточек
      placesList.prepend(newCard);
      // Очищаем форму
      event.target.reset();
      // Закрываем диалоговое окно
      closePopup(newCardForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonNewCard.textContent = 'Сохранить';
    })
}

// форма добавления аватара
// function handleAvatarFormSubmit(event) {
//   event.preventDefault();
//   avatarForm.textContent = 'Сохранение...';
//   const newAvatarUrl = avatarUrlInput.value;
//   patchUser({ avatar: newAvatarUrl })
//     .then((dataUser) => {
//       avatarImage.src = dataUser.avatar;
//       closePopup(avatarForm);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       clearValidation(avatarForm, validationConfig);
//       avatarForm.textContent = 'Сохранить';
//     })
// }


// Слушатели форм
newPlaceFormElement.addEventListener('submit', handleNewCardFormSubmit );
newCardForm.addEventListener("submit", (event) =>
  handleNewCardFormSubmit(event)
);
// avatarForm.addEventListener("submit", (event) => {
//   handleAvatarFormSubmit(event);
// });

// Функция с циклом выведения карточек на страницу
function renderCards(cards, callbacksObject) {
  placesList.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    const cardElement = createCard(cards[i], callbacksObject);
    placesList.appendChild(cardElement);
  }
}

// рендеринг начального набора карточек на странице
renderCards(initialCards, callbacksObject);

// Промис получения информации о пользователе и карточках 
Promise.all([getUser(), getCards()])
  .then(([cards, dataUser]) => {
    getUserInfo(dataUser);
    getCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });