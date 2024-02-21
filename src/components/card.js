import { placesList, popupImage, popupImageCaption, buttonTypeCard } from "./constat";
import { callbacksObject } from "../index.js";
import { initialCards } from "./cards.js";
// Функция добавления темплейта
export function createCard(data, callbacksObject) {
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
  // Слушатель удаления карточки
  deleteButton.addEventListener("click", () => {
    deleteCardCallback(cardElement);
  });
  // Слушатель добавления картинки 
  cardImage.addEventListener("click", () => {
    openImageCallback(cardImage, popupImage, popupImageCaption, buttonTypeCard);
  })
  // Слушатель лайка
  cardLikeButton.addEventListener("click", () => {
    likeCardCallback(cardLikeButton);
  });
    return cardElement;
}

// Функция с циклом выведения карточек на страницу
export function renderCards(cards, callbacksObject) {
  placesList.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    const cardElement = createCard(cards[i], callbacksObject);
    placesList.appendChild(cardElement);
  }
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLike(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}