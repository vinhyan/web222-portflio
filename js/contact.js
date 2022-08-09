function validatePhone(phone) {   //Format: (999) 999-9999
    let isValid = false;
    if (phone) {
        isValid = /^\(\d{3}\)\ \d{3}-\d{4}$/g.test(phone);
    } else {
        isValid = true;
    }
    return isValid;
}

function validateEmail(email) {  //Format: example@email.com
    let emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegEx.test(email);
}

function errMessage(className, message) {
    document.querySelector(`.${className}`).innerText = message;
}

function clearErrMessage(className) {
    document.querySelector(`.${className}`).innerText = '';
}

function validateField(field, validator, message, className) {
    let isValid = true;
    if (!validator(field.value)) {
        field.setCustomValidity(message);
        errMessage(className, field.validationMessage);
        isValid = false;

        field.onchange = function(e) {
            if (!validator(field.value)) {
                field.setCustomValidity(message);
                errMessage(className, field.validationMessage);
            } else {
                field.setCustomValidity('');
                field.oninput = null;
                isValid = true;
                clearErrMessage(className);
            }
        }
    }
    return isValid;
}


window.onload = function() {
    let form = document.contact;
    let phone = document.contact.phone;
    let email = document.contact.email;

    form.onsubmit = function(e) {
        let isValid = true;

        if (!form.checkValidity()) {
            isValid = false;
        } else {
            let fields = [validateField(phone, validatePhone, 
                          "Phone must be in (999) 999-9999 format", 'phone-err'),
                        validateField(email, validateEmail, "Email must be in example@email.com format", 'email-err')];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] === false) isValid = false;
            }
        }

        if (!isValid) e.preventDefault();
        return isValid;
    }
}