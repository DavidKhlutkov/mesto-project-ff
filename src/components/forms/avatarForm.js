import {
  avatarFormElement,
  buttonEditAvatar,
  avatarImage,
} from "../constat.js";
import { patchAvatar } from "../api.js";
// форма добавления аватара
export function handleAvatarFormSubmit(event) {
  event.preventDefault();
  buttonEditAvatar.textContent = "Сохранение...";
  const avatar = avatarFormElement.elements["avatar-link"].value;
  patchAvatar(avatar)
    .then((avatar) => {
      avatarImage.setAttribute("style", `background-image: url('${avatar}')`);
      closePopup(avatarFormElement);
      avatarFormElement.reset();
    })
    .catch((err) => {
      console.log("Произошла ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      buttonEditAvatar.textContent = "Сохранить";
    });
}
