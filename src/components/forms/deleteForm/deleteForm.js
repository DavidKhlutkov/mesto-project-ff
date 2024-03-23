import { deleteCardApi } from "../../api.js";

let selectedCard;
let id;
export const openPopupDelete = (cardElement, cardId) => {
  selectedCard = cardElement;
  id = cardId;
  openPopup(deletePopup);
};

export const closePopupDelete = () => {
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
