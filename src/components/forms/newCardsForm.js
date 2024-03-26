import { postCard } from "../api.js";
import { createCard } from "../card.js";
import { closePopup } from "../modal.js";
import {
  newCardForm,
  newPlaceNameInput,
  newLinkInput,
  placesList,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";

/*todo: универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузки
function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, callbacks);
  cardList[method](cardElement);
} */
// Форма добавления карточки
export function handleNewCardFormSubmit(event, callbacksObject, userId) {
  function makeRequest() {
    return postCard(newPlaceNameInput.value, newLinkInput.value)
      .then((card) => {
        const createNewCard = createCard(card, callbacksObject, userId);
        placesList.prepend(createNewCard);
        // renderCard(createNewCard, "prepend");
        closePopup(newCardForm);
      });
  }

  handleSubmit(makeRequest, event);
}
