// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
//Поля формы
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
export function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

// Элементы, куда должны быть вставлены значения полей
  const userNameElement = document.querySelector('.user__name');
  const userJobElement = document.querySelector('.user__job');
// Новые значения с помощью textContent
  userNameElement.textContent = newName;
  userJobElement.textContent = newJob;

// закрыть попап автоматически можно вызовом соответствующей функции
  closePopup(evt.target.closest(".popup_is-opened"));
  formElement.reset();
}


