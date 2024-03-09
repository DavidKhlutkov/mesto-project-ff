const baseUrl = "https://nomoreparties.co/v1/wff-cohort-7";
const apiRoutes = {
  user: "users/me",
  cards: "cards",
  likes: "likes",
};

const headers = {
  Authorization: "32e48890-9f28-47a5-845e-3c6381af43ab",
  "Content-Type": "application/json",
};

const checkData = (data) => {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Error: ${data.status}`);
  }
};

const getCards = () => {
  return fetch(`${baseUrl}/${apiRoutes.cards}`, {
    method: "GET",
    headers,
  }).then(checkData);
};

const postCard = (data) => {
  return fetch(`${baseUrl}/${apiRoutes.cards}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(checkData);
};

const deleteCardApi = (cardId) => {
  return fetch(`${baseUrl}/${apiRoutes.cards}/${cardId}`, {
    method: "DELETE",
    headers,
  }).then(checkData);
};

const getUser = () => {
  return fetch(`${baseUrl}/${apiRoutes.user}`, {
    method: "GET",
    headers,
  }).then(checkData);
};

const patchUser = (dataUser) => {
  return fetch(`${baseUrl}/${apiRoutes.user}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name: dataUser.name,
      about: dataUser.about,
    }).then(checkData)
  });
}

const addLikeCard = (cardId) => {
  return fetch(`${baseUrl}/${apiRoutes.cards}/${cardId}/${apiRoutes.likes}`, {
    method: "PUT",
    headers,
  }).then(checkData);
};

const deleteLikeCard = (cardId) => {
  return fetch(`${baseUrl}/${apiRoutes.cards}/${cardId}/${apiRoutes.likes}`, {
    method: "DELETE",
    headers,
  }).then(checkData);
};

const getAvatar = (avatar) => {
  return fetch(`${baseUrl}/${apiRoutes.user}/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar: avatar }),
  }).then(checkData);
};
export {
  getCards,
  postCard,
  deleteCardApi,
  getUser,
  patchUser,
  addLikeCard,
  deleteLikeCard,
  getAvatar
}