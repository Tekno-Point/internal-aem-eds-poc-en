import createField from './form-fields.js';
import ffetch from '../../scripts/ffetch.js';

async function createForm(formHref, submitHref) {
    //   const { pathname } = new URL(formHref);
    //   const resp = await fetch(pathname);
    //   const json = await resp.json();

    let json, json1;
    let jsonData;
    // console.log(formHref)

    if (formHref) {
        json = await ffetch(formHref).all();
        jsonData = json;
        //   console.log(json)
    }
    else {
        json1 = {
            "data": {
                "configurationFrameworkWithoutMultifieldList": {
                    "items": [
                        {
                            "id": "email-id-data",
                            "_path": "/content/dam/validationframework/configuration-framework-without-multifield/email-id-data",
                            "dataValidName": "email",
                            "for": "Enter Email Id",
                            "labelText": "email Id",
                            "name": "Email ",
                            "type": "email",
                            "dataPattern": "^(([^<>()\\[\\]\\\\.,;:\\s@']+(\\.[^<>()\\[\\]\\\\.,;:\\s@']+)*)|('.+'))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                            "placeholder": "Enter Your Email Id",
                            "errorclass": "errormsg",
                            "errorMsg": "Email Fill karo"
                        },
                        {
                            "id": "firstname",
                            "_path": "/content/dam/validationframework/configuration-framework-without-multifield/firstname",
                            "dataValidName": "firstname",
                            "for": "firstname",
                            "labelText": "First Name",
                            "name": "firstname",
                            "type": "text",
                            "dataPattern": "^[a-zA-Z]+$",
                            "placeholder": "Enter Your First Name",
                            "errorclass": "errormsg",
                            "errorMsg": "Please enter a valid first name"
                        },
                        {
                            "id": "fullname",
                            "_path": "/content/dam/validationframework/configuration-framework-without-multifield/fullname",
                            "dataValidName": "fullname",
                            "for": "fullname",
                            "labelText": "Fullname",
                            "name": "fullname",
                            "type": "text",
                            "dataPattern": "^[a-zA-Z\\s]+ [a-zA-Z]+$",
                            "placeholder": "Enter Your Full Name",
                            "errorclass": "errormsg",
                            "errorMsg": "Please enter a valid full name"
                        },
                        {
                            "id": "lastname",
                            "_path": "/content/dam/validationframework/configuration-framework-without-multifield/lastname",
                            "dataValidName": "lastname",
                            "for": "lastname",
                            "labelText": "Last Name",
                            "name": "lastname",
                            "type": "text",
                            "dataPattern": "^[a-zA-Z]+$",
                            "placeholder": "Enter your last name",
                            "errorclass": "errormsg",
                            "errorMsg": "Please enter a valid last name"
                        },
                        {
                            "id": "middlename",
                            "_path": "/content/dam/validationframework/configuration-framework-without-multifield/middle-name",
                            "dataValidName": "firstname",
                            "for": "middlename",
                            "labelText": "middle Name",
                            "name": "middlename",
                            "type": "text",
                            "dataPattern": "^[a-zA-Z]+$",
                            "placeholder": "Enter Your Middle Name",
                            "errorclass": "errormsg",
                            "errorMsg": "Please enter a valid Name"
                        },
                        {
                            "id": "mobile",
                            "_path": "/content/dam/validationframework/configuration-framework-without-multifield/mobile",
                            "dataValidName": "mobile",
                            "for": "mobile",
                            "labelText": "Mobile Number",
                            "name": "mobile",
                            "type": "number",
                            "dataPattern": "^[6789]\\d{9}$",
                            "placeholder": "Enter Your Phone Number",
                            "errorclass": "errormsg",
                            "errorMsg": "Please enter a valid Mobile Number"
                        },
                        {
                            "id": "notebook",
                            "_path": "/content/dam/validationframework/configuration-framework-without-multifield/textarea",
                            "dataValidName": "textarea",
                            "for": "notebook",
                            "labelText": "write a note",
                            "name": "notetext",
                            "type": "text-area",
                            "dataPattern": "[^A-Za-z0-9]",
                            "placeholder": "write a note",
                            "errorclass": "errormsg",
                            "errorMsg": "Write a valid note"
                        }
                    ]
                }
            }
        }
        jsonData = capitalizeKeys(json1.data.configurationFrameworkWithoutMultifieldList.items);
    }

    function capitalizeKeys(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => capitalizeKeys(item));
        } else if (typeof obj === 'object' && obj !== null) {
            return Object.keys(obj).reduce((result, key) => {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter of key
                result[capitalizedKey] = capitalizeKeys(obj[key]); // Recursively apply the function to the value
                return result;
            }, {});
        } else {
            return obj;
        }
    }

    console.log(jsonData);

    const form = document.createElement('form');
    form.dataset.action = submitHref;

    const fields = await Promise.all(jsonData.map((fd) => createField(fd, form)));
    console.log(fields);
    fields.forEach((field) => {
        if (field) {
            form.append(field);
        }
    });

    // group fields into fieldsets
    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fieldset) => {
        form.querySelectorAll(`[data-fieldset="${fieldset.name}"`).forEach((field) => {
            fieldset.append(field);
        });
    });

    return form;
}

function generatePayload(form) {
    const payload = {};

    [...form.elements].forEach((field) => {
        if (field.name && field.type !== 'submit' && !field.disabled) {
            if (field.type === 'radio') {
                if (field.checked) payload[field.name] = field.value;
            } else if (field.type === 'checkbox') {
                if (field.checked) payload[field.name] = payload[field.name] ? `${payload[field.name]},${field.value}` : field.value;
            } else {
                payload[field.name] = field.value;
            }
        }
    });
    return payload;
}

async function handleSubmit(form) {
    if (form.getAttribute('data-submitting') === 'true') return;

    const submit = form.querySelector('button[type="submit"]');
    try {
        form.setAttribute('data-submitting', 'true');
        submit.disabled = true;

        // create payload
        const payload = generatePayload(form);
        const response = await fetch(form.dataset.action, {
            method: 'POST',
            body: JSON.stringify({ data: payload }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            if (form.dataset.confirmation) {
                window.location.href = form.dataset.confirmation;
            }
        } else {
            const error = await response.text();
            throw new Error(error);
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    } finally {
        form.setAttribute('data-submitting', 'false');
        submit.disabled = false;
    }
}

export default async function decorate(block) {
    const links = [...block.querySelectorAll('a')].map((a) => a.href);
    const formLink = links.find((link) => link.startsWith(window.location.origin) && link.endsWith('.json'));
    const submitLink = links.find((link) => link !== formLink);
    // if (!formLink || !submitLink) return;

    const form = await createForm(formLink, submitLink);
    block.replaceChildren(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const valid = form.checkValidity();
        if (valid) {
            handleSubmit(form);
        } else {
            const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
            if (firstInvalidEl) {
                firstInvalidEl.focus();
                firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}