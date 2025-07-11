import { fetchStateCityMaster, fetchProdcut } from "../../scripts/common.js";
import { div, label, select, option, fieldset, p } from "../../scripts/dom-helpers.js";

export default async function decorate(block) {
  // Fetch state/city data
  const stateCityData = await fetchStateCityMaster();
  const states = stateCityData.data.stateCity.map(item => ({
    code: item.code,
    label: item.label,
    cities: item.cities
  }));

  // Build the entire HTML structure together for readability
  const stateSelect = select({ class: 'react-select__input' },
    ...states.map(state => option({ value: state.label }, state.label))
  );
  const citySelect = select({ class: 'react-select__input' });
  const priceInfo = div({ class: 'price-details--info w-100 my-lg-4 px-0' });

  // Create dropdowns container
  const dropdownsContainer = div({ class: 'price-listing__row-col--container row' },
    div({ class: 'custom-select-state-city z-1 px-md-6 px-lg-6' },
      div({ class: 'custom-select-state-city__col' },
        div({ class: 'custom-autocomplete position-relative' },
          label({}, 'State'),
          stateSelect
        )
      )
    ),
    div({ class: 'custom-select-state-city__col false' },
      div({ class: 'custom-autocomplete position-relative' },
        label({}, 'City'),
        citySelect
      )
    )
  );
  // Create fieldset for price info
  const fieldsetEl = fieldset({ class: 'my-lg-12 my-6 w-100' }, priceInfo);
  // Append both to block, fieldset outside dropdownsContainer
  block.appendChild(dropdownsContainer);
  block.appendChild(fieldsetEl);

  // --- Populate city dropdown and price table ---
  function updateCityDropdown(stateLabel) {
    const state = states.find(s => s.label === stateLabel);
    citySelect.innerHTML = '';
    if (state && state.cities) {
      state.cities.forEach(city => {
        citySelect.appendChild(option({ value: city.code }, city.label));
      });
    }
  }

  async function renderPriceTable(stateLabel, cityCode) {
    priceInfo.innerHTML = '';
    // Table header
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
    // Fetch variants for selected state/city
    const state = states.find(s => s.label === stateLabel);
    if (!state) return;
    const city = state.cities.find(c => c.code === cityCode);
    if (!city) return;
    // Fetch product API for variants
    const productData = await fetchProdcut(state.label, city.code);
    const variantData = productData?.data?.products?.items?.[0]?.variant_to_colors || [];
    const variants = variantData.map(v => ({
    name: v.label,
    price: `₹ ${v.variant_price}`,
    }));

    variants.forEach(variant => {
      const row = div({ class: 'row' },
        div({ class: 'col-6' },
          div({ class: 'price-details-col pb-6 pb-sm-12' },
            div({ class: 'price-details-col__text' },
              p({ class: 'body2 weight-medium' }, variant.name)
            )
          )
        ),
        div({ class: 'col-6' },
          div({ class: 'price-details-col pb-6 pb-sm-12 ps-6 pe-6' },
            div({ class: 'price-details-col__text' },
              p({ class: 'body2 weight-medium' }, variant.price ? `₹ ${variant.price}` : '-')
            )
          )
        )
      );
      priceInfo.appendChild(row);
    });
  }

  // --- Event listeners ---
  stateSelect.addEventListener('change', () => {
    updateCityDropdown(stateSelect.value);
    if (citySelect.options.length > 0) {
      renderPriceTable(stateSelect.value, citySelect.value);
    } else {
      priceInfo.innerHTML = '';
    }
  });
  citySelect.addEventListener('change', () => {
    renderPriceTable(stateSelect.value, citySelect.value);
  });

  // Initial population
  updateCityDropdown(stateSelect.value);
  if (citySelect.options.length > 0) {
    renderPriceTable(stateSelect.value, citySelect.value);
  }
}
