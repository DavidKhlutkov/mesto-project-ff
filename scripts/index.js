// Функция добавления темплейта
function createCard(data, deleteCallBack) {
// Создание темплейта
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.querySelector(".places__item").cloneNode(true);
// 
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
// Заполняем атрибуты картинки и текста данными
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function() {
    deleteCallBack(cardElement);
  });

  return cardElement;
}
// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
// Функция с циклом выведения карточек на страницу
function renderCards() {
  const placesList = document.querySelector(".places__list");

  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = createCard(initialCards[i], deleteCard);
    placesList.appendChild(cardElement);
  }

// функция добавления и снятия лайка
}

renderCards();