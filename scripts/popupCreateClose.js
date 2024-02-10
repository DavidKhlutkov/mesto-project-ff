//функции для открытия и закрытия всплывающих окон,
//также для обработки клавиши escape и слушатель overlay click
const popupsArray = Array.from(document.querySelectorAll('.popup'));


function handlehandleEscClick(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find(popup => popup.classList.contains('.popup_is-opened'));
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleCloseButtonClick(evt) {
  const popup = evt.target.closest('.popup__close');
  closePopup(popup);
}

function handleOverlayClick(evt) { 
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
  }
}

function openPopup(popup) {
    popup.classlist.add('.popup_is-opened');
    document.addEventListener("keydown", handleEscClick);
    console.log(popup);
}

function closePopup(popup) {
  if (!popup) {
    popup.classlist.remove('.popup_is-opened');
    document.removeEventListener('keydown', handleEscClick);
}
}

// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;
    // Элементы, куда должны быть вставлены значения полей
    const userNameElement = document.querySelector('.user__name');
    const userJobElement = document.querySelector('.user__job');
    // Новые значения с помощью textContent
    userNameElement.textContent = name;
    userJobElement.textContent = job;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

const newCardForm = document.querySelector('.popup__form');

newCardForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  // Получаем значения полей ввода
  const cardName = document.querySelector('.popup__input_type_card-name').value;
  const cardImageLink = document.querySelector('.popup__input_type_url').value;

  // Создаем новую карточку
  const newCard = createCard(cardName, cardImageLink);

  // Вставляем новую карточку в начало контейнера
  const cardContainer = document.querySelector('.card-container');
  cardContainer.prepend(newCard);

  // Очищаем форму
  newCardForm.reset();

  // Закрываем диалоговое окно
  closePopup();
}

// ... здесь добавление карточки ... //

const closeButton = document.querySelector('.popup__close');

closeButton.addEventListener('click', closePopupImage);

function closePopupImage() {
  closePopup(popup);
  newCardForm.reset();
}

// ... добавление лайка ... //

const likeButton = document.querySelector('.card__like-button');
likeButton.addEventListener('click', () => {handleLike} );

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_liked');
}