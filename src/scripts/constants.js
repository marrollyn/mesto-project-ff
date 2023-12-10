export {
    cardContainer, pageCont, editFormElement, nameInput, UserPhotoInput, jobInput, addFormElement, editPopup, createCardPopup, editProfileBtn, createCardBtn, imgPopup, openedImgPopup, descOpenedImgPopup, editProfilePhotoForm, editProfilePhotoPopup, profilePhoto, popups, profileName, profileDesc, profilePhotoUrl, validationConfig, cardNameInput, cardUrlInput 

};


const cardContainer = document.querySelector('.places__list');
const pageCont = document.querySelector('.page__content');
const editFormElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const UserPhotoInput = document.querySelector('.popup__input_type_avatar_url');;
const jobInput = document.querySelector('.popup__input_type_description');
const addFormElement = document.forms['new-place'];
const editPopup = document.querySelector('.popup_type_edit');
const createCardPopup = document.querySelector('.popup_type_new-card');
const editProfileBtn = document.querySelector('.profile__edit-button');
const createCardBtn = document.querySelector('.profile__add-button');
const imgPopup = document.querySelector('.popup_type_image');
const openedImgPopup = imgPopup.querySelector('.popup__image');
const descOpenedImgPopup = imgPopup.querySelector('.popup__caption');
const editProfilePhotoForm = document.forms['profile-photo'];
const editProfilePhotoPopup = document.querySelector('.popup_type_profile-photo');
const profilePhoto = document.querySelector('.profile__image-container');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profilePhotoUrl = document.querySelector('.profile__image');
const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addFormElement.querySelector('.popup__input_type_url');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};