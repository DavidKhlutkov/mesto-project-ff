import { deleteCardApi } from "../api.js";
import { openPopup, closePopup } from "../modal.js";
import { deletePopup } from "../constats.js";
let selectedCard;
let id;
export const openPopupDelete = (cardElement, cardId) => {
  selectedCard = cardElement;
  id = cardId;
  openPopup(deletePopup);
};

const closePopupDelete = () => {
  closePopup(deletePopup);
};
// Функция удаления карточки
export function deleteCard( selectedCard, id) {
  deleteCardApi(id)
    .then(() => {
      selectedCard.remove();
      closePopupDelete();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

// Форма удаления карточки
export function handleCardDelete(evt) {
  evt.preventDefault();
  deleteCard( selectedCard, id);
}
