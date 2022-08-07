
const success = document.querySelector(".success");
const form = document.querySelector(".form");

const inputs = document.querySelectorAll(".form__input");

const name = document.querySelector("#name");
const number = document.querySelector("#number");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const cvc = document.querySelector("#cvc");

const button_continue = document.querySelector(".button-continue");

const isEmptyErrorMessage = "Can't be blank";
const hasCharactersErrorMessage = "Wrong format, numbers only";

const card_number = document.querySelector(".card__info-number");
const card_name = document.querySelector(".card__info-name");
const card_month = document.querySelector(".card__info-month");
const card_year = document.querySelector(".card__info-year");
const card_cvc = document.querySelector(".card__back-content");

name.addEventListener("keyup", () => {

    card_name.textContent = name.value;

    if (isEmpty(name.value)) {
        displayError(name, isEmptyErrorMessage);
        return;
    };

    removeErrorStyle(name);
    removeErrorMessage(name);
});

const formatCreditCardNumber = str => {
    return str.match(/.{1,4}/g).join(" ");
}

number.addEventListener("textInput", event => {

    event.preventDefault();

    const value = number.value.split(" ").join("");

    if (value.length === 16) return;

    const newValue = number.value.split(" ").join("") + event.data;

    number.value = formatCreditCardNumber(newValue);

});

number.addEventListener("keyup", () => {

    card_number.textContent = number.value;

    const value = number.value.split(" ").join("");

    if (isEmpty(value)) {
        displayError(number, isEmptyErrorMessage);
        return;
    };

    if (hasCharacters(value)) {
        displayError(number, hasCharactersErrorMessage);
        return;
    };

    removeErrorStyle(number);
    removeErrorMessage(number);
});

month.addEventListener("keyup", () => {

    card_month.textContent = month.value;

    if (isEmpty(month.value)) {
        displayError(month, isEmptyErrorMessage);
        return;
    };

    if (hasCharacters(month.value)) {
        displayError(month, hasCharactersErrorMessage);
        return;
    };

    removeErrorStyle(month);
    removeErrorMessage(month);
});

year.addEventListener("keyup", () => {

    card_year.textContent = year.value;

    if (isEmpty(year.value)) {
        displayError(year, isEmptyErrorMessage);
        return;
    };

    if (hasCharacters(year.value)) {
        displayError(year, hasCharactersErrorMessage);
        return;
    };

    removeErrorStyle(year);
    removeErrorMessage(year);
});

cvc.addEventListener("keyup", () => {

    card_cvc.textContent = cvc.value;

    if (isEmpty(cvc.value)) {
        displayError(cvc, isEmptyErrorMessage);
        return;
    };

    if (hasCharacters(cvc.value)) {
        displayError(cvc, hasCharactersErrorMessage);
        return;
    };

    removeErrorStyle(cvc);
    removeErrorMessage(cvc);
});

const displayError = (input, message) => {
    const error = document.getElementById(input.dataset.target);

    error.textContent = message;
    error.classList.add("visible");
    input.classList.add("error");
}

const removeErrorStyle = (input) => {
    input.classList.remove("error");
}

const removeErrorMessage = (input) => {
    const error = document.getElementById(input.dataset.target);
    error.classList.remove("visible");
}

const isEmpty = value => {
    return !value.length;
}

const hasCharacters = value => {
    return !/^\d+$/.test(value);
}

form.addEventListener("submit", event => {

    event.preventDefault();

    if (isValidForm()) {
        form.style.display = "none";
        success.style.display = "flex";
        return;
    };

});

const isValidForm = () => {
    const isValidName = !isEmpty(name.value);
    const isValidNumber = !isEmpty(number.value.split(" ").join("")) && !hasCharacters(number.value.split(" ").join(""));
    const isValidMonth = !isEmpty(month.value) && !hasCharacters(month.value);
    const isValidYear = !isEmpty(year.value) && !hasCharacters(year.value);
    const isValidCVC = !isEmpty(cvc.value) && !hasCharacters(cvc.value);

    return isValidName && isValidNumber && isValidMonth && isValidYear && isValidCVC;
}

const reset = () => {
    inputs.forEach(input => {
        input.value = "";
    });

    card_number.textContent = "0000 0000 0000 0000";
    card_name.textContent = "Jane Appleseed";
    card_month.textContent = "00";
    card_year.textContent = "00";
    card_cvc.textContent = "000";
}

button_continue.addEventListener("click", () => {
    reset();
    form.style.display = "flex";
    success.style.display = "none";
})