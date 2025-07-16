import { fetchStateCityMaster, fetchStateCity, fetchProduct } from "../../scripts/common.js";
import { div, label, fieldset, p } from "../../scripts/dom-helpers.js";

export default async function decorate(block) {
  const stateCityData = await fetchStateCityMaster();
  const states = stateCityData.data.stateCity.map(item => ({
    code: item.code,
    label: item.label,
    cities: item.cities,
  }));

  // 🧭 Get current location
  let current = await fetchStateCity();
  let selectedState = states.find(s => s.label.toUpperCase() === current.state.toUpperCase()) || states[0];
  let selectedCity = selectedState.cities.find(c => c.label.toUpperCase() === current.city.toUpperCase()) || selectedState.cities[0];

  const stateWrapper = div({ class: 'input-wrapper' });
  const stateInput = document.createElement('input');
  stateInput.setAttribute('placeholder', 'Select State');
  stateInput.setAttribute('class', 'react-select__input');
  stateInput.setAttribute('autocomplete', 'off');
  const clearState = document.createElement('span');
  clearState.className = 'clear-btn';
  clearState.textContent = '×';
  stateWrapper.appendChild(stateInput);
  stateWrapper.appendChild(clearState);

  const stateList = document.createElement('div');
  stateList.className = 'custom-dropdown-list scrollable';
  stateList.style.display = 'none';

  const cityWrapper = div({ class: 'input-wrapper' });
  const cityInput = document.createElement('input');
  cityInput.setAttribute('placeholder', 'Select City');
  cityInput.setAttribute('class', 'react-select__input');
  cityInput.setAttribute('autocomplete', 'off');
  const clearCity = document.createElement('span');
  clearCity.className = 'clear-btn';
  clearCity.textContent = '×';
  cityWrapper.appendChild(cityInput);
  cityWrapper.appendChild(clearCity);

  const cityList = document.createElement('div');
  cityList.className = 'custom-dropdown-list scrollable';
  cityList.style.display = 'none';

  const dropdownsContainer = div({ class: 'price-listing__row-col--container row' },
    div({ class: 'custom-select-state-city z-1 px-md-6 px-lg-6' },
      div({ class: 'custom-select-state-city__col' },
        div({ class: 'custom-autocomplete position-relative' },
          label({}, 'State'),
          stateWrapper,
          stateList
        )
      )
    ),
    div({ class: 'custom-select-state-city__col false' },
      div({ class: 'custom-autocomplete position-relative' },
        label({}, 'City'),
        cityWrapper,
        cityList
      )
    )
  );

  const priceInfo = div({ class: 'price-details--info w-100 my-lg-4 px-0' });
  const fieldsetEl = fieldset({ class: 'my-lg-12 my-6 w-100' }, priceInfo);

  const headingWrapper = block.querySelector('h1')?.closest('div');
  const headingUL = headingWrapper?.querySelector('ul');
  const liList = headingUL?.querySelectorAll('li');

  if (liList?.length > 0) {
    const firstLi = liList[0];
    firstLi.innerHTML = '';
    firstLi.appendChild(dropdownsContainer);
    firstLi.appendChild(fieldsetEl);
  }

  if (liList?.length > 1) {
    const secondLi = liList[1];
    const innerUL = secondLi.querySelector('ul');
    if (innerUL) {
      const labels = [...innerUL.querySelectorAll('li')].map(li => li.textContent?.trim());
      const wrapper = document.createElement('div');
      wrapper.className = 'price-listing__row-col--button align-items-center d-flex';

      if (labels[0]) {
        const btn1 = document.createElement('a');
        btn1.href = '/content/hero-commerce/in/en/pre-approved-offers.html';
        btn1.textContent = labels[0];
        btn1.className = 'avail-finance-button-size button button--secondary weight-heavy bg-white text-error border-error text-uppercase d-flex border rounded-2 cta-text py-4 px-12 d-inline-flex justify-content-center flex-row text-center align-items-center';
        wrapper.appendChild(btn1);
      }

      if (labels[1]) {
        const btn2 = document.createElement('a');
        btn2.href = 'https://www.heromotocorp.com/en-in/buy-now/practical/splendor-plus.html';
        btn2.textContent = labels[1];
        btn2.className = 'buynow-button-size button button--primary weight-heavy cta-text d-flex flex-row justify-content-center align-items-center text-uppercase rounded-2 py-4 px-12 py-sm-5 px-sm-16 text-white gradient-1 border-0';
        wrapper.appendChild(btn2);
      }

      innerUL.replaceWith(wrapper);
    }
  }

  function populateList(input, list, data, onSelect) {
    list.innerHTML = '';
    const value = input.value.toLowerCase();
    const filtered = data.filter(d => d.label.toLowerCase().includes(value));
    filtered.forEach(item => {
      const divEl = document.createElement('div');
      divEl.textContent = item.label;
      divEl.className = 'dropdown-item';
      divEl.addEventListener('click', () => {
        input.value = item.label;
        list.style.display = 'none';
        onSelect(item);
      });
      list.appendChild(divEl);
    });
    list.style.display = filtered.length ? 'block' : 'none';
  }

  async function renderPriceTable(stateLabel, cityCode) {
    priceInfo.innerHTML = '';

    const headerRow = div({ class: 'row' },
      div({ class: 'col-6' },
        div({ class: 'price-details-col pb-6 pb-sm-12' },
          div({ class: 'price-details-col__text h4 weight-heavy' }, 'Variant')
        )
      ),
      div({ class: 'col-6' },
        div({ class: 'price-details-col pb-6 pb-sm-12 ps-6 pe-0' },
          div({ class: 'price-details-col__text h4 weight-heavy' }, 'Ex-Showroom Price')
        )
      )
    );
    priceInfo.appendChild(headerRow);

    const state = states.find(s => s.label === stateLabel);
    if (!state) return;
    const city = state.cities.find(c => c.code === cityCode);
    if (!city) return;

    const productData = await fetchProduct(state.label, city.code);
    const variants = productData?.data?.products?.items?.[0]?.variant_to_colors || [];

    variants.forEach(v => {
      const row = div({ class: 'row' },
        div({ class: 'col-6' },
          div({ class: 'price-details-col pb-6 pb-sm-12' },
            div({ class: 'price-details-col__text' },
              p({ class: 'body2 weight-medium' }, v.label)
            )
          )
        ),
        div({ class: 'col-6' },
          div({ class: 'price-details-col pb-6 pb-sm-12 ps-6 pe-6' },
            div({ class: 'price-details-col__text' },
              p({ class: 'body2 weight-medium' }, `₹ ${v.variant_price}`)
            )
          )
        )
      );
      priceInfo.appendChild(row);
    });
  }

  stateInput.addEventListener('input', () => {
    populateList(stateInput, stateList, states, (selected) => {
      selectedState = selected;
      selectedCity = selected.cities[0];
      cityInput.disabled = false;
      cityInput.value = selectedCity.label;
      renderPriceTable(selectedState.label, selectedCity.code);
    });
  });

  cityInput.addEventListener('input', () => {
    populateList(cityInput, cityList, selectedState.cities, (selected) => {
      selectedCity = selected;
      renderPriceTable(selectedState.label, selectedCity.code);
    });
  });

  clearState.addEventListener('click', () => {
    stateInput.value = '';
    stateList.style.display = 'none';
  });

  clearCity.addEventListener('click', () => {
    cityInput.value = '';
    cityList.style.display = 'none';
  });

  document.addEventListener('click', (e) => {
    if (!stateInput.contains(e.target) && !stateList.contains(e.target)) {
      stateList.style.display = 'none';
    }
    if (!cityInput.contains(e.target) && !cityList.contains(e.target)) {
      cityList.style.display = 'none';
    }
  });

  // ✅ Init inputs and load variants
  stateInput.value = selectedState.label;
  cityInput.value = selectedCity.label;
  renderPriceTable(selectedState.label, selectedCity.code);
}
