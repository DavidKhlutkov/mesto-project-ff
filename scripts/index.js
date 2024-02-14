import {
    handleOverlayClick,
    closePopup,
    openPopup
} from '../scripts/modal.js';
//рендеринг начального набора карточек на странице
import {initialCards} from './cards.js';
import {renderCards , placesList, handleLike} from './card.js';
 
//кнопки
const buttonEditProfile = document.querySelectorAll('.popup_type_edit');
const buttonNewCard = document.querySelectorAll('.popup_type_new-card');
const buttonTypeCard = document.querySelectorAll('.popup_type_image');
const deleteButtons = document.querySelectorAll('.popup__close');
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// попапы

//анимация всплывающих окон
buttonEditProfile.classList.add("popup_is-animated");
buttonTypeCard.classList.add("popup_is-animated");
buttonNewCard.classList.add("popup_is-animated");

// поля формы
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// функция закрытия открытого попапа написать

//Функция, закрывающая попап через оверлей
buttonEditProfile.forEach(function (button) {
  button.addEventListener("click", handleOverlayClick);
});
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');

// рендеринг начального набора карточек на странице
renderCards(initialCards);

//форма редактирования профиля
//Поля формы
function setInitialEditProfileFormValues() {
  // Элементы, куда должны быть вставлены значения полей
  const userNameElement = document.querySelector('.user__name');
  const userJobElement = document.querySelector('.user__job');
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}
export function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
// Новые значения с помощью textContent
  userNameElement.textContent = newName;
  userJobElement.textContent = newJob;
// закрыть попап автоматически можно вызовом соответствующей функции
  closePopup(evt.target.closest(".popup_is-opened"));
  // formElement.reset();
}

// открыть попап с данными профиля
profileEditButton.addEventListener("click", () => {
  setInitialEditProfileFormValues();
  openPopup(buttonEditProfile);
});


//форма добавления карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
formElement.addEventListener('submit', handleNewCardFormSubmit );
newCardForm.addEventListener("submit", (event) =>
  handleNewCardFormSubmit(event)
);

function handleNewCardFormSubmit(event) {
    event.preventDefault();
    // Получаем значения полей формы
    const placeNameInput = event.target.querySelector('.popup__input[name="place-name"]');
    const linkInput = event.target.querySelector('.popup__input[name="link"]');
    const placeName = placeNameInput.value;
    const link = linkInput.value;
    // Создаем новую карточку
    const newCard = createCard( renderCards(initialCards) );
    // Добавляем новую карточку в начало контейнера для карточек

    // Очищаем форму
    placeNameInput.value = '';
    linkInput.value = '';
    // Закрываем диалоговое окно
    closePopup(buttonNewCard);
  }
    
// Функция открытия попапа с картинкой
function openImagePopup( cardImg ) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption = document.querySelector(".popup__caption");
  popupImageCaption.textContent = cardImg.alt;
  openPopup(buttonTypeCard);
}

profileAddButton.addEventListener("click", () => {
  openPopup(buttonNewCard);
});