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
import { userId, callbacksObject } from "../../index.js";
import { handleSubmit } from "../../components/utils.js";
// Форма добавления карточки
export function handleNewCardFormSubmit(event) {
  function makeRequest() {
    return postCard(newPlaceNameInput.value, newLinkInput.value)
      .then((card) => {
        const createNewCard = createCard(card, callbacksObject, userId);
        placesList.prepend(createNewCard);
        newPlaceFormElement.reset();
        closePopup(newCardForm);
      });
  }

  handleSubmit(makeRequest, event, buttonNewCard);
}
