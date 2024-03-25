import { postCard } from "../api.js";
import { createCard } from "../card.js";
import { closePopup } from "../modal.js";
import {
  newCardForm,
  newPlaceNameInput,
  newLinkInput,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";

// универсальная функция для добавления карточки
function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, callbacks);
  cardList[method](cardElement);
}
// Форма добавления карточки
export function handleNewCardFormSubmit(event, callbacksObject, userId) {
  function makeRequest() {
    return postCard(newPlaceNameInput.value, newLinkInput.value)
      .then((card) => {
        const createNewCard = createCard(card, callbacksObject, userId);
        renderCard(createNewCard, "prepend");
        closePopup(newCardForm);
      });
  }

  handleSubmit(makeRequest, event);
}
