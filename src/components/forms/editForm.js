import { patchUser } from "../../components/api.js";
import { closePopup } from "../../components/modal.js";
import {
  nameInput,
  jobInput,
  userJobElement,
  userNameElement,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";
//Поля формы
export function setInitialEditProfileFormValues(dataUser) {
  if (dataUser) {
    const name = dataUser.name;
    const about = dataUser.about;
    nameInput.value = name;
    jobInput.value = about;
    userNameElement.textContent = name;
    userJobElement.textContent = about;
  }
}
//форма редактирования профиля
export function handleFormSubmit(evt) {
  function makeRequest() {
    return patchUser(dataUser.name, dataUser.about)
      .then((dataUser) => {
        console.dir(dataUser, name, about);
        setInitialEditProfileFormValues(dataUser);
        closePopup(evt.target.closest(".popup_is-opened"));
      });
  }

  handleSubmit(makeRequest, evt);
}
