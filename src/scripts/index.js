import '../pages/index.css'; // добавьте импорт главного файла стилей

import {openImgPopup, openPopupSubFunc, closePopupClickBtn, closePopupClickOvrl, closePopupBtn, openPopup, closePopupSubmit, handleFormSubmit, addCardFormSubmit} from './modal.js';

import {initialCards, removeCard, createCard, cardTemplate, cardContainer, likeCard} from './cards.js'

export {pageCont, formElement, nameInput, jobInput, addFormElement, editPopup, createCardPopup};

const pageCont = document.querySelector('.page__content');

const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const addFormElement = document.forms['new-place']; 
const editPopup = document.querySelector('.popup_type_edit'); 
const createCardPopup = document.querySelector('.popup_type_new-card'); 

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
    cardContainer.append(createCard (element.name, element.link, removeCard, likeCard));
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

addFormElement.addEventListener('submit', addCardFormSubmit);

pageCont.addEventListener('click', openPopup);
