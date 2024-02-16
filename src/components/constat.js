//кнопки
export const buttonEditProfile = document.querySelectorAll('.popup_type_edit');
export const buttonNewCard = document.querySelectorAll('.popup_type_new-card');
export const buttonTypeCard = document.querySelectorAll('.popup_type_image');
export const deleteButtons = document.querySelectorAll('.popup__close');
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileAddButton = document.querySelector(".profile__add-button");
// Находим форму в DOM
export const formElement = document.querySelector('.popup__form');
// поля формы
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description'); 
// Элементы, куда должны быть вставлены значения полей
export const userNameElement = document.querySelector('.user__name');
export const userJobElement = document.querySelector('.user__job');
// попапы
export const popupsArray = Array.from(document.querySelectorAll('.popup'));
// Контейнер для карточек
export const placesList = document.querySelector(".places__list");
// Попап с картинкой
export const popupImageCaption = document.querySelector(".popup__caption");