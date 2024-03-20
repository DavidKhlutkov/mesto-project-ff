import { deleteCardApi } from "../../components/api.js";
import { closePopup, openPopup } from "../modal.js";
import { deletePopup } from "../constat";

let selectedCard;

export const openPopupDelete = (cardElement) => {
  console.log(cardElement)
  cardElement = selectedCard;
  openPopup(deletePopup);
};

export const closePopupDelete = () => {
  closePopup(deletePopup);
};
// Функция удаления карточки
export function deleteCard(selectedCard) {
  const deleteButtonUser = selectedCard.querySelector(".card__delete-button");
  deleteCardApi(selectedCard)
    .then(() => {
      deleteButtonUser.remove();
      closePopupDelete();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

// Форма удаления карточки
export function handleCardDelete(evt) {
  evt.preventDefault();
  deleteCard();
}
