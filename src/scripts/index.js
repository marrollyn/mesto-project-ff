import '../pages/index.css'; // добавьте импорт главного файла стилей
import {initialCards} from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');


const editPopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');
const pageCont = document.querySelector('.page__content');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

function openPopupSubFunc (element, closeFuncClk, closeFuncBtn) {
    element.classList.add('popup_is-opened');
    element.addEventListener('click', closeFuncClk);
    window.addEventListener('keydown', closeFuncBtn);
}

function closePopupClick (event) {
    if (event.target.classList.contains('popup_is-opened')) {
        event.target.remove('popup_is-opened');
    } 
    else if (event.target.classList.contains('popup__close')) {
        const element = event.target.closest('.popup');
        element.classList.remove('popup_is-opened');
    }

}

function closePopupBtn (event) {
    if (event.key === 'Escape'){
    const elmnt = document.querySelector('.popup_is-opened');
    elmnt.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closePopupBtn);
    } 
}

function openPopup (event) {
    if (event.target.classList.contains('profile__edit-button')) {
        openPopupSubFunc (editPopup, closePopupClick, closePopupBtn);
    }
    else if (event.target.classList.contains('profile__add-button')) {
        openPopupSubFunc (createCardPopup, closePopupClick, closePopupBtn);
    }
}

pageCont.addEventListener('click', openPopup);

const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');




function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.
// О том, как это делать, расскажем позже.

// Получите значение полей jobInput и nameInput из свойства value
    document.querySelector('.profile__title').textContent = nameInput.value;
    const newProfileName = nameInput.value; 
    const newProfileJob = jobInput.value;
// Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');
// Вставьте новые значения с помощью textContent
    profileName.textContent = newProfileName; 
    profileDesc.textContent = newProfileJob;
    const elmt = evt.target.closest('.popup_is-opened');
    elmt.classList.remove('popup_is-opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', handleFormSubmit); 


















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
