import { fetchDealers, useDataMapping } from '../../scripts/common.js';

export default async function decorate(block) {
    const [dataMapping, setDataMapping] = await useDataMapping();    

    const stateCityData = dataMapping.state_city_master;
    debugger;
    const currentLoc = dataMapping.current_location;
    const productSku = dataMapping.sku;

    let dropdownsContainer = block.querySelector('.dealers__dropdowns');
    let stateSelect = dropdownsContainer?.querySelector('select:first-child');
    let citySelect = dropdownsContainer?.querySelector('select:last-child');

    if (!dropdownsContainer) {
        dropdownsContainer = document.createElement('div');
        dropdownsContainer.className = 'dealers__dropdowns d-flex mb-8';
        block.appendChild(dropdownsContainer);
    }
    if (!stateSelect) {
        stateSelect = document.createElement('select');
        dropdownsContainer.appendChild(stateSelect);
    }
    if (!citySelect) {
        citySelect = document.createElement('select');
        dropdownsContainer.appendChild(citySelect);
    }

    stateSelect.id = 'state-select';
    citySelect.id = 'city-select';

    stateSelect.innerHTML = '';
    citySelect.innerHTML = '';

    // Populate State Dropdown
    stateSelect.add(new Option('Select State', ''));
    stateCityData.state.forEach(stateLabel => {
        stateSelect.add(new Option(stateLabel, stateLabel));
    });

    // Function to Update City Dropdown
    function updateCityDropdown(selectedStateLabel) {
        citySelect.innerHTML = '';
        citySelect.add(new Option('Select City', ''));

        if (selectedStateLabel && stateCityData[selectedStateLabel]) {
            const citiesInState = stateCityData[selectedStateLabel];
            for (const cityCode in citiesInState) {
                if (Object.hasOwnProperty.call(citiesInState, cityCode)) {
                    const city = citiesInState[cityCode];
                    citySelect.add(new Option(city.label, city.code));
                }
            }
        }
    }

    // Function to Render Dealers
    async function renderDealers(selectedStateLabel, selectedCityCode) {
        let stateCode = '';
        if (selectedStateLabel && selectedCityCode && stateCityData[selectedStateLabel] && stateCityData[selectedStateLabel][selectedCityCode]) {
            stateCode = stateCityData[selectedStateLabel][selectedCityCode].stateCode;
        }

        if (productSku && stateCode && selectedCityCode) {
            const dealerData = await fetchDealers(productSku, stateCode, selectedCityCode);
            console.log("FETCHED DEALER DATA:", dealerData);
            // TODO: Add logic here to display the dealerData on your page
        } else {
            console.log("Invalid selection or missing SKU for fetching dealers.");
        }
    }

    // Initial Load Logic (using data from currentlocation if available)
    const initialSelectedStateLabel = currentLoc.state.toUpperCase();
    const initialSelectedCityCode = currentLoc.city.toUpperCase();

    stateSelect.value = initialSelectedStateLabel;
    updateCityDropdown(initialSelectedStateLabel);
    citySelect.value = initialSelectedCityCode;
    renderDealers(initialSelectedStateLabel, initialSelectedCityCode);

    // Event Listeners
    stateSelect.addEventListener('change', () => {
        const selectedStateLabel = stateSelect.value;
        updateCityDropdown(selectedStateLabel);
        const firstRealCityOptionValue = citySelect.options.length > 1 ? citySelect.options[1].value : '';
        citySelect.value = firstRealCityOptionValue;
        renderDealers(selectedStateLabel, firstRealCityOptionValue);
    });

    citySelect.addEventListener('change', () => {
        renderDealers(stateSelect.value, citySelect.value);
    });
}