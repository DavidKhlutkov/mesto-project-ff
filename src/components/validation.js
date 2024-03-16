// Добавление ерора
const showInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
// Удаление ерора
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};


// Проверка на валидность
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationConfig);
  } else {
      hideInputError(formElement, inputElement, validationConfig);
  }
};

// Проверить, есть ли хотя бы один инпут непрошедший валидацию
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
}

// Переключить состояние кнопки
const toggleButtonState = (inputList, validationConfig, buttonElementReturn) => {
  if (hasInvalidInput(inputList)) {
      buttonElementReturn.setAttribute("disabled", true);
      buttonElementReturn.classList.add(validationConfig.inactiveButtonClass);
  } else {
      buttonElementReturn.removeAttribute("disabled", false);
      buttonElementReturn.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Включение валидации
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, validationConfig, buttonElement);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
          checkInputValidity(formElement, inputElement, validationConfig);
          toggleButtonState(inputList, validationConfig, buttonElement);
      });
  });
};

// Циклическое добавление валидации ко всем формам попапов
const enableValidation = (validationConfig) => {
  const formElementList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formElementList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
  })

}

// Очистка поля
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElementReturn = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => hideInputError(formElement, inputElement, validationConfig));
  toggleButtonState(inputList, validationConfig, buttonElementReturn);
}

export { enableValidation as validation, clearValidation };

