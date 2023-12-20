export {removeCard, createCard, cardTemplate, likeCard};
//import {deleteCardApi} from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция удаления карточки
function removeCard (event) {
    const cardElement = event.target.closest('.card');
    cardElement.remove();
}

// @todo: Темплейт карточки
function createCard ({cardData, removeCard, likeCard, openImgPopup, userID, deleteCardApi, putLikeCardApi, deleteLikeCardApi}) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImg = cardElement.querySelector('.card__image');
    const likeLbl = cardElement.querySelector('.card__like-count')
    const cardTtl = cardElement.querySelector('.card__title');
    const cardOwnerID = cardData.owner._id;
    const cardId = cardData._id;
    const likeArr = cardData.likes;

    likeLbl.textContent = cardData.likes.length;

    likeArr.forEach(element => {
        if (element._id == userID) {
            likeButton.classList.add('card__like-button_is-active');
        }
    });

    if (cardOwnerID !== userID) {
        removeButton.remove();
    }
    
    cardTtl.textContent = cardData.name;
    cardImg.src = cardData.link; 
    cardImg.alt = cardData.name + ', фото';
    removeButton.addEventListener('click', (event) => {
        deleteCardApi (cardId)
            .then ( (res) => {
                removeCard(event)
            })
            .catch(error => {
                console.error(`Ошибка: ${error}`);
            })
    });
    
    likeButton.addEventListener('click', (event) => {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            deleteLikeCardApi (cardId)
                .then( (likes) => {
                    likeLbl.textContent = likes.likes.length; 
                    likeCard (event); 
                })
                .catch(error => {
                    console.error(`Ошибка: ${error}`);
                })
        } else putLikeCardApi (cardId)
                .then( (likes) => {
                    likeLbl.textContent = likes.likes.length;
                    likeCard (event);
                })
                .catch(error => {
                    console.error(`Ошибка: ${error}`);
                })
    });
    
    cardImg.addEventListener('click', openImgPopup);
    return cardElement;
}

function likeCard (event) {
    event.target.classList.toggle('card__like-button_is-active');
}

