import {popupsArray} from './constat.js';
//функции для открытия и закрытия всплывающих окон,
//также для обработки клавиши escape и слушатель overlay click
function handleEscClick(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find(popup => popup.classList.contains('.popup_is-opened'));
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlayClick(evt) { 
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
  }
}

function openPopup(popup) {
  console.log(popup);
    popup.classList.add('popup_is-opened');
    document.addEventListener("keydown", handleEscClick);
}

function closePopup(popup) {
  if (!popup) {
    popup.classlist.remove('.popup_is-opened');
    document.removeEventListener('keydown', handleEscClick);
}
}

export { 
    handleOverlayClick,
    closePopup, 
    openPopup
};