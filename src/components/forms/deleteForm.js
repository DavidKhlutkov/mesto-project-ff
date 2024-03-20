import { deleteCardApi } from "../../components/api.js";
import { closePopup, openPopup } from "../modal.js";
import { deletePopup } from "../constat";

let selectedCard;

export const openPopupDelete = (cardElement) => {
  cardElement = selectedCard;
  openPopup(deletePopup);
};

export const closePopupDelete = () => {
  closePopup(deletePopup);
};
// Функция удаления карточки
export function deleteCard(selectedCard, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      selectedCard.remove();
      closePopupDelete();
      console.log( selectedCard)
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

// Форма удаления карточки
export function handleCardDelete(evt) {
  evt.preventDefault();
  deleteCard(cardElement, cardId);
}
