import {formElement} from "./constat.js"
// Добавление ерора
const showInputError = (formElement, inputElement, validationConfig) => {
  const {inputErrorClass, errorClass} = validationConfig;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};
// Удаление ерора
const hideInputError = (formElement, inputElement, validationConfig) => {
  const {inputErrorClass, errorClass} = validationConfig;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};
// Проверка на валидность
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Активация кнопки
const hasInvalidInput = (formElement, validationConfig) => {
  const {inputSelector} = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function buttonElementRetern(validationConfig) {
  const {submitButtonSelector} = validationConfig;
  const buttonElement = formElement.querySelector(submitButtonSelector);
  return buttonElement;
}

const toggleButtonState = (formElement, validationConfig, buttonElementRetern) => {
  if (hasInvalidInput(formElement, validationConfig)) {
    buttonElementRetern.setAttribute("disabled", true);
    buttonElementRetern.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElementRetern.removeAttribute("disabled", false);
    buttonElementRetern.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Очистка поля
export function clearAreaValidation(formElement,validationConfig, buttonElementRetern) {
  const {inputSelector} = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
    toggleButtonState(formElement, validationConfig, buttonElementRetern);
  })

}

// Включение валидации
const setEventListeners = (formElement, validationConfig) => { 
  const { inputSelector, submitButtonSelector } = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
// 

 export const enableValidation = (validationConfig) => {
  const { formElement } = validationConfig;
  const formElementList = Array.from(document.querySelectorAll(formElement));
  formElementList.forEach((formElement) => {
  formElement.addEventListener("submit", () => {
    setEventListeners(formElement, validationConfig);
  });
})
 
}

export { enableValidation as validation, clearAreaValidation as clearValidation };
