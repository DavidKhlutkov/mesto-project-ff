import { addLikeCard, deleteLikeCard } from "../../components/api.js";
// Функция подсчета лайков
export function handleLikes(cardLikeCounter, cardLikeButton, cards) {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      // Пользователю уже понравилась карточка, поэтому выполните операцию "не нравится".
      deleteLikeCard(cards._id)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении лайка:", err);
      });
    } else {
      // понравилась карта, поэтому выполните аналогичную операцию
      addLikeCard(cards._id)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при добавлении лайка:", err);
      });
    }
  }