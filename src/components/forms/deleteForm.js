import { deleteCardApi } from "../../components/api.js";
import { closePopup, openPopup } from "../modal.js";
import { deletePopup } from "../constat";

let selectedCard;
let id;
export const openPopupDelete = (cardElement, cardId) => {
  console.log(cardElement, cardId);
  selectedCard = cardElement;
  id = cardId;
  console.log(selectedCard, id);
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
