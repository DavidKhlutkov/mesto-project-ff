import {
  avatarFormElement,
  buttonEditAvatar,
  avatarImage,
} from "../constat.js";
import { patchAvatar } from "../api.js";
import { closePopup } from "../modal.js";
import { handleSubmit } from "../../components/utils.js";
// форма добавления аватара
export function handleAvatarFormSubmit(event) {
  function makeRequest() {
    const avatar = avatarFormElement.elements["avatar-link"].value;
    return patchAvatar(avatar)
      .then((res) => {
        console.dir(res.avatar);
        avatarImage.setAttribute("style", `background-image: url('${res.avatar}')`);
        closePopup(avatarFormElement);
      });
  }

  handleSubmit(makeRequest, event, buttonEditAvatar);
}
