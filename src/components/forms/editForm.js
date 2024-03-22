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
export function setInitialEditProfileFormValues(dataUser, name, about) {
  if (dataUser) {
    nameInput.value = name;
    jobInput.value = about;
    userNameElement.textContent = name;
    userJobElement.textContent = about;
  }
}
//форма редактирования профиля
export function handleFormSubmit(evt) {
  function makeRequest() {
    const name = nameInput.value;
    const about = jobInput.value;
    return patchUser(name, about)
      .then((dataUser) => {
        console.dir(dataUser, name, about);
        setInitialEditProfileFormValues(dataUser, name, about);
        closePopup(evt.target.closest(".popup_is-opened"));
        editFormElement.reset();
      });
  }

  handleSubmit(makeRequest, evt, buttonEditProfile);
}
