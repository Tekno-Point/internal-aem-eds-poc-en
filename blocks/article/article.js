import createField from './form-fields.js';
import ffetch from '../../scripts/ffetch.js';

async function createForm(formHref, submitHref) {
    // console.log(formHref);

    const url = formHref.split('/').filter(Boolean);
    // console.log(url);

    let fetchData, jsonData;

    if (url.includes('graphql')) {
        fetchData = async () => {
            try {
                const response = await fetch((formHref), {
                    method: "GET",
                    credentials: "include", // Include credentials such as cookies
                });

                const data = await response.json();

                const capitalizedItems = data.data.configurationFrameworkWithoutMultifieldList.items.map(item => capitalizeKeys(item));
                return capitalizedItems;

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        jsonData = await fetchData();
    }
    else {
        fetchData = await ffetch(formHref).all();
        jsonData = fetchData;
        //   console.log(jsonData)
    }

    function capitalizeKeys(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => capitalizeKeys(item));
        } else if (typeof obj === 'object' && obj !== null) {
            return Object.keys(obj).reduce((result, key) => {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                result[capitalizedKey] = capitalizeKeys(obj[key]);
                return result;
            }, {});
        } else {
            return obj;
        }
    }
    // console.log(jsonData)

    const form = document.createElement('form');
    form.dataset.action = submitHref;

    const submitFormBtn = document.createElement('button');
    submitFormBtn.type = 'submit';
    submitFormBtn.textContent = 'Submit';
    submitFormBtn.classList.add('submit-btn');

    const fields = await Promise.all(jsonData.map((fd) => createField(fd, form)));
    // console.log(fields);
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

    form.appendChild(submitFormBtn);
    return form;
}

function generatePayload(form) {
    // console.log(form);
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

function formSubmitData(form) {
    let formattedData = '';
    const formData = {};

    [...form.elements].forEach((field) => {
        formData[field.name] = field.value;
    })

    for (const [key, value] of Object.entries(formData)) {
        formattedData += `${key} : ${value} \n`
    }

    alert(formattedData);
    return formData;
}

async function handleSubmit(form) {
    if (form.getAttribute('data-submitting') === 'true') return;

    const submit = form.querySelector('button[type="submit"]');
    const formSubmit = document.querySelector('form');

    formSubmit.addEventListener('submit', ()=> {
        e.preventDefault();
        formSubmitData(form);
    })
    try {
        form.setAttribute('data-submitting', 'true');
        submit.disabled = true;

        // create payload
        const payload = generatePayload(form);
        const formData = formSubmitData(form);
        const response = await fetch(form.dataset.action, {
            method: 'POST',
            body: JSON.stringify({ data: payload }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            form.reset();
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
    const formLink = links.find((link) => link.includes('.json') || link.endsWith('.json'));
    const submitLink = links.find((link) => link !== formLink);
    if (!formLink || !submitLink) return;

    const form = await createForm(formLink, submitLink);
    console.log(form)
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