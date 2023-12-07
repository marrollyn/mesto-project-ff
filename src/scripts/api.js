
function getCardsByApi() {
    fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
        method: 'GET',
        headers: {
            authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3'
        }
    })
    .then((res) => {
        return res.json();
    })
    .then((cards) => {
    console.log(cards);
    cards.forEach(function(element) {
        cardContainer.append(createCard (element.name, element.link, removeCard, likeCard, openImgPopup));
    });
    });
};

function getUserInfoByApi() {
    fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
        headers: {
        authorization: '73cd315f-54c6-4681-84c4-826e15c27bc3'
        }
    })
    .then(res => res.json())
    .then((result) => {
    console.log(result);
    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');
    profileName.textContent = result.name;
    profileDesc.textContent = result.about;
    }); 
}