function ADD_TRAVELLERS(block) { 
        const counterWrappers = Array.from(block.querySelectorAll(".counter-wrapper"));
        const lastIndex = counterWrappers.length - 1;
        const monitoredWrappers = counterWrappers.slice(0, lastIndex);
        const lastWrapper = counterWrappers[lastIndex];

        const mobileInput = block.querySelector('input#form-mobile-number[type="tel"]');
        const emailInput = block.querySelector('input[type="email"]');
        const formContainer = block.querySelector("#travel-details");


        console.log(counterWrappers, lastIndex, monitoredWrappers, lastWrapper, mobileInput, emailInput, formContainer)

        let inputFieldContainer = formContainer.querySelector(".traveller-input-container");
        if (!inputFieldContainer) {
                const dobFieldset = formContainer.querySelector("#form-traveller-dob");
                inputFieldContainer = document.createElement("div");
                inputFieldContainer.className = "traveller-input-container field-wrapper fieldset-wrapper";
                dobFieldset.parentNode.insertBefore(inputFieldContainer, dobFieldset.nextSibling);
        }

        const storeTravellerData = {
                contact: {},
                travellers: {}
        };

        function validateInput(input, regex, message, key) {
                let errorMsg = input.nextElementSibling;

                if (!errorMsg || !errorMsg.classList.contains("error-message")) {
                        errorMsg = document.createElement("div");
                        errorMsg.className = "error-message";
                        errorMsg.style.color = "red";
                        errorMsg.style.fontSize = "14px";
                        input.parentNode.appendChild(errorMsg);
                }

                input.addEventListener("input", function (e) {
                        const value = e.target.value.trim();
                        if (!regex.test(value)) {
                                errorMsg.textContent = message;
                                storeTravellerData.contact[key] = "";
                        } else {
                                errorMsg.textContent = "";
                                storeTravellerData.contact[key] = value;
                        }
                });
        }

        if (mobileInput) {
                const indianMobileRegex = /^[6-9]\d{9}$/;
                validateInput(mobileInput, indianMobileRegex, "Please enter a valid 10-digit Indian mobile number.", "mobile");
        }

        if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                validateInput(emailInput, emailRegex, "Please enter a valid email address.", "email");
        }

        counterWrappers.forEach((wrapper, index) => {
                const decrementBtn = wrapper.querySelector(".decrementer");
                const incrementBtn = wrapper.querySelector(".incrementer");
                const input = wrapper.querySelector("input[type='number']");

                input.value = input.value || "0";
                let value = parseInt(input.value) || 0;

                incrementBtn.addEventListener("click", () => {
                        const total = index === lastIndex ? value : getMonitoredTotal();

                        if (total >= 6) return;

                        value++;
                        input.value = value;
                        decrementBtn.disabled = value <= 0;

                        updateIncrementButtons();

                        if (index === lastIndex) {
                                generateDateField(value);
                        }
                });

                decrementBtn.addEventListener("click", () => {
                        if (value > 0) {
                                value--;
                                input.value = value;
                        }

                        decrementBtn.disabled = value <= 0;
                        updateIncrementButtons();

                        if (index === lastIndex) {
                                generateDateField(value);
                        }
                });
        });

        function getMonitoredTotal() {
                return monitoredWrappers.reduce((sum, wrapper) => {
                        const input = wrapper.querySelector("input[type='number']");
                        return sum + (parseInt(input.value) || 0);
                }, 0);
        }

        function updateIncrementButtons() {
                const monitoredTotal = getMonitoredTotal();

                monitoredWrappers.forEach(wrapper => {
                        const incrementBtn = wrapper.querySelector(".incrementer");
                        incrementBtn.disabled = monitoredTotal >= 6;
                });

                const lastInput = lastWrapper.querySelector("input[type='number']");
                const lastValue = parseInt(lastInput.value) || 0;
                const lastIncrement = lastWrapper.querySelector(".incrementer");
                lastIncrement.disabled = lastValue >= 6;

                updateTravellerData();
        }

        function generateDateField(count) {
                inputFieldContainer.innerHTML = "";

                if (count === 0) return;

                for (let i = 1; i <= count; i++) {
                        const div = document.createElement("div");
                        div.className = "field-wrapper traveller-dob-field";

                        const label = document.createElement("label");
                        label.textContent = `Traveller ${i} Date of birth`;

                        const input = document.createElement("input");
                        input.type = "date";
                        input.name = `traveller-dob-${i}`;
                        input.placeholder = `Date of birth`;

                        div.appendChild(label);
                        div.appendChild(input);
                        inputFieldContainer.appendChild(div);
                }
        }

        function updateTravellerData() {
                monitoredWrappers.forEach(wrapper => {
                        const input = wrapper.querySelector("input[type='number']");
                        if (input.name) {
                                storeTravellerData.travellers[input.name] = parseInt(input.value) || 0;
                        }
                });

                console.log(storeTravellerData, "storeTravellerData");
        }

        const initialLastCount = parseInt(lastWrapper.querySelector("input").value) || 0;
        updateIncrementButtons();
        generateDateField(initialLastCount);
}

export { ADD_TRAVELLERS };
