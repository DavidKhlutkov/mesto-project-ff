import { placesList} from "./constat";
import { callbacksObject } from "../index.js";
import { initialCards } from "./cards.js";
// Функция добавления темплейта
export function createCard(data, deleteCallBack, openImagePopup, handleLike) {
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
    deleteCallBack(deleteButton);
  });
  // Слушатель добавления картинки 
  cardImage.addEventListener("click", () => {
    openImagePopup(cardImage);
  })
  // Слушатель лайка
  cardLikeButton.addEventListener("click", () => {
    handleLike(cardLikeButton);
  });
    return cardElement;
}

// Функция с циклом выведения карточек на страницу
export function renderCards() {
  placesList.innerHTML = '';
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i], callbacksObject);
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