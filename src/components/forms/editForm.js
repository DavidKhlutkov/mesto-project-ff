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
export function setInitialEditProfileFormValues() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}
//форма редактирования профиля
export function handleFormSubmit(evt) {
  function makeRequest() {
    const name = nameInput.value;
    const about = jobInput.value;
    return patchUser(name, about)
      .then((dataUser) => {
        userNameElement.textContent = dataUser.name;
        userJobElement.textContent = dataUser.about;
        console.dir(name, about);
        setInitialEditProfileFormValues();
        closePopup(evt.target.closest(".popup_is-opened"));
      });
  }

  handleSubmit(makeRequest, evt);
}
