import createField from './form-fields.js';

async function createForm(formHref, submitHref) {
  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();

  const form = document.createElement('form');
  form.dataset.action = submitHref;

  // Create fields and append to form
  const fields = await Promise.all(json.data.map((fd) => createField(fd, form)));
fields.forEach((field) => {
  if (field) {
    // Add <p> after input inside each field-wrapper
    const input = field.querySelector('input');
    if (input && !input.nextElementSibling?.classList?.contains('input-helper')) {
      const p = document.createElement('p');
      p.className = 'input-helper';
      if (input.name === 'name') p.textContent = 'The Name is required';
      if (input.name === 'mobile') p.textContent = 'Please Enter a valid Mobile Number';
      if (input.name === 'otp') p.textContent = 'The OTP is required';
      if (input.name === 'email') p.textContent = 'The email is required';
      input.insertAdjacentElement('afterend', p);
    }
    form.append(field);
  }
});

  // Disable OTP field until 10 digits are entered in mobile
  const mobileInput = form.querySelector('input[name="mobile"]');
  const otpInput = form.querySelector('input[name="otp"]');
  if (mobileInput && otpInput) {
    otpInput.disabled = true;
    mobileInput.addEventListener('input', function () {
      if (/^\d{10}$/.test(mobileInput.value)) {
        otpInput.disabled = false;
      } else {
        otpInput.disabled = true;
      }
    });
    // Also check on page load (in case value is pre-filled)
    if (/^\d{10}$/.test(mobileInput.value)) {
      otpInput.disabled = false;
    } else {
      otpInput.disabled = true;
    }
  }

  // Validation and error message display on submit
form.addEventListener('submit', function(e) {
  let valid = true;
  [...form.querySelectorAll('input')].forEach(input => {
    const helper = input.nextElementSibling;
    if (helper && helper.classList.contains('input-helper')) {
      if (input.name === 'mobile') {
        if (!/^\d{10}$/.test(input.value.trim())) {
          helper.classList.add('visible');
          valid = false;
        } else {
          helper.classList.remove('visible');
        }
      } else {
        if (!input.value.trim()) {
          helper.classList.add('visible');
          valid = false;
        } else {
          helper.classList.remove('visible');
        }
      }
    }
  });
  if (!valid) {
    e.preventDefault();
    // Optionally focus the first invalid input
    const firstInvalid = form.querySelector('input + .input-helper.visible');
    if (firstInvalid) firstInvalid.previousElementSibling.focus();
    return;
  }
  e.preventDefault();
  handleSubmit(form);
});

// Hide error message as soon as user types
[...form.querySelectorAll('input')].forEach(input => {
  input.addEventListener('input', function() {
    const helper = input.nextElementSibling;
    if (helper && helper.classList.contains('input-helper')) {
      helper.classList.remove('visible');
    }
  });
});

  return form;
}

function generatePayload(form) {
  const payload = {};
  [...form.elements].forEach((el) => {
    if (el.name && !el.disabled) {
      payload[el.name] = el.value;
    }
  });
  return payload;
}

async function handleSubmit(form) {
  const payload = generatePayload(form);
  // Example: send payload to the form's data-action endpoint
  const resp = await fetch(form.dataset.action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (resp.ok) {
    // Show success message or handle response
    alert('Form submitted successfully!');
  } else {
    alert('There was an error submitting the form.');
  }
}

export default async function decorate(block) {
  const formHref = block.querySelector('a')?.href;
  const submitHref = block.querySelector('a[data-submit]')?.href || formHref;
  const form = await createForm(formHref, submitHref);
  block.innerHTML = '';
  block.append(form);

  // Associate external submit button (if any) with the form
  const submitBtn = document.querySelector('.button-container .button.primary');
  if (form && submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      form.requestSubmit();
    });
  }
}
//this adds a span tag to target the "SUBMIT" button
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.button.primary').forEach(btn => {
    if (!btn.querySelector('.gradient-text')) {
      btn.innerHTML = '<span class="gradient-text">' + btn.textContent + '</span>';
    }
  });
});
