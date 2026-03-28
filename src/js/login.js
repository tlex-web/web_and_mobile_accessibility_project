/**
 * Set the form control element to valid
 * @param {object} element - The DOM element
 */
function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
    var errorEl = element.parentElement.querySelector('.invalid-feedback');
    if (errorEl) {
        errorEl.textContent = '';
    }
}

/**
 * Set the form control element to invalid
 * @param {object} element - The DOM element
 */
function setInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

/**
 * Set the form control element to invalid with a specific error message
 * @param {object} element - The DOM element
 * @param {string} message - The error message to display
 * @param {string} errorId - The ID of the error element to populate
 */
function setInvalidWithMessage(element, message, errorId) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = message;
    }
}

/**
 * Remove validation information from the element
 * @param {object} element - The DOM element
 */
function removeValidation(element) {
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
}

/**
 * Clear the error banner and error list for a form
 * @param {string} formPrefix - The form prefix ('login' or 'register')
 */
function clearFormErrors(formPrefix) {
    var banner = document.getElementById(formPrefix + '-error');
    var list = document.getElementById(formPrefix + '-error-list');
    banner.textContent = '';
    banner.classList.add('d-none');
    list.innerHTML = '';
}

/**
 * Display form errors in the ARIA live region banner and error list
 * @param {Array} errors - Array of {field, message} objects
 * @param {string} formPrefix - The form prefix ('login' or 'register')
 */
function showFormErrors(errors, formPrefix) {
    var errorList = document.getElementById(formPrefix + '-error-list');
    var errorBanner = document.getElementById(formPrefix + '-error');

    errorList.innerHTML = '';

    for (var i = 0; i < errors.length; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + errors[i].field;
        a.textContent = errors[i].message;
        li.appendChild(a);
        errorList.appendChild(li);
    }

    var countText = errors.length === 1
        ? 'There is 1 error in this form'
        : 'There are ' + errors.length + ' errors in this form';
    errorBanner.textContent = countText;
    errorBanner.classList.remove('d-none');

    setTimeout(function() {
        var firstField = document.getElementById(errors[0].field);
        if (firstField) {
            firstField.focus();
        }
    }, 0);
}

/**
 * Announce a success message via the polite live region
 * @param {string} message - The success message to announce
 */
function announceSuccess(message) {
    var liveRegion = document.getElementById('form-success-live-region');
    liveRegion.textContent = message;
}

/**
 * Validate the login form and try to log the user in
 * @param {object} event - The DOM event
 */
function login(event) {
    event.preventDefault();
    event.stopPropagation();

    var errors = [];

    clearFormErrors('login');

    var email = document.getElementById('login-email-control');
    if (email.validity.valueMissing) {
        setInvalidWithMessage(email, 'Email is required', 'login-email-error');
        errors.push({ field: 'login-email-control', message: 'Email is required' });
    } else if (!email.validity.valid) {
        setInvalidWithMessage(email, 'Please enter a valid email address', 'login-email-error');
        errors.push({ field: 'login-email-control', message: 'Please enter a valid email address' });
    } else {
        setValid(email);
    }

    var password = document.getElementById('login-password-control');
    if (password.value.trim().length === 0) {
        setInvalidWithMessage(password, 'Password is required', 'login-password-error');
        errors.push({ field: 'login-password-control', message: 'Password is required' });
    } else {
        setValid(password);
    }

    if (errors.length > 0) {
        showFormErrors(errors, 'login');
    } else {
        announceSuccess('Login form submitted successfully');
    }
}

/**
 * Validate the login form and try to retrieve the password
 * @param {object} event - The DOM event
 */
function forgot(event) {
    event.preventDefault();
    event.stopPropagation();

    var errors = [];

    clearFormErrors('login');

    var email = document.getElementById('login-email-control');
    if (email.validity.valueMissing) {
        setInvalidWithMessage(email, 'Email is required', 'login-email-error');
        errors.push({ field: 'login-email-control', message: 'Email is required' });
    } else if (!email.validity.valid) {
        setInvalidWithMessage(email, 'Please enter a valid email address', 'login-email-error');
        errors.push({ field: 'login-email-control', message: 'Please enter a valid email address' });
    } else {
        setValid(email);
    }

    var password = document.getElementById('login-password-control');
    removeValidation(password);

    if (errors.length > 0) {
        showFormErrors(errors, 'login');
    } else {
        announceSuccess('Password reset request submitted');
    }
}

/**
 * Validate the registration form and try to register the new user
 * @param {object} event - The DOM event
 */
function register(event) {
    event.preventDefault();
    event.stopPropagation();

    var errors = [];

    clearFormErrors('register');

    var firstName = document.getElementById('register-first-name-control');
    if (firstName.value.trim().length === 0) {
        setInvalidWithMessage(firstName, 'First name is required', 'register-first-name-error');
        errors.push({ field: 'register-first-name-control', message: 'First name is required' });
    } else {
        setValid(firstName);
    }

    var lastName = document.getElementById('register-last-name-control');
    if (lastName.value.trim().length === 0) {
        setInvalidWithMessage(lastName, 'Last name is required', 'register-last-name-error');
        errors.push({ field: 'register-last-name-control', message: 'Last name is required' });
    } else {
        setValid(lastName);
    }

    var email = document.getElementById('register-email-control');
    if (email.validity.valueMissing) {
        setInvalidWithMessage(email, 'Email is required', 'register-email-error');
        errors.push({ field: 'register-email-control', message: 'Email is required' });
    } else if (!email.validity.valid) {
        setInvalidWithMessage(email, 'Please enter a valid email address', 'register-email-error');
        errors.push({ field: 'register-email-control', message: 'Please enter a valid email address' });
    } else {
        setValid(email);
    }

    var password = document.getElementById('register-password-control');
    var passwordValue = password.value.trim();
    if (passwordValue.length < 8) {
        setInvalidWithMessage(password, 'Password must be at least 8 characters', 'register-password-error');
        errors.push({ field: 'register-password-control', message: 'Password must be at least 8 characters' });
    } else if (passwordValue.length > 16) {
        setInvalidWithMessage(password, 'Password must be no more than 16 characters', 'register-password-error');
        errors.push({ field: 'register-password-control', message: 'Password must be no more than 16 characters' });
    } else if (passwordValue.match(/[a-zA-Z]+/) === null) {
        setInvalidWithMessage(password, 'Password must contain at least one letter', 'register-password-error');
        errors.push({ field: 'register-password-control', message: 'Password must contain at least one letter' });
    } else if (passwordValue.match(/[0-9]+/) === null) {
        setInvalidWithMessage(password, 'Password must contain at least one number', 'register-password-error');
        errors.push({ field: 'register-password-control', message: 'Password must contain at least one number' });
    } else {
        setValid(password);
    }

    var programme = document.getElementById('register-programme-control');
    if (!programme.value) {
        setInvalidWithMessage(programme, 'Please select a programme', 'register-programme-error');
        errors.push({ field: 'register-programme-control', message: 'Please select a programme' });
    } else {
        setValid(programme);
    }

    if (errors.length > 0) {
        showFormErrors(errors, 'register');
    } else {
        announceSuccess('Registration form submitted successfully');
    }
}

/**
 * Validate login email field
 * @param {object} field - The email input element
 * @return {string|null} Error message or null if valid
 */
function validateLoginEmail(field) {
    if (field.validity.valueMissing) return 'Email is required';
    if (!field.validity.valid) return 'Please enter a valid email address';
    return null;
}

/**
 * Validate login password field
 * @param {object} field - The password input element
 * @return {string|null} Error message or null if valid
 */
function validateLoginPassword(field) {
    if (field.value.trim().length === 0) return 'Password is required';
    return null;
}

/**
 * Validate registration first name field
 * @param {object} field - The first name input element
 * @return {string|null} Error message or null if valid
 */
function validateRegisterFirstName(field) {
    if (field.value.trim().length === 0) return 'First name is required';
    return null;
}

/**
 * Validate registration last name field
 * @param {object} field - The last name input element
 * @return {string|null} Error message or null if valid
 */
function validateRegisterLastName(field) {
    if (field.value.trim().length === 0) return 'Last name is required';
    return null;
}

/**
 * Validate registration email field
 * @param {object} field - The email input element
 * @return {string|null} Error message or null if valid
 */
function validateRegisterEmail(field) {
    if (field.validity.valueMissing) return 'Email is required';
    if (!field.validity.valid) return 'Please enter a valid email address';
    return null;
}

/**
 * Validate registration password field
 * @param {object} field - The password input element
 * @return {string|null} Error message or null if valid
 */
function validateRegisterPassword(field) {
    var val = field.value.trim();
    if (val.length < 8) return 'Password must be at least 8 characters';
    if (val.length > 16) return 'Password must be no more than 16 characters';
    if (val.match(/[a-zA-Z]+/) === null) return 'Password must contain at least one letter';
    if (val.match(/[0-9]+/) === null) return 'Password must contain at least one number';
    return null;
}

/**
 * Validate registration programme field
 * @param {object} field - The programme select element
 * @return {string|null} Error message or null if valid
 */
function validateRegisterProgramme(field) {
    if (!field.value) return 'Please select a programme';
    return null;
}

/**
 * Attach live validation to a form field for real-time error removal
 * @param {string} fieldId - The ID of the form field
 * @param {function} validateFn - Validation function returning error message or null
 * @param {string} formPrefix - The form prefix ('login' or 'register')
 */
function attachLiveValidation(fieldId, validateFn, formPrefix) {
    var field = document.getElementById(fieldId);
    var eventType = field.tagName === 'SELECT' ? 'change' : 'input';

    field.addEventListener(eventType, function() {
        if (!field.classList.contains('is-invalid')) return;

        var errorMessage = validateFn(field);
        if (!errorMessage) {
            setValid(field);

            var errorList = document.getElementById(formPrefix + '-error-list');
            var links = errorList.querySelectorAll('a[href="#' + fieldId + '"]');
            for (var i = 0; i < links.length; i++) {
                links[i].parentElement.remove();
            }

            var remaining = errorList.querySelectorAll('li').length;
            var banner = document.getElementById(formPrefix + '-error');
            if (remaining === 0) {
                banner.classList.add('d-none');
                banner.textContent = '';
            } else {
                banner.textContent = remaining === 1
                    ? 'There is 1 error in this form'
                    : 'There are ' + remaining + ' errors in this form';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-login-button')
        .addEventListener('click', login, false);

    document.getElementById('login-forgot-button')
        .addEventListener('click', forgot, false);

    document.getElementById('register-register-button')
        .addEventListener('click', register, false);

    // Live error removal for login form
    attachLiveValidation('login-email-control', validateLoginEmail, 'login');
    attachLiveValidation('login-password-control', validateLoginPassword, 'login');

    // Live error removal for registration form
    attachLiveValidation('register-first-name-control', validateRegisterFirstName, 'register');
    attachLiveValidation('register-last-name-control', validateRegisterLastName, 'register');
    attachLiveValidation('register-email-control', validateRegisterEmail, 'register');
    attachLiveValidation('register-password-control', validateRegisterPassword, 'register');
    attachLiveValidation('register-programme-control', validateRegisterProgramme, 'register');
}, false);
