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

function request(endpoint, options) {
  return fetch(`${baseUrl}/${endpoint}`, options).then(checkData);
}

const getCards = () => {
  return request(apiRoutes.cards, {
    method: "GET",
    headers,
  });
};

const postCard = (name, link) => {
  return request(apiRoutes.cards, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

const deleteCardApi = (cardId) => {
  return request(`${apiRoutes.cards}/${cardId}`, {
    method: "DELETE",
    headers,
  });
};

const getUser = () => {
  return request(apiRoutes.user, {
    method: "GET",
    headers,
  });
};

const patchUser = (name, about) => {
  return request(apiRoutes.user, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

const addLikeCard = (id)  => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "PUT",
    headers
  });
};

const deleteLikeCard = (id) => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "DELETE",
    headers,
  });
};

const getAvatar = (avatar) => {
  return request(`${apiRoutes.user}/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar: avatar }),
  });
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