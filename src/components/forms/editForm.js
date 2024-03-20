import { patchUser } from "../../components/api.js";
import { closePopup } from "../../components/modal.js";
import {
  buttonEditProfile,
  nameInput,
  jobInput,
  editFormElement,
  userJobElement,
  userNameElement,
} from "../../components/constat.js";

//Поля формы
export function setInitialEditProfileFormValues(dataUser) {
  if (dataUser) {
    nameInput.value = userNameElement.textContent;
    jobInput.value = userJobElement.textContent;
  }
}
//форма редактирования профиля
export function handleFormSubmit(evt) {
  evt.preventDefault();
  buttonEditProfile.textContent = "Сохранение...";
  // отправка данных профиля
  patchUser(nameInput.value, jobInput.value)
    .then((dataUser) => {
      setInitialEditProfileFormValues(dataUser);
      closePopup(evt.target.closest(".popup_is-opened"));
      editFormElement.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при редактировании профиля:", err);
    })
    .finally(() => {
      buttonEditProfile.textContent = "Сохранить";
    });
}
