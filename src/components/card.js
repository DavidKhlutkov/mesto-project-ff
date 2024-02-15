import { placesList } from "./constat";
// Функция добавления темплейта
function createCard(data, deleteCallBack) {
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
    deleteButton.addEventListener("click", function() {
      deleteCallBack(cardElement);
    });
  // Слушатель добавления картинки 
  cardImage.addEventListener("click", (evt) => {
    openImagePopup(evt);
  })
  // Слушатель лайка
  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt);
  });
    return cardElement;
}

// Функция с циклом выведения карточек на страницу
export function renderCards() {
  placesList.innerHTML = '';
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i], deleteCard);
    placesList.appendChild(cardElement);
  }
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLike(evt) {
  evt.target.classList.toggle('.card__like-button_is-active');
}

// Функция открытия попапа с картинкой
export function openImagePopup( cardImg ) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption = document.querySelector(".popup__caption");
  popupImageCaption.textContent = cardImg.alt;
  openPopup(buttonTypeCard);
}