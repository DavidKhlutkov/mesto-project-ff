import "./pages/index.css";
import {
    closePopup,
    openPopup,
    handleOverlayClick
} from './components/modal.js';
import {initialCards} from './components/cards.js';
import {
  createCard, 
  renderCards, 
  handleLike, 
  deleteCard, 
  openImagePopup} from './components/card.js';
import {
  buttonEditProfile,
  buttonNewCard,
  buttonTypeCard,
  deleteButtons,
  profileEditButton,
  profileAddButton,
  formElement,
  nameInput,
  placesList,
  jobInput,
  userNameElement,
  userJobElement,
} from './components/constat.js';
// рендеринг начального набора карточек на странице
renderCards(initialCards);
 
//анимация всплывающих окон
buttonEditProfile.classList.add("popup_is-animated");
buttonTypeCard.classList.add("popup_is-animated");
buttonNewCard.classList.add("popup_is-animated");

// функция закрытия открытого попапа написать
deleteButtons.forEach(function (button) {
  button.addEventListener("click", function (evt) {
    evt.target.closest(".popup").classList.add("popup_is-animated");
    evt.target.closest(".popup").classList.remove("popup_is-opened");
  });
})
//Функция, закрывающая попап через оверлей
buttonEditProfile.forEach(function (button) {
  button.addEventListener("mousdown", handleOverlayClick);
});


//форма редактирования профиля
//Поля формы
function setInitialEditProfileFormValues() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}
export function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
// Новые значения с помощью textContent
  userNameElement.textContent = newName;
  userJobElement.textContent = newJob;
// закрыть попап автоматически можно вызовом соответствующей функции
  closePopup(evt.target.closest(".popup_is-opened"));
  formElement.reset(); // очистка формы
}

// открыть попап с данными профиля
profileEditButton.addEventListener("click", () => {
  setInitialEditProfileFormValues();
  openPopup(buttonEditProfile);
});


//форма добавления карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
formElement.addEventListener('submit', handleNewCardFormSubmit );
newCardForm.addEventListener("submit", (event) =>
  handleNewCardFormSubmit(event)
);

// 

function handleNewCardFormSubmit(event) {
    event.preventDefault();
    // Получаем значения полей формы
    const placeNameInput = event.target.querySelector('.popup__input[name="place-name"]');
    const linkInput = event.target.querySelector('.popup__input[name="link"]');
    const placeName = placeNameInput.value;
    const link = linkInput.value;
    // Создаем новую карточку
    const newCard = createCard( { link, name: placeName } , handleLike, deleteCard, openImagePopup );
    // Добавляем новую карточку в начало контейнера для карточек
    placesList.prepend(newCard);
    // Очищаем форму
    placeNameInput.value = '';
    linkInput.value = '';
    // Закрываем диалоговое окно
    closePopup(buttonNewCard);
  }
    


profileAddButton.addEventListener("click", () => {
  openPopup(buttonNewCard);
});