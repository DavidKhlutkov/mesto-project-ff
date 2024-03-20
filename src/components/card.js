import {
  popupImage,
  popupImageCaption,
  buttonTypeCard,
  userId,
} from "./constat";
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
  cardLikeCounter.textContent = cards.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardId = cards._id;
  // Слушатель удаления карточки если пользователь является владельцем
  if (userId !== cards.owner._id) {
    deleteButton.style.display = "none";
    } else {
    deleteButton.addEventListener("click", () => {
      deleteCardCallback(cardElement, deleteButton, cardId);
    });
  }
  // Проверка наличия лайка пользователя в массиве likes
  const isLiked = cards.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
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