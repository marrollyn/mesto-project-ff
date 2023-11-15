export {removeCard, createCard, cardTemplate, cardContainer, likeCard};
import {initialCards} from './cards.js';
import {openImgPopup} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

// @todo: Функция удаления карточки
function removeCard (event) {
    const cardElement = event.target.closest('.card');
    cardElement.remove();
}

// @todo: Темплейт карточки
function createCard (cardTitle, cardSrc, removeCard, likeCard, openImgPopup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardSrc; 
    cardElement.querySelector('.card__image').alt = cardTitle + ', фото';
    removeButton.addEventListener('click', removeCard);
    return cardElement;
}

function likeCard (event) {
    if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
    }
}

cardContainer.addEventListener('click', likeCard);