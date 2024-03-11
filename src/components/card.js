import { popupImage, popupImageCaption, buttonTypeCard, userId } from "./constat";
import {
  addLikeCard,
  // getCards,
  // getUser,
  // postCard,
  deleteCardApi,
  deleteLikeCard
} from "./api";
// Функция добавления темплейта
export function createCard(data, callbacksObject, userId) {
  const { deleteCardCallback, openImageCallback, likeCardCallback } = callbacksObject;
  // Создание темплейта
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content.querySelector(".places__item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector('.card__like-button');
  // Заполняем атрибуты картинки и текста данными
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    const deleteButton = cardElement.querySelector(".card__delete-button");
  // Слушатель удаления карточки если пользователь является владельцем
  if (!userId) {
    deleteButton.addEventListener("click", () => {
      deleteCardCallback(userId, cardElement);
    });
  } else {
    deleteButton.style.display = "none";
  };
  // Слушатель добавления картинки 
  cardImage.addEventListener("click", () => {
    openImageCallback(cardImage, popupImage, popupImageCaption, buttonTypeCard);
  });
  // Слушатель лайка
cardLikeButton.addEventListener("click", () => {
  likeCardCallback(cardLikeButton);
  handleLikeCounter(cardElement, userId); // Call the handleLikeCounter function passing the cardElement and data
});
  // Возвращаем созданный темплейт
    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  deleteCardApi(cardElement.dataset.id)
  .then(() => {
    cardElement.remove();
  })
  .catch(error => {
    console.error("Ошибка при удалении карты:", error);
  });
}

// Функция лайка
export function handleLike(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

// функция счетчика лайков
export function handleLikeCounter(cardElement, data) {
  if (EventTarget.classList.contains("card__like-button_is-active")) {
    addLikeCard(data._id)
    .then(data => {
      handleLike(cardElement.querySelector(".card__like-button"));
      cardElement.querySelector(".card__like-counter").textContent = data.likes.length;
    })
  } else {
    deleteLikeCard(data._id)
    .then(data => {
      handleLike(cardElement.querySelector(".card__like-button"));
      cardElement.querySelector(".card__like-counter").textContent = data.likes.length;
    })
  }
}