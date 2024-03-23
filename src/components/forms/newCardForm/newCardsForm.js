import { postCard } from "../../api.js";
import { createCard } from "../../card/card.js";
import { closePopup } from "../../modal.js";
import {
  newCardForm,
  newPlaceNameInput,
  newLinkInput,
} from "../../constats.js";
import { callbacksObject } from "../../card/utilsCard.js";
import { handleSubmit } from "../utilsForms.js";
import { renderCard } from "../newCardForm/utilsNewCardForm.js";
// Форма добавления карточки
export function handleNewCardFormSubmit(event) {
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
