export {initialCards, removeCard, createCard, cardTemplate, cardContainer, likeCard};
import {openImgPopup} from './modal.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

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