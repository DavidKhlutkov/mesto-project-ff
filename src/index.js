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
  deleteCard} from './components/card.js';
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
  profileFormElement,
  newPlaceFormElement
} from './components/constat.js';
import { validation, clearValidation} from './components/validation.js';
import { getCards, getUser, postCard } from './components/api.js';
// открыть попап с данными профиля
profileEditButton.addEventListener("click", () => {
  setInitialEditProfileFormValues();
  openPopup(buttonEditProfile);
});

// Функция открытия попапа с картинкой
export function openImagePopup( cardImg, popupImage, popupImageCaption, buttonTypeCard ) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openPopup(buttonTypeCard);
}

// открыть попап с формой добавления карточки
profileAddButton.addEventListener("click", () => {
  openPopup(buttonNewCard);
});

// слушатели обработчиков закрытия по оверлей и кнопке закрытия
popupsArray.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  popup.addEventListener('click', handleOverlayClick);
  closeButton.addEventListener('click', handleCloseButtonClick);
});

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}; 

validation(validationConfig);

clearValidation(profileFormElement, validationConfig);
clearValidation(newPlaceFormElement, validationConfig);

//Поля формы
function setInitialEditProfileFormValues() {
  if (userNameElement && userJobElement) {
    nameInput.value = userNameElement.textContent;
    jobInput.value = userJobElement.textContent;
  }
}

//форма редактирования профиля
export function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
// Новые значения с помощью textContent
  if (userNameElement && userJobElement) {
    userNameElement.textContent = newName;
    userJobElement.textContent = newJob;
  }
// закрыть попап автоматически можно вызовом соответствующей функции
  closePopup(evt.target.closest(".popup_is-opened"));
  profileFormElement.reset(); // очистка формы
}

//форма добавления карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
newPlaceFormElement.addEventListener('submit', handleNewCardFormSubmit );
newCardForm.addEventListener("submit", (event) =>
  handleNewCardFormSubmit(event)
);


// Объект с колбэками
export const callbacksObject = {
  deleteCardCallback: deleteCard,
  openImageCallback: openImagePopup,
  likeCardCallback: handleLike
} ; 

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  // Получаем значения полей формы
  const placeNameInput = event.target.querySelector('.popup__input[name="place-name"]');
  const linkInput = event.target.querySelector('.popup__input[name="link"]');
  const placeName = placeNameInput?.value || '';
  const link = linkInput?.value || '';
  // Создаем новую карточку
  const newCard = createCard({ link, name: placeName }, callbacksObject);
  // Добавляем новую карточку в начало контейнера для карточек
  placesList.prepend(newCard);
  // Очищаем форму
  event.target.reset();
  // Закрываем диалоговое окно
  closePopup(buttonNewCard);
}

// Промис получения информации о пользователе и карточках 
Promise.all([getUser(), getCards()])
  .then(([cards, userData]) => {
    setUserData(userData);
    setCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

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