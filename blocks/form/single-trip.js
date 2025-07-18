function SINGLE_TRIP(block) {
    let formRadioWrapper = block.querySelector("#form-wrapradio");
    formRadioWrapper.children[0].querySelector("#form-trip-radio").checked = true;

    const selectedRadioWrapper = formRadioWrapper.querySelectorAll('.radio-wrapper');

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

        container.innerHTML = `
            <div class="il-input-block country-search-input-block">
                <label>Travelling to</label>
                <div class="il-country-list">
                    <input type="text" placeholder="Add countries" class="search-country-input ng-pristine ng-valid ng-touched">
                </div>
            </div>
            <div class="il-pop-country">
                <h3>Popular countries</h3>
                <ul class="pop-country-list">
                    <li><a>Australia</a></li>
                    <li><a>Canada</a></li>
                    <li><a>Germany</a></li>
                    <li><a>Indonesia</a></li>
                    <li><a>Italy</a></li>
                    <li><a>Malaysia</a></li>
                    <li><a>Singapore</a></li>
                    <li><a>Switzerland</a></li>
                    <li><a>Thailand</a></li>
                    <li><a>UK</a></li>
                    <li><a>USA</a></li>
                </ul>
            </div>
        `;

        referenceElement.parentNode.insertBefore(container, referenceElement.nextSibling);
    }

    function removeExistingCountryBlock(referenceElement) {
        const next = referenceElement.nextElementSibling;
        if (next && next.classList.contains("il-selctcountry-block")) {
            next.remove();
        }
    }
}

export { SINGLE_TRIP };
