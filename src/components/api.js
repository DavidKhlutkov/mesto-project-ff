// Токен: 32e48890-9f28-47a5-845e-3c6381af43ab
// Идентификатор группы: wff-cohort-7
// Создаем GET-запрос
/*
fetch('https://example.com/api/cards', {
  headers: {
    'Authorization': '32e48890-9f28-47a5-845e-3c6381af43ab'
  }
})
  .then(res => res.json()) // Преобразуем ответ в JSON
  .then(data => {
    // Используем полученные данные для отрисовки карточек и информации о пользователе
    renderCards(data.cards);
    renderUserInfo(data.user);
  })
  .catch(error => {
    // Обрабатываем ошибку, если запрос не удался
    console.error('Error:', error);
  });

function renderCards(cards) {
  // Отрисовываем карточки на странице
}

function renderUserInfo(user) {
  // Отрисовываем информацию о пользователе на странице
}

// Обработчик сабмита формы создания карточки
document.forms.createCard.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const title = event.currentTarget.elements.title.value;
    const description = event.currentTarget.elements.description.value;
  
    createCard({ title, description });
  });
  
  function createCard(newCard) {
    // Отправляем POST-запрос на сервер для создания новой карточки
    fetch('https://example.com/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '32e48890-9f28-47a5-845e-3c6381af43ab'
      },
      body: JSON.stringify(newCard)
    })
      .then(res => res.json()) // Преобразуем ответ в JSON
      .then(data => {
        // Используем полученные данные для отрисовки новой карточки
        renderNewCard(data);
      })
      .catch(error => {
        // Обрабатываем ошибку, если запрос не удался
        console.error('Error:', error);
      });
  }
  
  function renderNewCard(card) {
    // Отрисовываем новую карточку на странице
  }

  function deleteCard(cardId) {
    // Отправляем DELETE-запрос на сервер для удаления карточки
    fetch(`https://example.com/api/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer 32e48890-9f28-47a5-845e-3c6381af43ab'
      }
    })
      .then(() => {
        // Удаляем отрисованную карточку на странице
        removeRenderedCard(cardId);
      })
      .catch(error => {
        // Обрабатываем ошибку, если запрос не удался
        console.error('Error:', error);
      });
  }
  
  function removeRenderedCard(cardId) {
    // Удаляем отрисованную карточку на странице
  }*/