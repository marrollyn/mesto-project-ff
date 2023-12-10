export {openModal, closeModal, closePopupByEsc, closePopupClickOvrl, closePopupClickBtn};

function closePopupByEsc (event) {
    if (event.key === 'Escape'){
        const elmnt = document.querySelector('.popup_is-opened');
        closeModal(elmnt);
    } 
}

function closePopupClickOvrl (event) {
    if (event.target.classList.contains('popup_is-opened')) {
        closeModal(event.target);
    } 
}

function openModal(popup) {
    popup.classList.add('popup_is-animated'); 
    setTimeout(() => popup.classList.add('popup_is-opened'), 1);
    window.addEventListener('keydown', closePopupByEsc);
}

function closeModal (popup) {
    popup.classList.remove('popup_is-opened'); 
    setTimeout(() => popup.classList.remove('popup_is-opened'), 600);
    window.removeEventListener('keydown', closePopupByEsc);
}

function closePopupClickBtn(event) {
    const element = event.target.closest('.popup');
    closeModal(element);
}

