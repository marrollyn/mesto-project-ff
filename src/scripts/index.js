import '../pages/index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './cards.js'
import { removeCard, createCard, cardTemplate, likeCard } from './card.js'
import { openModal, closeModal, closePopupByEsc, closePopupClickOvrl, closePopupClickBtn } from './modal.js';
import {enableValidation, clearValidation} from "./validation.js";
import {updateUserInfoByApi, getUserInfoByApi, getCardsByApi, addCardApi, deleteCardApi, putLikeCardApi, deleteLikeCardApi, updateUserPhotoByApi} from "./api.js";
import {cardContainer, pageCont, editFormElement, nameInput, UserPhotoInput, jobInput, addFormElement, editPopup, createCardPopup, editProfileBtn, createCardBtn, imgPopup, openedImgPopup, descOpenedImgPopup, editProfilePhotoForm, editProfilePhotoPopup, profilePhoto, popups, profileName, profileDesc, profilePhotoUrl, validationConfig, cardNameInput, cardUrlInput} from './constants.js';
import {renderLoading} from './utils.js';

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleCardFormSubmit);
editProfilePhotoForm.addEventListener('submit', handleAvatarFormSubmit);

editProfileBtn.addEventListener('click', openEditProfilePopup);
createCardBtn.addEventListener('click', openCreateCardPopup);
profilePhoto.addEventListener('click', openEditProfilePhotoPopup);

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_is-opened')) {
            closeModal(event.target);
        };
        if (event.target.classList.contains('popup__close')) {
            closeModal(popup);
        };
    });
})

function handleProfileFormSubmit(event) { 
    event.preventDefault(); // Эта строчка отменяет стандартную отправку 
    //event.submitter.textContent = 'Сохранение...';
    renderLoading(true, event.submitter);
    const newProfileName = nameInput.value;
    const newProfileJob = jobInput.value;
    updateUserInfoByApi(newProfileName, newProfileJob)
        .then((userData) => {
            profileName.textContent = userData.name;
            profileDesc.textContent = userData.about;
            closeModal(editPopup);
        })
        .catch(error => {
            console.error(`Ошибка: ${error}`);
        })
        .finally(() => {
            renderLoading(false, event.submitter);
        });
}

function handleCardFormSubmit(event) {
    event.preventDefault();
    renderLoading(true, event.submitter);
    
    const name = cardNameInput.value;
    const link = cardUrlInput.value;
    addCardApi({name, link}) 
        .then((card) => {
            cardContainer.prepend(createCard(card, removeCard, likeCard, openImgPopup, userID, deleteCardApi, putLikeCardApi, deleteLikeCardApi));
            closeModal(createCardPopup);
        })
        .catch(error => {
            console.error(`Ошибка: ${error}`);
        })
        .finally(() => {
            renderLoading(false, event.submitter);
        });
}

function handleAvatarFormSubmit(event) { 
    event.preventDefault(); 
    renderLoading(true, event.submitter);
    const newUserPhoto = UserPhotoInput.value;
    updateUserPhotoByApi(newUserPhoto)
        .then ( (userData) => {
            profilePhotoUrl.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(editProfilePhotoPopup);
        })
        .catch(error => {
            console.error(`Ошибка: ${error}`);
        })
        .finally(() => {
            renderLoading(false, event.submitter);
        });
}

function openImgPopup(event) {
    const currentCard = event.target.closest('.card');
    const currentCardImg = event.target.src;
    const currentCardDesc = currentCard.querySelector('.card__description');
    const currentCardTitle = currentCardDesc.querySelector('.card__title').textContent;
    openedImgPopup.src = currentCardImg;
    descOpenedImgPopup.textContent = currentCardTitle;
    openedImgPopup.alt = currentCardTitle + ', фото';
    openModal(imgPopup);
}

function openEditProfilePopup(event) {
    clearValidation(editPopup, validationConfig);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
    openModal(editPopup);
}

function openCreateCardPopup(event) {
    addFormElement.reset();
    clearValidation(createCardPopup, validationConfig);
    openModal(createCardPopup);
}

function openEditProfilePhotoPopup (event) {
    editProfilePhotoForm.reset();
    clearValidation(editProfilePhotoPopup, validationConfig);
    openModal(editProfilePhotoPopup);
}

enableValidation(validationConfig);

let userID;

function initialByApi() {
    Promise.all([getUserInfoByApi(), getCardsByApi()])
    .then(([userInfo, cardsList]) => {
        profileName.textContent = userInfo.name;
        profileDesc.textContent = userInfo.about;
        userInfo.avatar;
        profilePhotoUrl.style.backgroundImage = `url(${userInfo.avatar})`;
        userID = userInfo._id;
        cardsList.forEach(function(element) {
            cardContainer.append(createCard (element, removeCard, likeCard, openImgPopup, userID, deleteCardApi, putLikeCardApi, deleteLikeCardApi));
        });
    })
    .catch(error => {
        console.error(`Ошибка: ${error}`);
    })
};

initialByApi();



