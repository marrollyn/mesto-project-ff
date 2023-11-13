import '../pages/index.css'; // добавьте импорт главного файла стилей
import {initialCards} from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');


const editPopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function() {
    editPopup.classList.add('popup_is-opened');
});



// @todo: Темплейт карточки
function createCard (cardTitle, cardSrc, removeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardSrc; 
    cardElement.querySelector('.card__image').alt = cardTitle + ', фото';
    removeButton.addEventListener('click', removeCard);
    return cardElement;
}

// @todo: DOM узлы


// @todo: Функция создания карточки


// @todo: Функция удаления карточки
function removeCard (event) {
    const cardElement = event.target.closest('.card');
    cardElement.remove();

}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
    cardContainer.append(createCard (element.name, element.link, removeCard));
});


// document.addEventListener('click', function(event) {
//     if (!popupEdit.contains(event.target)) {
//         closePopup(popupEdit);
//     }



// const popupNCard = document.querySelector('.popup_type_new-card');
// const popupEdit = document.querySelector('.popup_type_edit');
// const popupProfile = popupEdit.querySelector('.popup__content');
// const profileEditBTN = popupEdit.querySelector('.profile__edit-button ');

// function showPopup (event) {
//     // const popup = event.target.closest('.popup');
//     popupEdit.classList.add('.popup_is-opened')
// }

// profileEditBTN.addEventListener('click', showPopup()); 


// profileEditBTN.addEventListener('click', function() {
//     popupProfile.classList.add('.popup_is-opened');
// })





function logCharacters(str) {
    debugger;

    for(let index = 0; index < str.length; index += 1) {
    console.log(str[index]);
    }
}

logCharacters('SEGAAAAAA');
