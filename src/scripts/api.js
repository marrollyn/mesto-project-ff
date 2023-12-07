export {updateUserInfoByApi, getUserInfoByApi, getCardsByApi};
import {createCard,removeCard, likeCard} from './card.js'

function updateUserInfoByApi(newProfileName, newProfileJob) {
    fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
            name: newProfileName,
            about: newProfileJob}),
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3',
        'Content-Type': 'application/json'
        }
    }) 
    .then(res => res.json())
    // .catch(error => {
    //     console.error(error);
    // });
}

function getUserInfoByApi() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3'
        }
    })
    .then(res => res.json())
    // .then((result) => {
    // console.log(result);
    // const profileName = document.querySelector('.profile__title');
    // const profileDesc = document.querySelector('.profile__description');
    // const userID = result._id;
    // profileName.textContent = result.name;
    // profileDesc.textContent = result.about;
    // console.log(userID);
    // }); 
}

function getResponce (res) {
    return;
}

function getCardsByApi() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
        method: 'GET',
        headers: {
            authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3'
        }
    })
    .then((res) => {
        return res.json();
    })
    // .then((cards) => {
    // console.log(cards);
    // cards.forEach(function(element) {
    //     document.querySelector('.places__list').append(createCard (element.name, element.link, removeCard, likeCard, openImgPopup));
    // });
    // })
    // .catch(error => {
    //     console.error(error);
    // });
};

// function initialByApi() {
//     new Promise.all([getUserInfoByApi(), getCardsByApi()])
//     .then((res) => {
//         const userInfo = res[0];
//         const cardsList = res[1];
//         const profileName = document.querySelector('.profile__title');
//         const profileDesc = document.querySelector('.profile__description');
//         const userID = userInfo._id;
//         profileName.textContent = result.name;
//         profileDesc.textContent = result.about;
//         console.log(userID);
//         cardsList.forEach(function(element) {
//             document.querySelector('.places__list').append(createCard (element.name, element.link, removeCard, likeCard, openImgPopup));
//         });
//         console.log(cardsList);
//     })
//     .catch(error => {
//         console.error(error);
//     });
// };


