import { postCard } from "../../components/api.js";
import { createCard } from "../../components/card.js";
import { closePopup } from "../../components/modal.js";
import {
  newCardForm,
  newPlaceFormElement,
  newPlaceNameInput,
  newLinkInput,
  buttonNewCard,
  placesList,
} from "../../components/constat.js";
// Форма добавления карточки
export function handleNewCardFormSubmit(event) {
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
