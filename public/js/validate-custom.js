/***********************
 * VALIDATORS
 ***********************/
function isValidName(value) {
    const name = value.trim();
    const regex = /^[А-Яа-яЁё]{2,}$/;
    const result = regex.test(name);

    console.log('🟢 isValidName:', { value, result });
    return result;
}

function isValidPhone(value) {
    const digits = value.replace(/\D/g, '');
    const result = digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));

    console.log('🟢 isValidPhone:', { value, digits, result });
    return result;
}

function isValidAddress(select) {
    if (!select) return true;

    const option = select.options[select.selectedIndex];
    const text = option?.textContent?.toLowerCase() || '';

    const result = select.value !== '' && !text.includes('выберите');

    console.log('🟢 isValidAddress:', { value: select.value, text, result });
    return result;
}

/***********************
 * FINDERS
 ***********************/
function findPhoneInput(form) {
    return (
        form.querySelector('input[type="tel"]') ||
        form.querySelector('input[name*="phone" i]') ||
        form.querySelector('input[name*="tel" i]') ||
        form.querySelector('input[name*="mobile" i]')
    );
}

function findNameInput(form) {
    return form.querySelector('input[name*="name" i]') || form.querySelector('input[name*="fio" i]') || form.querySelector('input[name*="user" i]');
}

function findAddressSelect(form) {
    return (
        form.querySelector('select[name="address"]') ||
        form.querySelector('select#address') ||
        form.querySelector('select[name*="address" i]') ||
        form.querySelector('select[id*="address" i]')
    );
}

const SUBMIT_TEXT_PATTERNS = [/отправ/i, /заявк/i, /send/i, /submit/i];

function buttonLooksLikeSubmit(btn) {
    const text = btn.textContent.toLowerCase();
    return SUBMIT_TEXT_PATTERNS.some((r) => r.test(text));
}

function findSubmitButton(form) {
    let btn =
        form.querySelector('button[type="submit"]') ||
        form.querySelector('input[type="submit"]') ||
        form.querySelector('button[id*="submit" i]') ||
        form.querySelector('button[class*="submit" i]') ||
        form.querySelector('button[name*="submit" i]') ||
        form.querySelector('input[id*="submit" i]') ||
        form.querySelector('input[class*="submit" i]');

    if (btn) {
        console.log('🟢 Submit found by attribute');
        return btn;
    }

    const buttons = Array.from(form.querySelectorAll('button'));
    btn = buttons.find(buttonLooksLikeSubmit);

    if (btn) {
        console.log('🟢 Submit found by text');
    } else {
        console.warn('🔴 Submit button NOT FOUND');
    }

    return btn || null;
}

/***********************
 * ERROR LOGIC
 ***********************/
function getFormError(form) {
    const phoneInput = findPhoneInput(form);
    const nameInput = findNameInput(form);
    const addressSelect = findAddressSelect(form);

    if (!phoneInput) {
        return 'Не найдено поле телефона';
    }

    if (!isValidPhone(phoneInput.value)) {
        return 'Введите корректный номер телефона';
    }

    if (nameInput && !isValidName(nameInput.value)) {
        return 'Введите корректное имя';
    }

    if (addressSelect && !isValidAddress(addressSelect)) {
        return 'Выберите адрес';
    }

    return null;
}

/***********************
 * UI HELPERS
 ***********************/
function wrapSubmitButton(submitBtn) {
    const existing = submitBtn.closest('.js-submit-wrapper');
    if (existing) return existing;

    const wrapper = document.createElement('div');
    wrapper.className = 'js-submit-wrapper';

    /*     wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '10px'; */
    wrapper.style.position = 'relative';
    wrapper.style.minWidth = `256px`;

    const parent = submitBtn.parentNode;
    parent.insertBefore(wrapper, submitBtn);
    wrapper.appendChild(submitBtn);

    console.log('🟢 Submit wrapped');

    return wrapper;
}

function getOrCreateErrorBox(wrapper) {
    let errorBox = wrapper.querySelector('.js-form-error');

    if (errorBox) return errorBox;

    errorBox = document.createElement('div');
    errorBox.className = 'js-form-error';
    errorBox.style.color = '#d93025';
    errorBox.style.fontSize = '15px';
    errorBox.style.display = 'none';
    errorBox.style.position = 'absolute';
    errorBox.style.bottom = '-20px';
    errorBox.style.textAlign = 'center';
    errorBox.style.width = '100%';
    errorBox.style.fontWeight = 'bold';

    wrapper.appendChild(errorBox);

    console.log('🟢 Error box created');

    return errorBox;
}

/***********************
 * EVENTS
 ***********************/
function bindValidationEvents(input, callback) {
    if (!input) return;

    ['input', 'keyup', 'change', 'blur'].forEach((event) => {
        input.addEventListener(event, callback);
    });
}

/***********************
 * INIT FORM
 ***********************/
function initForm(form) {
    console.group('🚀 initForm');

    const submitBtn = findSubmitButton(form);
    if (!submitBtn) {
        console.groupEnd();
        return;
    }

    const phoneInput = findPhoneInput(form);
    const nameInput = findNameInput(form);
    const addressSelect = findAddressSelect(form);

    const wrapper = wrapSubmitButton(submitBtn);
    const errorBox = getOrCreateErrorBox(wrapper);

    let formTouched = false;
    submitBtn.disabled = true;    
    submitBtn.style.width = '100%';

    const validate = () => {
        console.log('🔄 validate');

        const error = getFormError(form);

        if (!formTouched) {
            submitBtn.disabled = true;
            errorBox.style.display = 'none';
            errorBox.textContent = '';
            return;
        }

        if (error) {
            submitBtn.disabled = true;
            errorBox.textContent = error;
            errorBox.style.display = 'block';
        } else {
            submitBtn.disabled = false;
            errorBox.textContent = '';
            errorBox.style.display = 'none';
        }
    };

    const touchAndValidate = () => {
        if (!formTouched) {
            formTouched = true;
            console.log('✍️ Form touched');
        }
        validate();
    };

    bindValidationEvents(phoneInput, touchAndValidate);

    if (nameInput) {
        bindValidationEvents(nameInput, touchAndValidate);
    }

    if (addressSelect) {
        addressSelect.addEventListener('change', touchAndValidate);
    }

    submitBtn.addEventListener('click', () => {
        console.log('🖱 Submit clicked');
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.disabled = false;
            console.log('⏱ Submit re-enabled');
        }, 2000);
    });

    form.addEventListener('submit', (e) => {
        console.log('📨 submit');
        const error = getFormError(form);
        if (error) {
            e.preventDefault();
            formTouched = true;
            errorBox.textContent = error;
            errorBox.style.display = 'block';
            submitBtn.disabled = true;
        }
    });

    validate();
    console.groupEnd();
}

/***********************
 * BOOTSTRAP
 ***********************/
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM ready');

    document.querySelectorAll('form').forEach(initForm);
});
