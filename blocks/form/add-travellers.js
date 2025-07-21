function ADD_TRAVELLERS(block) {
        const counterWrappers = Array.from(block.querySelectorAll(".counter-wrapper"));
        const lastIndex = counterWrappers.length - 1;
        const monitoredWrappers = counterWrappers.slice(0, lastIndex);
        const lastWrapper = counterWrappers[lastIndex];

        const mobileInput = block.querySelector('input#form-mobile-number[type="tel"]');
        const emailInput = block.querySelector('input[type="email"]');
        const formContainer = block.querySelector("#travel-details");

        const preExistingDisease = document.querySelectorAll("#form-radio-button-fieldset input[type='radio']");

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
                        // generateCheckboxField()

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

        function generateCheckboxField() {
                let checkboxFieldContainer = document.querySelector(".checkbox-field-container");
            
                if (!checkboxFieldContainer) {
                    checkboxFieldContainer = document.createElement("div");
                    checkboxFieldContainer.className = "checkbox-field-container field-wrapper fieldset-wrapper";
            
                    const diseaseFieldset = document.querySelector("#form-radio-button-fieldset");
                    diseaseFieldset.parentNode.insertBefore(checkboxFieldContainer, diseaseFieldset.nextSibling);
                }
            
                checkboxFieldContainer.innerHTML = "";
            
                const isYesSelected = Array.from(preExistingDisease).some(el => el.checked && el.value === "Yes");
                if (!isYesSelected) return;
            
                Object.entries(storeTravellerData.travellers).forEach(([ageGroup, count]) => {
                    if (count <= 0) return;
            
                    const groupContainer = document.createElement("div");
                    groupContainer.className = "disease-group-container"; 
            
                    
                    const heading = document.createElement("p");
                    heading.textContent = `${ageGroup}`;
                    heading.style.fontWeight = "bold"; 
                    groupContainer.appendChild(heading);
            
                
                    for (let i = 1; i <= count; i++) {
                        const wrapper = document.createElement("div");
                        wrapper.className = "checkbox-traveller-wrapper"; 
            
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.name = `disease-${ageGroup}-${i}`;
                        checkbox.value = "hasDisease";
            
                        const label = document.createElement("label");
                        label.textContent = `Traveller ${i}`;
                        // label.style.marginLeft = "15px";
            
                        wrapper.appendChild(checkbox);
                        wrapper.appendChild(label);
                        groupContainer.appendChild(wrapper);
                    }
            
                    checkboxFieldContainer.appendChild(groupContainer);
                });
            }
            
            
            

        function updateTravellerData() {
                // Store all monitored wrappers (0-70)
                monitoredWrappers.forEach(wrapper => {
                        const input = wrapper.querySelector("input[type='number']");
                        if (input.name) {
                                storeTravellerData.travellers[input.name] = parseInt(input.value) || 0;
                        }
                });

                // Add this block to store last age group (71-85)
                const lastInput = lastWrapper.querySelector("input[type='number']");
                if (lastInput && lastInput.name) {
                        storeTravellerData.travellers[lastInput.name] = parseInt(lastInput.value) || 0;
                }

                generateCheckboxField()

                console.log(storeTravellerData, "storeTravellerData");
        }


        const initialLastCount = parseInt(lastWrapper.querySelector("input").value) || 0;
        updateIncrementButtons();
        generateDateField(initialLastCount);
        preExistingDisease.forEach((radio) => {
                radio.addEventListener("change", generateCheckboxField);
        });
}

export { ADD_TRAVELLERS };
