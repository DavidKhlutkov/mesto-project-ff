//функции для открытия и закрытия всплывающих окон,
//также для обработки клавиши escape и слушатель overlay click
const popupsArray = Array.from(document.querySelectorAll('.popup'));

function handlehandleEscClick(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find(popup => popup.classList.contains('.popup_is-opened'));
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleCloseButtonClick(evt) {
  const popup = evt.target.closest('.popup__close');
  closePopup(popup);
}

function handleOverlayClick(evt) { 
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
  }
}

function openPopup(popup) {
  if (!popup) {
    popup.classList.add('.popup_is-opened')
    document.addEventListener("keydown", handleEscClick);
}
}

function closePopup(popup) {
  if (!popup) {
    popup.classList.remove('.popup_is-opened');
    document.removeEventListener('keydown', handleEscClick);
}
}