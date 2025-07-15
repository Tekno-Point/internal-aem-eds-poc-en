export default function tripForm() {
    const activateFirstAndBindClick = (selector) => {
        const radioWrappers = document.querySelectorAll(selector);
        if (radioWrappers.length > 0) {
            radioWrappers[0].classList.add("active");
        }

        radioWrappers.forEach(radio => {
            radio.addEventListener("click", (e) => {
                radioWrappers.forEach(el => el.classList.remove("active"));
                e.currentTarget.classList.add("active");
            });
        });
    };

    activateFirstAndBindClick('[data-fieldset="wrapage"].radio-wrapper');
    activateFirstAndBindClick('[data-fieldset="wrapday"].radio-wrapper');
}
