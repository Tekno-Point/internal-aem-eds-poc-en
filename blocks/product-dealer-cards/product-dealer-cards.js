import { getDataMapping, fetchStateCityMaster } from '../../scripts/common.js';
import { fetchDealers } from './dealer-render.js';

export default function decorate(block) {
  const stateSelect = document.createElement('select');
  const citySelect = document.createElement('select');

  // Create dropdown containers
  const dropdownsContainer = document.createElement('div');
  dropdownsContainer.className = 'dealers__dropdowns d-flex mb-8';
  dropdownsContainer.appendChild(stateSelect);
  dropdownsContainer.appendChild(citySelect);
  block.textContent = '';
  block.appendChild(dropdownsContainer);

  // Load states and cities
  (async () => {
    const stateCityData = await fetchStateCityMaster();
    const states = stateCityData.data.stateCity.map(item => ({
      code: item.code,
      label: item.label,
      cities: item.cities,
    }));

    // Populate state dropdown
    states.forEach(state => {
      const opt = document.createElement('option');
      opt.value = state.label;
      opt.textContent = state.label;
      stateSelect.appendChild(opt);
    });

    function updateCityDropdown(stateLabel) {
      const state = states.find(s => s.label === stateLabel);
      citySelect.innerHTML = '';
      state?.cities?.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.label; // Use label here
        opt.textContent = city.label;
        citySelect.appendChild(opt);
      });
    }

    // Set initial values
    stateSelect.value = 'MAHARASHTRA';
    updateCityDropdown('MAHARASHTRA');
    citySelect.value = 'MUMBAI';

    // Render dealer data (just logs to console)
    async function renderDealers(stateLabel, cityLabel) {
      const mapping = await getDataMapping();
      const codeData = mapping.city_state_master[stateLabel][cityLabel];
      const dealerData = await fetchDealers(mapping.sku, codeData.stateCode, codeData.code);
      console.log("RAW DEALER DATA:", dealerData);
    }

    // Initial render
    renderDealers(stateSelect.value, citySelect.value);

    // Add listeners
    stateSelect.addEventListener('change', () => {
      updateCityDropdown(stateSelect.value);
      const selectedCity = citySelect.options[0]?.text;
      citySelect.value = selectedCity;
      renderDealers(stateSelect.value, selectedCity);
    });

    citySelect.addEventListener('change', () => {
      const selectedCity = citySelect.options[citySelect.selectedIndex].text;
      renderDealers(stateSelect.value, selectedCity);
    });
  })();
}



