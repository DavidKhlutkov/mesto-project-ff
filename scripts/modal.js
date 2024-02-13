//функции для открытия и закрытия всплывающих окон,
//также для обработки клавиши escape и слушатель overlay click
const popupsArray = Array.from(document.querySelectorAll('.popup'));


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
    popup.classlist.add('.popup_is-opened');
    document.addEventListener("keydown", handleEscClick);
    console.log(popup);
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