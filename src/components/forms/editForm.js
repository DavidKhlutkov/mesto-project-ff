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
import { handleSubmit } from "../../components/utils.js";
//Поля формы
export function setInitialEditProfileFormValues(dataUser) {
  if (dataUser) {
    nameInput.value = userNameElement.textContent;
    jobInput.value = userJobElement.textContent;
  }
}
//форма редактирования профиля
export function handleFormSubmit(evt) {
  function makeRequest() {
    return patchUser(nameInput.value, jobInput.value)
      .then((dataUser) => {
        setInitialEditProfileFormValues(dataUser);
        closePopup(evt.target.closest(".popup_is-opened"));
        editFormElement.reset();
      });
  }

  handleSubmit(makeRequest, evt, buttonEditProfile);
}
