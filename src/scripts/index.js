import '../pages/index.css'; // добавьте импорт главного файла стилей
import {initialCards, removeCard, createCard, cardTemplate, cardContainer} from './cards.js';
export {likeCard, openImgPopup};

const editPopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');
const pageCont = document.querySelector('.page__content');
const imgPopup = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

function openPopupSubFunc (element, closeFuncClk, closeFuncBtn) {
    element.classList.add('popup_is-animated');
    setTimeout(() => element.classList.add('popup_is-opened'), 600);
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
    else if (event.target.classList.contains('card__image')) {
        openImgPopup(event);
    }
}

function openImgPopup (event) {
    const currentCard = event.target.closest('.card');
    const currentCardImg = event.target.src;
    const currentCardDesc = currentCard.querySelector('.card__description');
    const currentCardTitle = currentCardDesc.querySelector('.card__title').textContent;
    imgPopup.querySelector('.popup__image').src = currentCardImg;
    imgPopup.querySelector('.popup__caption').textContent = currentCardTitle;
    openPopupSubFunc (imgPopup, closePopupClick, closePopupBtn);
}

pageCont.addEventListener('click', openPopup);

function closePopupSubmit (event) {
    const elmt = event.target.closest('.popup_is-opened');
    elmt.classList.remove('popup_is-opened');
}

const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

function handleFormSubmit(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
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
    closePopupSubmit(event);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

const addFormElement = document.forms['new-place'];

function addCardFormSubmit(event, likeCard, openImgPopup) {
    event.preventDefault();
    const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name');
    const cardUrlInput = addFormElement.querySelector('.popup__input_type_url');
    const cardName = cardNameInput.value;
    const cardUrl = cardUrlInput.value;
    const newCard = {
    name: cardName,
    link: cardUrl
    }   
    cardContainer.prepend(createCard(newCard.name, newCard.link, removeCard, likeCard, openImgPopup));
    cardNameInput.value = '';
    cardUrlInput.value = '';
    closePopupSubmit(event);
}

addFormElement.addEventListener('submit', addCardFormSubmit); 

function likeCard (event) {
    if (event.target.classList.contains('card__like-button')) {
        event.target.classList.toggle('card__like-button_is-active');
    }
}
    
cardContainer.addEventListener('click', likeCard);



















// @todo: DOM узлы
// @todo: Функция создания карточки





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
