
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

// @todo: Темплейт карточки
function addCard (cardTitle, cardSrc, removeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardSrc; 
    cardElement.querySelector('.card__image').alt = cardTitle + ', фото';
    
    removeButton.addEventListener('click', function removeCard () {
        removeButton.addEventListener('click', function () {
            const cardElement = removeButton.closest('.card');
            cardElement.remove();
        });
    });
    return cardElement;
}

// @todo: DOM узлы


// @todo: Функция создания карточки


// @todo: Функция удаления карточки
function removeCard () {
    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', function () {
        const cardElement = removeButton.closest('.card');
        cardElement.remove();
    });
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
    const cardElement = cardTemplate.cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name + ', фото';
    removeButton.addEventListener('click', removeCard);
    cardContainer.append(addCard (element.name, element.link, removeCard));
});

function logCharacters(str) {
    debugger;
  
    for(let index = 0; index < str.length; index += 1) {
      console.log(str[index]);
    }
  }
  
  logCharacters('SEGAAAAAA'); 
