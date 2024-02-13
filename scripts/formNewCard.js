import { createCard } from './card.js';
import { initialCards } from './cards';

const newCardForm = document.querySelector('.popup__form[name="new-place"]');


function handleNewCardFormSubmit(event) {
    event.preventDefault();
    
    // Получаем значения полей формы
    const placeNameInput = event.target.querySelector('.popup__input[name="place-name"]');
    const linkInput = event.target.querySelector('.popup__input[name="link"]');
    const placeName = placeNameInput.value;
    const link = linkInput.value;
    
    // Создаем новую карточку
    const newCard = createCard( initialCards =  { name: placeName, link: link } );
    
    // Добавляем новую карточку в начало контейнера для карточек
    const cardContainer = document.querySelector('.places__list');
    cardContainer.prepend(newCard);
    
    // Очищаем форму
    placeNameInput.value = '';
    linkInput.value = '';
    
    // Закрываем диалоговое окно
    closePopup(event.target.closest('.popup'));
  }

  export {
    handleNewCardFormSubmit,
    newCardForm
  }