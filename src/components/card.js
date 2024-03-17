import {
  popupImage,
  popupImageCaption,
  buttonTypeCard,
  userId,
} from "./constat";
import {
  addLikeCard,
  deleteCardApi,
  deleteLikeCard,
} from "./api";
// Функция добавления темплейта
export function createCard(cards, callbacksObject, userId) {
  const {
    deleteCardCallback,
    openImageCallback,
    countLikesCallback,
  } = callbacksObject;
  // Создание темплейта
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  // Заполняем атрибуты картинки и текста данными
  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.textContent = cards.name;
  cardLikeCounter.innerText = cards.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Слушатель удаления карточки если пользователь является владельцем
  if (userId !== cards._id) {
    deleteButton.addEventListener("click", () => {
      deleteCardCallback(userId, cardElement);
    });
  } else {
    deleteButton.style.display = "none";
  }
  // Слушатель лайка
  cardLikeButton.addEventListener("click", () => {
    countLikesCallback(cardLikeCounter, cardLikeButton, cards);
  });

  // Слушатель добавления картинки
  cardImage.addEventListener("click", () => {
    openImageCallback(cardImage, popupImage, popupImageCaption, buttonTypeCard);
  });

  // Возвращаем созданный темплейт
  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  deleteCardApi(cardElement.cardsset.id)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карты:", error);
    });
}

// Функция подсчета лайков
export function countLikes(cardLikeCounter, cardLikeButton, cards) {
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
