import createField from "./form-fields.js";
import { div, ul, li } from "../../scripts/dom-helpers.js";

async function createForm(formHref, submitHref) {
  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();

  const form = document.createElement("form");
  form.dataset.action = submitHref;

  const fields = await Promise.all(
    json.data.map((fd) => createField(fd, form))
  );
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll("fieldset");
  fieldsets.forEach((fieldset) => {
    form
      .querySelectorAll(`[data-fieldset="${fieldset.name}"`)
      .forEach((field) => {
        fieldset.append(field);
      });
  });

  return form;
}

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== "submit" && !field.disabled) {
      if (field.type === "radio") {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === "checkbox") {
        if (field.checked)
          payload[field.name] = payload[field.name]
            ? `${payload[field.name]},${field.value}`
            : field.value;
      } else {
        payload[field.name] = field.value;
      }
    }
  });
  return payload;
}

async function handleSubmit(form) {
  if (form.getAttribute("data-submitting") === "true") return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute("data-submitting", "true");
    submit.disabled = true;

    // create payload
    const payload = generatePayload(form);
    const response = await fetch(form.dataset.action, {
      method: "POST",
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
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
    form.setAttribute("data-submitting", "false");
    submit.disabled = false;
  }
}

export default async function decorate(block) {
  const links = [...block.querySelectorAll("a")].map((a) => a.href);
  const formLink = links.find(
    (link) => link.startsWith(window.location.origin) && link.endsWith(".json")
  );
  const submitLink = links.find((link) => link !== formLink);
  if (!formLink || !submitLink) return;

  const form = await createForm(formLink, submitLink);
  block.replaceChildren(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = form.checkValidity();
    if (valid) {
      handleSubmit(form);
    } else {
      const firstInvalidEl = form.querySelector(":invalid:not(fieldset)");
      if (firstInvalidEl) {
        firstInvalidEl.focus();
        firstInvalidEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  const state_inp = document.querySelector("#form-state");
  const state_field = state_inp.closest(".field-wrapper");
  const city_input = document.querySelector("#form-city");
  console.log(state_field);
  const selectOptions = function (mainClass, ulClass, liClass) {
    return div(
      { class: "state" },
      ul(
        { class: "state-list" },
        li({ class: "state-name" }, "M1"),
        li({ class: "state-name" }, "M2"),
        li({ class: "state-name" }, "M3"),
        li({ class: "state-name" }, "M4"),
        li({ class: "state-name" }, "M5"),
        li({ class: "state-name" }, "M6"),
        li({ class: "state-name" }, "M7"),
        li({ class: "state-name" }, "M8"),
        li({ class: "state-name" }, "M9")
      )
    );
  };

  function toggleCityInputState() {
    if (state_inp.value.trim() === "") {
      city_input.style.pointerEvents = "none";
      city_input.style.cursor = "no-drop";
      city_input.value = "";
    } else {
      city_input.style.pointerEvents = "unset";
      city_input.style.cursor = "unset";
    }
  };
  toggleCityInputState();

  state_inp.addEventListener("focus", function () {
    // Avoid adding it again
    if (!state_field.querySelector(".state")) {
      state_field.appendChild(selectOptions());
      document.querySelectorAll(".state-name").forEach((ele) => {
        ele.addEventListener("click", function () {
          document.querySelectorAll(".state-name").forEach((ele) => {
            ele.classList.remove("active");
          });
          ele.classList.add("active");
          state_inp.value = ele.textContent;
          toggleCityInputState();

        });
      });
      toggleCityInputState();
    }
  });

  state_inp.addEventListener("input", toggleCityInputState);

  // Hide dropdown if clicked outside input or dropdown
  document.addEventListener("click", function (e) {
    if (!state_field.contains(e.target)) {
      const dropdown = state_field.querySelector(".state");
      if (dropdown) dropdown.remove();
    }
  });

}
