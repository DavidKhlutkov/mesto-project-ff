import {
    handleOverlayClick,
    closePopup,
    openPopup
} from '../scripts/modal.js';

const buttonEditProfile = document.querySelectorAll('.popup_type_edit');
const buttonNewCard = document.querySelectorAll('.popup_type_new-card');
const buttonTypeCard = document.querySelectorAll('.popup_type_image');
const deleteButtons = document.querySelectorAll('.popup__close');

buttonEditProfile.classList.add("popup_is-animated");
buttonTypeCard.classList.add("popup_is-animated");
buttonNewCard.classList.add("popup_is-animated");

const cardContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

cardAddButton.addEventListener("click", () => {
    openPopup();
  });

profileEditButton.addEventListener("click", () => {
    //setInitialEditProfileFormValues(); это будут значение из профиля надо реализовать
    openPopup(popupTypeEdit);
});


profileAddButton.addEventListener("click", () => {
    openPopup(popupTypeNewCard);
});

deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        closePopup(button.closest(".popup"));
    });
});

//форма редактирования профиля
import {handleFormSubmit} from './form.js';


//форма добавления карточки
import {
    handleNewCardFormSubmit,
    newCardForm
} from './formNewCard.js';

formElement.addEventListener('submit', handleNewCardFormSubmit );
newCardForm.addEventListener("submit", (event) =>
  handleNewCardFormSubmit(event)
);
//рендеринг начального набора карточек на странице
import {initialCards} from './cards.js';
import {renderCards } from './card.js';
 
renderCards(initialCards);
