export {openModal, closeModal, closePopupByEsc, closePopupClickOvrl};

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

function openModal(element) {
    element.classList.add('popup_is-animated'); 
    setTimeout(() => element.classList.add('popup_is-opened'), 600);
    window.addEventListener('keydown', closePopupByEsc);
}

function closeModal (popup) {
    popup.classList.remove('popup_is-opened'); 
    window.removeEventListener('keydown', closePopupByEsc);
}


