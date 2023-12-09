export {updateUserInfoByApi, getUserInfoByApi, getCardsByApi, addCardApi, deleteCardApi, putLikeCardApi, deleteLikeCardApi, updateUserPhotoByApi};


function updateUserInfoByApi(newProfileName, newProfileJob) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
            name: newProfileName,
            about: newProfileJob}),
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json'
        }
    }) 
    .then((res) => getResponseData(res));
}

function getUserInfoByApi() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3'
        }
    })
    .then((res) => getResponseData(res));
}

function getResponseData (res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

function getCardsByApi() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
        method: 'GET',
        headers: {
            authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3'
        }
    })
    .then((res) => getResponseData(res));
};

function addCardApi(card) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
        method: 'POST',
        body: JSON.stringify({
            name: card.name,
            link: card.link}),
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json'
        }
    }) 
    .then((res) => getResponseData(res));
}

function deleteCardApi (cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json'
        }
    }) 
    .then((res) => getResponseData(res));
}

function putLikeCardApi (cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json'
        }
    }) 
    .then((res) => getResponseData(res));
}

function deleteLikeCardApi (cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json'
        }
    }) 
    .then((res) => getResponseData(res));
};

function updateUserPhotoByApi(UserPhoto) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: UserPhoto
        }),
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json'
        }
    }) 
    .then((res) => {
        console.log(res)
        return getResponseData(res)
    })
};