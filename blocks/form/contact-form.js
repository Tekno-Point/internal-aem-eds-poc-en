export async function cityDropdown(cityWrapper) {
    const cityUrl = "http://localhost:3000/vida-v2-pro/api/citymodelprice.json";

    const cities = await renderDataFromAPI(cityUrl);

    const filteredCity = cities.data.filter((city) => city.variant_sf_id == 'a24OX000000WsenYAC');

    filteredCity.sort((a, b) => {
        const cityA = a.city_state_id.split("~")[0].toUpperCase();
        const cityB = b.city_state_id.split("~")[0].toUpperCase();
        return cityA.localeCompare(cityB);
    });

    let dropdown = filteredCity
        .map((city) => `<div class="city-option" value=${city.city_state_id.split("~")[0]}>${city.city_state_id.split("~")[0]}</div>`).join("")

    cityWrapper.innerHTML = dropdown;
}

export function inputValue(block, form) {
    const cityWrapper = document.createElement('div');
    cityWrapper.classList.add('city-wrapper')
    form.append(cityWrapper);
    cityDropdown(cityWrapper);

    const field = block.querySelector('#form-city');

    field.addEventListener('input', function () {
        const allCities = block.querySelectorAll('.city-option');
        const dropdownelm = Array.from(allCities);
        let value = field.value.toLowerCase();

        cityWrapper.style.display = "none";
        if (value) {
            cityWrapper.style.display = "block";
        }

        dropdownelm.forEach((city) => {
            const dropdownContent = city.textContent.toLowerCase();
            city.style.display = "none";

            if (dropdownContent.includes(value)) {
                city.style.display = "block";

                city.addEventListener('click', () => {
                    field.value = city.textContent;
                    cityWrapper.style.display = "none";
                })
            }
        })

    })
}

// export function validateForm(form) {
//     const name = form.querySelector('input[name="name"]').value.trim();
//     const email = form.querySelector('input[name="email"]').value.trim();
//     const mobileNumber = form.querySelector('input[name="mobileNumber"]');

//     const nameRegex = /^[A-Za-z]+\s+[A-Za-z]+(\s*[A-Za-z]*)*$/;
//     if (!nameRegex.test(name)) {
//         alert('Please enter a valid full name with first name and surname, containing only letters.');
//         return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         alert('Please enter a valid email address.');
//         return false;
//     }
// }

export async function renderDataFromAPI(url) {
    const resp = await fetchAPI('GET', url);
    const data = await resp.json();
    return data;
}

export function fetchAPI(method, url, data) {
    return new Promise(async (resolve, reject) => {
        try {
            if (method === 'GET') {
                const resp = await fetch(url);
                resolve(resp);
            } else if (method === 'POST') {
                data.headerJson = data.headerJson || {
                    'Content-Type': 'application/json',
                };

                if (data.headerJson['Content-Type'] == 'remove') {
                    data.headerJson['Content-Type'] = '';
                } else {
                    data.headerJson['Content-Type'] = data.headerJson['Content-Type'] ? data.headerJson['Content-Type'] : 'application/json';
                }

                const request = new Request(url, {
                    method: 'POST',
                    body: JSON.stringify(data.requestJson),
                    headers: data.headerJson,
                });
                const response = await fetch(request);
                const json = await response.json();
                resolve({ responseJson: json });
            }
        } catch (error) {
            console.warn(error);
            reject(error);
        }
    });
}