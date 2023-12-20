export {updateUserInfoByApi, getUserInfoByApi, getCardsByApi, addCardApi, deleteCardApi, putLikeCardApi, deleteLikeCardApi, updateUserPhotoByApi};

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
    headers: {
        authorization:
        '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json',
    },
};

function updateUserInfoByApi(newProfileName, newProfileJob) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
            name: newProfileName,
            about: newProfileJob}),
        headers: config.headers,
    }) 
    .then((res) => getResponseData(res));
}

function getUserInfoByApi() {
    return fetch(config.baseUrl + '/users/me', {
        headers: config.headers,
    })
    .then((res) => getResponseData(res));
}

function getResponseData (res) {
    console.log(res);
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

function getCardsByApi() {
    return fetch(config.baseUrl + '/cards', {
        method: 'GET',
        headers: config.headers,
    })
    .then((res) => getResponseData(res));
};

function addCardApi(card) {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        body: JSON.stringify({
            name: card.name,
            link: card.link}),
        headers: config.headers,
    }) 
    .then((res) => getResponseData(res));
}

function deleteCardApi (cardId) {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }) 
    .then((res) => getResponseData(res));
}

function putLikeCardApi (cardId) {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }) 
    .then((res) => getResponseData(res));
}

function deleteLikeCardApi (cardId) {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }) 
    .then((res) => getResponseData(res));
};

function updateUserPhotoByApi(userPhoto) {
    return request(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: userPhoto
        }),
        headers: config.headers,
    }) 
};

function request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(getResponseData);
};

