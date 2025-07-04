let isFetched = false;

export async function fetchData() {
    const cityData = await fetch('http://localhost:3000/srilankan-airlines/api/iata.json');
    return await cityData.json();
}

export async function cityDropdown(block, wrapperClass, type, inputparent) {
    const wrapper = block.querySelector(`form .destination-wrapper ${inputparent}`);

    if (wrapper.querySelector(`.city-wrapper.${wrapperClass}`)) return;

    const cityWrapper = document.createElement('div');
    cityWrapper.classList.add('city-wrapper');
    cityWrapper.classList.add(wrapperClass);

    const cities = await fetchData();

    // const firstCity = cities.data[0];
    // const IATA = firstCity[`${type}_IATA`];
    // const cityName = firstCity[`${type}_city`];
    // const country = firstCity[`${type}_country`];

    // wrapper.querySelector('input').value = `${IATA} - ${cityName}, ${country}`

    cities.data.forEach(city => {
        const cityOption = document.createElement('div');
        cityOption.classList.add('city-option');
        const IATA = city[`${type}_IATA`];
        const city1 = city[`${type}_city`];
        const country = city[`${type}_country`];

        cityOption.innerHTML = `
            <p class="iata-code">${IATA}</p>
            <div class="city">
               <p>${city1}, ${country}</p>
            </div>`

        cityWrapper.append(cityOption);
    });
    wrapper.append(cityWrapper);
}

export async function showData(block, inputClass, wrapperClass, type) {
    const inputElem = block.querySelector(`${inputClass} input`);
    inputElem.addEventListener('focus', (e) => {
        cityDropdown(block, wrapperClass, type, inputClass);
        e.currentTarget.parentElement.classList.add('show');
    })
    inputElem.addEventListener('blur', (e) => {
        e.currentTarget.parentElement.classList.remove('show');
    })
}