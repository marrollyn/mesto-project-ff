import {initialCards, removeCard, createCard, cardTemplate, cardContainer, likeCard} from './cards.js';
import {pageCont, formElement, nameInput, jobInput, addFormElement, editPopup, createCardPopup} from './index.js';
export {openImgPopup, openPopupSubFunc, closePopupClickBtn, closePopupClickOvrl, closePopupBtn, openPopup, closePopupSubmit, handleFormSubmit, addCardFormSubmit};


function openPopupSubFunc (element, closeFuncClkBtn, closeFuncClkOvrl, closeFuncBtn) {
    element.classList.add('popup_is-animated');
    setTimeout(() => element.classList.add('popup_is-opened'), 600);
    element.addEventListener('click', closeFuncClkBtn);
    element.addEventListener('click', closeFuncClkOvrl);
    window.addEventListener('keydown', closeFuncBtn);
}

function closePopupClickBtn (event) {
    if (event.target.classList.contains('popup__close')) {
        const element = event.target.closest('.popup');
        element.classList.remove('popup_is-opened');
    }
}

function closePopupClickOvrl (event) {
    if (event.target.classList.contains('popup_is-opened')) {
        event.target.remove('popup_is-opened');
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
        openPopupSubFunc (editPopup, closePopupClickBtn, closePopupClickOvrl, closePopupBtn);
    }
    else if (event.target.classList.contains('profile__add-button')) {
        openPopupSubFunc (createCardPopup, closePopupClickBtn, closePopupClickOvrl, closePopupBtn);
    }
    else if (event.target.classList.contains('card__image')) {
        openImgPopup(event);
    }
}

function openImgPopup (event) {
    const imgPopup = document.querySelector('.popup_type_image'); //ex-globe
    const currentCard = event.target.closest('.card');
    const currentCardImg = event.target.src;
    const currentCardDesc = currentCard.querySelector('.card__description');
    const currentCardTitle = currentCardDesc.querySelector('.card__title').textContent;
    imgPopup.querySelector('.popup__image').src = currentCardImg;
    imgPopup.querySelector('.popup__caption').textContent = currentCardTitle;
    openPopupSubFunc (imgPopup, closePopupClickBtn, closePopupClickOvrl, closePopupBtn);
}

function closePopupSubmit (event) {
    const elmt = event.target.closest('.popup_is-opened');
    elmt.classList.remove('popup_is-opened');
}



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

