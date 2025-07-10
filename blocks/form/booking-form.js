let isFetched = false;
let iataData;
export async function fetchIataData() {
    const cityData = await fetch('/srilankan-airlines/api/iata.json');
    if (iataData) {
        return iataData;
    }
    iataData = await cityData.json();
    return iataData;
}

export async function cityDropdown(block, wrapperClass, type, inputparent) {
    const wrapper = block.querySelector(`form .destination-wrapper ${inputparent}`);

    if (wrapper.querySelector(`.city-wrapper.${wrapperClass}`)) return;

    const cityWrapper = document.createElement('div');
    cityWrapper.classList.add('city-wrapper');
    cityWrapper.classList.add(wrapperClass);

    const cities = await fetchIataData();
    createCityDom(cities.data, cityWrapper, type)

    wrapper.append(cityWrapper);
    const event = new CustomEvent("datafetched");
    window.dispatchEvent(event);
}

export function createCityDom(cities,wrapper,type){
    wrapper.innerHTML = "";
    cities.forEach(city => {
        const cityOption = document.createElement('div');
        cityOption.classList.add('city-option');
        const IATA = city[`${type}_IATA`];
        const city1 = city[`${type}_city`];
        const country = city[`${type}_country`];

        cityOption.innerHTML = `
            <p class="iata-code">${IATA}</p>
            <p class="city">${city1}, ${country}</p>`

        wrapper.append(cityOption);
    });
}

export async function inputFilter(block, inputClass,type, otherInput) {
    const inputElem = block.querySelector(`${inputClass} input`);
    const wrapper = block.querySelector(`${inputClass} .city-wrapper`);
    
    
    inputElem.addEventListener('input', (e)=> {
        const otherInputVal = block.querySelector(`${otherInput} input`)?.value || "";
        const otherInputCity = otherInputVal?.split(',')[0]
        const query = e.target.value.toLowerCase();
        let filteredData = iataData.data.filter(entry => 
            entry[`${type}_city`].toLowerCase().includes(query) ||
            entry[`${type}_country`].toLowerCase().includes(query) ||
            entry[`${type}_IATA`].toLowerCase().includes(query)
        );
        if (otherInputCity) {
            filteredData = filteredData.filter(entry => 
                entry[`${type}_city`].toLowerCase() !== otherInputCity.toLowerCase()
            );
        }
        const uniqueData = Array.from(
            new Map(
                filteredData.map(entry => [entry[`${type}_IATA`], entry])
            ).values()
        );

        createCityDom(uniqueData,wrapper,type)
    })
}

export async function showData(block, inputClass, wrapperClass, type) {
    const inputElem = block.querySelector(`${inputClass} input`);
    inputElem.addEventListener('focus', (e) => {
        cityDropdown(block, wrapperClass, type, inputClass);
        e.currentTarget.parentElement.classList.add('show');
    })

    document.addEventListener('click', (e) => {
        const inputWrapper = block.querySelector(inputClass);
        const dropdown = inputWrapper?.querySelector(`.city-wrapper.${wrapperClass}`);

        if (!inputWrapper.contains(e.target)) {
            dropdown?.remove();
            inputWrapper.classList.remove('show');
        }
    });
}

export function clickDropdown(block) {
    const wrapper = block.querySelector(`form .destination-wrapper`);
    wrapper?.addEventListener("click", (e) => {
        if (e.target.classList.contains('city-option')) {
            const city = e.target.querySelector('.city');
            const iataCode = e.target.querySelector('.iata-code');
            e.target.parentElement.parentElement.querySelector('input').value = city.textContent;
            e.target.parentElement.parentElement.querySelector('input').dataset.iataCode = iataCode.textContent;

            e.target.closest('.city-wrapper')?.remove();
            e.target.closest('.input-wrapper')?.classList.remove('show');
        }
        else if (e.target.parentElement.classList.contains('city-option')) {
            const city = e.target.parentElement.querySelector('.city');
            const iataCode = e.target.parentElement.querySelector('.iata-code');

            e.target.parentElement.parentElement.parentElement.querySelector('input').value = city.textContent;
            e.target.parentElement.parentElement.parentElement.querySelector('input').dataset.iataCode = iataCode.textContent;

            e.target.closest('.city-wrapper')?.remove();
            e.target.closest('.input-wrapper')?.classList.remove('show');
        }
    })
}

export function dateDisable(block) {
    const startInput = block.querySelector('form .departure-date input');
    const endInput = block.querySelector('form .return-date input');

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Disable previous dates in start input
    startInput.min = today;

    // Optional: Disable previous dates in return input too
    endInput.min = today;

    // Update end date min when start date changes
    startInput.addEventListener('change', function () {
        const selectedDate = this.value;
        endInput.min = selectedDate;

        if (endInput.value && endInput.value < selectedDate) {
            endInput.value = '';
        }
    });

    console.log(Date.now());
}
