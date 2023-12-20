export {enableValidation, clearValidation};

const showError = (formElement, input, errorMessage, inputErrorClass, errorClass) => {
    // добавьте класс ошибки элементу input
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
      // 2. Установите errorMessage в качестве значения textContent для formError.
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideError = (formElement, input, inputErrorClass, errorClass) => {
    // удалите класс ошибки с элемента input
    const errorElement = formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, popupInput, inputErrorClass, errorClass) => {
      // напишите код здесь
    if (popupInput.validity.patternMismatch) {
          // встроенный метод setCustomValidity принимает на вход строку
          // и заменяет ею стандартное сообщение об ошибке
        popupInput.setCustomValidity(popupInput.dataset.errorMessage);
    } else {
          // если передать пустую строку, то будут доступны
          // стандартные браузерные сообщения
        popupInput.setCustomValidity("");
    }
    if(!popupInput.validity.valid) {
        showError(formElement, popupInput, popupInput.validationMessage, inputErrorClass, errorClass);
    } else {
        hideError(formElement, popupInput, inputErrorClass, errorClass);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement)=> {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableBtn(buttonElement, inactiveButtonClass); 
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}; 

const disableBtn = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

const setEventListeners = (formElement, submitButtonSelector, inputSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
      // Находим все поля внутри формы,
      // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    formElement.addEventListener('reset', () => {
        disableBtn(buttonElement, inactiveButtonClass);
    });
       // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем checkInputValidity,
          // передав ей форму и проверяемый элемент
        checkInputValidity (formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig.submitButtonSelector, validationConfig.inputSelector, validationConfig.inactiveButtonClass, validationConfig.inputErrorClass, validationConfig.errorClass);
    });
};

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    });
};


