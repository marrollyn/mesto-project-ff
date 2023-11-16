import '../pages/index.css'; // добавьте импорт главного файла стилей
import {initialCards} from './cards.js'
import {removeCard, createCard, cardTemplate, cardContainer, likeCard} from './card.js'
import {openModal, closeModal, closePopupByEsc, closePopupClickOvrl} from './modal.js';
export {openImgPopup};

const pageCont = document.querySelector('.page__content');
const editformElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const addFormElement = document.forms['new-place']; 
const editPopup = document.querySelector('.popup_type_edit'); 
const createCardPopup = document.querySelector('.popup_type_new-card');
const editProfileBtn = document.querySelector('.profile__edit-button');
const createCardBtn = document.querySelector('.profile__add-button');
const closeBtnEditPopup = editPopup.querySelector('.popup__close');
const closeBtnCreateCardPopup = createCardPopup.querySelector('.popup__close');
const imgPopup = document.querySelector('.popup_type_image'); //ex-globe
const closeBtnImgPopup = imgPopup.querySelector('.popup__close');

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editformElement.addEventListener('submit', editProfileFormSubmit); 
addFormElement.addEventListener('submit', addCardFormSubmit);

closeBtnEditPopup.addEventListener('click', closePopupClickBtn);
closeBtnCreateCardPopup.addEventListener('click', closePopupClickBtn);
closeBtnCreateCardPopup.addEventListener('click', closePopupClickBtn);
closeBtnImgPopup.addEventListener('click', closePopupClickBtn);
pageCont.addEventListener('click', closePopupClickOvrl);


editProfileBtn.addEventListener('click', () => {
    openModal(editPopup)
});
//editProfileBtn.addEventListener('click', openModal(editPopup));
//editProfileBtn.addEventListener('click', () => console.log('123'));

createCardBtn.addEventListener('click', () => {
    openModal(createCardPopup);
});

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

function closePopupClickBtn (event) {
    const element = event.target.closest('.popup');
    closeModal (element);
}

function editProfileFormSubmit(event) { //ex handleFormSubmit
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    
    const newProfileName = nameInput.value; 
    const newProfileJob = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = newProfileName; 
    profileDesc.textContent = newProfileJob;
    //closePopupSubmit(event);
    closeModal(editPopup);
}
    
function addCardFormSubmit(event) {
    event.preventDefault();
    const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name');
    const cardUrlInput = addFormElement.querySelector('.popup__input_type_url');
    const cardName = cardNameInput.value;
    const cardUrl = cardUrlInput.value;
    cardContainer.prepend(createCard(cardName, cardUrl, removeCard, likeCard, openImgPopup));
    addFormElement.reset();
    closeModal(createCardPopup);
}
    
function openImgPopup (event) {
    const currentCard = event.target.closest('.card');
    const currentCardImg = event.target.src;
    const currentCardDesc = currentCard.querySelector('.card__description');
    const currentCardTitle = currentCardDesc.querySelector('.card__title').textContent;
    imgPopup.querySelector('.popup__image').src = currentCardImg;
    imgPopup.querySelector('.popup__caption').textContent = currentCardTitle;
    openModal(imgPopup);
}