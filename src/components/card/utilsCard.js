import { openPopupDelete} from "../forms/deleteForm/deleteForm.js";
import { openPopup } from "../../components/modal.js";
import { handleLikes } from "../likes/utilsLikes.js";
  // открыть попап с картинкой
export function openImagePopup(
    cardImg,
    popupImage,
    popupImageCaption,
    buttonTypeCard
  ) {
    popupImage.src = cardImg.src;
    popupImage.alt = cardImg.alt;
    popupImageCaption.textContent = cardImg.alt;
    openPopup(buttonTypeCard);
  }
  // Объект с колбэками
  export const callbacksObject = {
    deleteCardCallback: openPopupDelete,
    openImageCallback: openImagePopup,
    handleLikesCallback: handleLikes,
  };