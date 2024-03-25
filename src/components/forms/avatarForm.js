import {
  avatarForm,
  avatarFormElement,
  avatarImage,
} from "../constats.js";
import { patchAvatar } from "../api.js";
import { closePopup } from "../modal.js";
import { handleSubmit } from "./utilsForms.js";
// форма добавления аватара
export function handleAvatarFormSubmit(event) {
  function makeRequest() {
    const avatar = avatarFormElement.elements["avatar-link"].value;
    return patchAvatar(avatar)
      .then((res) => {
        avatarImage.setAttribute("style", `background-image: url('${res.avatar}')`);
        console.log("Closing popup...");
        closePopup(avatarForm);
      });
  }

  handleSubmit(makeRequest, event);
}
