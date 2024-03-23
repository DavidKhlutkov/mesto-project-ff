import { createCard } from "../card/card.js";
// универсальная функция для добавления карточки
export function renderCard(item, method = "prepend") {
    const cardElement = createCard(item, callbacksObject);
    cardList[method](cardElement);
  }