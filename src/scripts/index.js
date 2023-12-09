import '../pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './cards.js'
import { removeCard, createCard, cardTemplate, likeCard } from './card.js'
import { openModal, closeModal, closePopupByEsc, closePopupClickOvrl } from './modal.js';
import {enableValidation, clearValidation} from "./validation.js";
import {updateUserInfoByApi, getUserInfoByApi, getCardsByApi, addCardApi, deleteCardApi, putLikeCardApi, deleteLikeCardApi, updateUserPhotoByApi} from "./api.js";

const cardContainer = document.querySelector('.places__list');
const pageCont = document.querySelector('.page__content');
const editformElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const UserPhotoInput = document.querySelector('.popup__input_type_avatar_url');;
const jobInput = document.querySelector('.popup__input_type_description');
const addFormElement = document.forms['new-place'];
const editPopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');
const editProfileBtn = document.querySelector('.profile__edit-button');
const createCardBtn = document.querySelector('.profile__add-button');
const closeBtnEditPopup = editPopup.querySelector('.popup__close');
const closeBtnCreateCardPopup = createCardPopup.querySelector('.popup__close');
const imgPopup = document.querySelector('.popup_type_image');
const closeBtnImgPopup = imgPopup.querySelector('.popup__close');
const editProfilePhotoForm = document.forms['profile-photo'];
const editProfilePhotoPopup = document.querySelector('.popup_type_profile-photo');
const profilePhoto = document.querySelector('.profile__image-container');
const closeBtnEditProfilePhotoPopup = editProfilePhotoPopup.querySelector('.popup__close');
const saveBtnAddForm = addFormElement.querySelector('.popup__button');
const saveBtnEditProfileForm = editformElement.querySelector('.popup__button');
const saveBtnEditAvatarForm = editProfilePhotoForm.querySelector('.popup__button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

pageCont.addEventListener('click', closePopupClickOvrl);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editformElement.addEventListener('submit', editProfileFormSubmit);
addFormElement.addEventListener('submit', addCardFormSubmit);
editProfilePhotoForm.addEventListener('submit', editProfilePhotoSubmit);

closeBtnEditPopup.addEventListener('click', closePopupClickBtn);
closeBtnCreateCardPopup.addEventListener('click', closePopupClickBtn);
closeBtnImgPopup.addEventListener('click', closePopupClickBtn);
closeBtnEditProfilePhotoPopup.addEventListener('click', closePopupClickBtn);

editProfileBtn.addEventListener('click', openEditProfilePopup);
createCardBtn.addEventListener('click', openCreateCardPopup);
profilePhoto.addEventListener('click', openEditProfilePhotoPopup);


function closePopupClickBtn(event) {
    const element = event.target.closest('.popup');
    closeModal(element);
}

function editProfileFormSubmit(event) { //ex handleFormSubmit
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    saveBtnEditProfileForm.textContent = 'Сохранение...';
    const newProfileName = nameInput.value;
    const newProfileJob = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = newProfileName;
    profileDesc.textContent = newProfileJob;
    //closePopupSubmit(event);
    updateUserInfoByApi(newProfileName, newProfileJob);
    closeModal(editPopup);
    saveBtnEditProfileForm.textContent = "Сохранить";
}

function addCardFormSubmit(event) {
    event.preventDefault();
    saveBtnAddForm.textContent = 'Сохранение...';
    const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name');
    const cardUrlInput = addFormElement.querySelector('.popup__input_type_url');
    const name = cardNameInput.value;
    const link = cardUrlInput.value;
    addCardApi({name, link}) 
        .then((card) => {
            cardContainer.prepend(createCard(card, removeCard, likeCard, openImgPopup, userID, deleteCardApi, putLikeCardApi, deleteLikeCardApi));
        })
        .catch(error => {
            console.error(error);
        });
    addFormElement.reset();
    closeModal(createCardPopup);
    saveBtnAddForm.textContent = "Сохранить";
}

function editProfilePhotoSubmit(event) { 
    event.preventDefault(); 
    saveBtnEditAvatarForm.textContent = "Сохранение...";
    const profilePhotoUrl = document.querySelector('.profile__image');
    const newUserPhoto = UserPhotoInput.value;
    updateUserPhotoByApi(newUserPhoto)
        .then ( (userData) => {
            console.log(userData)
            profilePhotoUrl.style.backgroundImage = `url(${userData.avatar})`;
        })
    closeModal(editProfilePhotoPopup);
    saveBtnEditAvatarForm.textContent = "Сохранить";
}

function openImgPopup(event) {
    const currentCard = event.target.closest('.card');
    const currentCardImg = event.target.src;
    const currentCardDesc = currentCard.querySelector('.card__description');
    const currentCardTitle = currentCardDesc.querySelector('.card__title').textContent;
    imgPopup.querySelector('.popup__image').src = currentCardImg;
    imgPopup.querySelector('.popup__caption').textContent = currentCardTitle;
    openModal(imgPopup);
}

function openEditProfilePopup(event) {
    clearValidation(editPopup, validationConfig);
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    openModal(editPopup);
}

function openCreateCardPopup(event) {
    addFormElement.reset();
    clearValidation(createCardPopup, validationConfig);
    openModal(createCardPopup);
}

function openEditProfilePhotoPopup (event) {
    //editProfilePhotoForm.reset();
    clearValidation(editProfilePhotoPopup, validationConfig);
    openModal(editProfilePhotoPopup);
}

enableValidation(validationConfig);

let userID;

function initialByApi() {
    Promise.all([getUserInfoByApi(), getCardsByApi()])
    .then((res) => {
        const userInfo = res[0];
        const cardsList = res[1];
        const profileName = document.querySelector('.profile__title');
        const profileDesc = document.querySelector('.profile__description');
        const profilePhotoUrl = document.querySelector('.profile__image');
        profileName.textContent = userInfo.name;
        profileDesc.textContent = userInfo.about;
        userInfo.avatar;
        profilePhotoUrl.style.backgroundImage = `url(${userInfo.avatar})`;
        userID = userInfo._id;
        cardsList.forEach(function(element) {
            document.querySelector('.places__list').append(createCard (element, removeCard, likeCard, openImgPopup, userID, deleteCardApi, putLikeCardApi, deleteLikeCardApi));
        });
        console.log(cardsList);
        console.log(userID);
    })
    .catch(error => {
        console.error(error);
    });
};

initialByApi();



