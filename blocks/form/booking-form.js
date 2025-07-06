let isFetched = false;

export async function fetchData() {
    const cityData = await fetch('/srilankan-airlines/api/iata.json');
    return await cityData.json();
}

export async function cityDropdown(block, wrapperClass, type, inputparent) {
    const wrapper = block.querySelector(`form .destination-wrapper ${inputparent}`);

    if (wrapper.querySelector(`.city-wrapper.${wrapperClass}`)) return;

    const cityWrapper = document.createElement('div');
    cityWrapper.classList.add('city-wrapper');
    cityWrapper.classList.add(wrapperClass);

    const cities = await fetchData();

    cities.data.forEach(city => {
        const cityOption = document.createElement('div');
        cityOption.classList.add('city-option');
        const IATA = city[`${type}_IATA`];
        const city1 = city[`${type}_city`];
        const country = city[`${type}_country`];

        cityOption.innerHTML = `
            <p class="iata-code">${IATA}</p>
            <p class="city">${city1}, ${country}</p>`  

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

    document.addEventListener('click', (e) => {
        const inputWrapper = block.querySelector(inputClass);
        const dropdown = inputWrapper?.querySelector(`.city-wrapper.${wrapperClass}`);

        if (!inputWrapper.contains(e.target)) {
            dropdown?.remove();
            inputWrapper.classList.remove('show');
        }
    });
}

export function clickDropdown(block){
    const wrapper = block.querySelector(`form .destination-wrapper`);
    wrapper?.addEventListener("click",(e)=>{
        if(e.target.classList.contains('city-option')) {
            const city = e.target.querySelector('.city');
            const iataCode = e.target.querySelector('.iata-code');
            e.target.parentElement.parentElement.querySelector('input').value = city.textContent;
            e.target.parentElement.parentElement.querySelector('input').dataset.iataCode = iataCode.textContent;

            e.target.closest('.city-wrapper')?.remove();
            e.target.closest('.input-wrapper')?.classList.remove('show');
        }
        else if( e.target.parentElement.classList.contains('city-option')){
            const city = e.target.parentElement.querySelector('.city');
            const iataCode = e.target.parentElement.querySelector('.iata-code');
            
            e.target.parentElement.parentElement.parentElement.querySelector('input').value = city.textContent;
            e.target.parentElement.parentElement.parentElement.querySelector('input').dataset.iataCode = iataCode.textContent;

            e.target.closest('.city-wrapper')?.remove();
            e.target.closest('.input-wrapper')?.classList.remove('show');
        }
    })
}