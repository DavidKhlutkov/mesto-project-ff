import {
  popupImage,
  popupImageCaption,
  buttonTypeCard,
  userId,
} from "./constat";
import {
  addLikeCard,
  // getCards,
  // getUser,
  // postCard,
  deleteCardApi,
  deleteLikeCard,
} from "./api";
// Функция добавления темплейта
export function createCard(cards, callbacksObject, userId) {
  const {
    deleteCardCallback,
    openImageCallback,
    likeCardCallback,
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
  cardLikeCounter.textContent = cards.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  // Слушатель удаления карточки если пользователь является владельцем
  if (!userId) {
    deleteButton.addEventListener("click", () => {
      deleteCardCallback(userId, cardElement);
    });
  } else {
    deleteButton.style.display = "none";
  }

  // Слушатель добавления картинки
  cardImage.addEventListener("click", () => {
    openImageCallback(cardImage, popupImage, popupImageCaption, buttonTypeCard);
  });
  // Слушатель лайка
  if(userId) {
    cardLikeButton.addEventListener("click", () => {
      if (activeLikeButton(cardLikeButton) === true) {
        addLikeApi(userId)
          .then((cards) => {
            cardLikeCounter.textContent = cards.likes.length;
            likeCardCallback(cardLikeButton);
          })
      } else {
        deleteLikeApi(userId)
          .then((cards) => {
            cardLikeCounter.textContent = cards.likes.length;
            likeCardCallback(cardLikeButton);
          })
      }
    })
  }
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

// Функция лайка
export function handleLike(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

// Функция счетчика лайков
export function activeLikeButton(cardLikeButton) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    return true;
  } else {
    return false;
  }
}
