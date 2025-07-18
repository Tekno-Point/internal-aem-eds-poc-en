
function SINGLE_TRIP(block) {
    let formRadioWrapper = block.querySelector("#form-wrapradio");
    formRadioWrapper.children[0].querySelector("#form-trip-radio").checked = true;

    const selectedRadioWrapper = formRadioWrapper.querySelectorAll('.radio-wrapper'); 

    let geographyContainer = block.querySelector("#form-wrap-geography")

    let geographyContry = geographyContainer.querySelectorAll(".selection-wrapper")

    let getDateInputField = block.querySelector("#form-wrapdate");
    let inputField = getDateInputField.querySelector("input");
    

    console.log(geographyContry)

    selectedRadioWrapper.forEach((element) => {
        element.addEventListener('click', function () {
            const selectedRadio = element.querySelector('input[name="trip radio"]');

            if (selectedRadio) {
                const value = selectedRadio.value;
                const outerWrapper = selectedRadio.closest('.field-wrapper.fieldset-wrapper');

                if (!outerWrapper) return;

                const nextSibling1 = outerWrapper.nextElementSibling;
                const nextSibling2 = nextSibling1?.nextElementSibling;

                if (value === "geography") {
                    if (nextSibling1) nextSibling1.style.display = 'block';
                    if (nextSibling2) nextSibling2.style.display = 'block';

                    removeExistingCountryBlock(outerWrapper);
                } else if (value === "country") { 
                    if (nextSibling1) nextSibling1.style.display = 'none';
                    if (nextSibling2) nextSibling2.style.display = 'none';

                    generateSelectCountryCom(outerWrapper);
                }
            } else {
                console.log("No option selected");
            }
        });
    });

    function generateSelectCountryCom(referenceElement) {
        removeExistingCountryBlock(referenceElement);
    
        const container = document.createElement("div");
        container.className = "il-selctcountry-block";
    
        
        const inputBlock = document.createElement("div");
        inputBlock.className = "il-input-block";
    
        const label = document.createElement("label");
        label.textContent = "Travelling to:";
    
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Add countries";
        input.className = "search-country-input";
    
        inputBlock.appendChild(input);
        inputBlock.appendChild(label);
    
        container.appendChild(inputBlock);
    
        const defaultContainer = referenceElement
            .closest(".tabs-panel")
            .querySelector(".default-content-wrapper");
    
        if (defaultContainer) {
            const clonedContainer = defaultContainer.cloneNode(true);
            container.appendChild(clonedContainer);
        }
    

        referenceElement.parentNode.insertBefore(container, referenceElement.nextElementSibling);
    } 

    function removeExistingCountryBlock(referenceElement) {
        const next = referenceElement.nextElementSibling;
        if (next && next.classList.contains("il-selctcountry-block")) {
            next.remove();
        }
    }

    geographyContry.forEach((element)=>{
        element.addEventListener('click', function(e){
            if(e.target.checked){
                inputField.showPicker?.()
                inputField.focus()
            }
        })
    })



}

export { SINGLE_TRIP };
