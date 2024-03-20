import { deleteCardApi } from "../../components/api.js";
import { closePopup, openPopup } from "../modal.js";
import { deletePopup, } from "../constat";
import { returnProps } from "../card.js";

let selectedCard;

export const openPopupDelete = () => {
  openPopup(deletePopup);
}

export const closePopupDelete = () => {
  closePopup(deletePopup);
}
// Функция удаления карточки
export function deleteCard (deleteButtonUser, cardId) {
  selectedCard = deleteButtonUser.closest(".card");
    deleteCardApi(cardId)
      .then(() => {
        selectedCard.closest(".card").remove();
        closePopupDelete
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении карточки:", err);
      })
  }
  
  // Форма удаления карточки
  export function handleCardDelete(evt) {
    evt.preventDefault();
    deleteCard(returnProps(), selectedCard);
  }