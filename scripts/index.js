
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

// @todo: Темплейт карточки
function addCard (cardTitle, cardSrc, removeCard) {
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
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name + ', фото';
    cardContainer.append(addCard (element.name, element.link, removeCard));
});


