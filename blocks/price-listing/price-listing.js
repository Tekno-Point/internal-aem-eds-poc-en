import { fetchProdcut } from "../../scripts/common.js";
export default async function decorateBlocks(){
   const data = await fetchProdcut()
   console.log(data);
}
//   // Wait for dataMapping to be available (injected globally by scripts.js)
//   let dataMapping = null;
//   if (window.dataMappingPromise) {
//     dataMapping = await window.dataMappingPromise;
//   } else {
//     let tries = 0;
//     while (!window.dataMapping && tries < 20) {
//       await new Promise(res => setTimeout(res, 100));
//       tries++;
//     }
//     dataMapping = window.dataMapping;
//   }
//   if (!dataMapping) {
//     block.innerHTML = '<div class="error">Could not load price data.</div>';
//     return;
//   }

//   // Example: Use Maharashtra and Mumbai as default
//   const defaultState = 'MAHARASHTRA';
//   const defaultCityCode = Object.keys(dataMapping.state_city_master_rev[defaultState])[0];
//   const defaultCity = dataMapping.state_city_master_rev[defaultState][defaultCityCode];

//   // --- DOM Manipulation: Insert dropdowns and price table after heading ---
//   // Find the heading (h1 or h2) in the block
//   const heading = block.querySelector('h1, h2');
//   // Find the note (the p with the a link to prices)
//   const note = block.querySelector('p a[href*="price"]')?.closest('p');

//   // Create container for dropdowns and price table
//   const container = document.createElement('div');
//   container.className = 'price-listing-dynamic';

//   // State/City selectors (interactive dropdowns)
//   const stateCityContainer = document.createElement('div');
//   stateCityContainer.className = 'price-listing__row-col--container row';

//   // State dropdown
//   const stateCol = document.createElement('div');
//   stateCol.className = 'custom-select-state-city z-1 px-md-6 px-lg-6';
//   const stateColInner = document.createElement('div');
//   stateColInner.className = 'custom-select-state-city__col';
//   const stateAuto = document.createElement('div');
//   stateAuto.className = 'custom-autocomplete position-relative';
//   const stateLabel = document.createElement('label');
//   stateLabel.setAttribute('for', 'state-select');
//   stateLabel.textContent = 'State';
//   stateAuto.appendChild(stateLabel);
//   const stateSelect = document.createElement('select');
//   stateSelect.className = 'react-select__input';
//   stateSelect.id = 'state-select';
//   dataMapping.state_city_master_rev.state.forEach(state => {
//     const opt = document.createElement('option');
//     opt.value = state;
//     opt.textContent = state;
//     if (state === defaultState) opt.selected = true;
//     stateSelect.appendChild(opt);
//   });
//   stateAuto.appendChild(stateSelect);
//   stateColInner.appendChild(stateAuto);
//   stateCol.appendChild(stateColInner);
//   stateCityContainer.appendChild(stateCol);

//   // City dropdown
//   const cityCol = document.createElement('div');
//   cityCol.className = 'custom-select-state-city__col false';
//   const cityAuto = document.createElement('div');
//   cityAuto.className = 'custom-autocomplete position-relative';
//   const cityLabel = document.createElement('label');
//   cityLabel.setAttribute('for', 'city-select');
//   cityLabel.textContent = 'City';
//   cityAuto.appendChild(cityLabel);
//   const citySelect = document.createElement('select');
//   citySelect.className = 'react-select__input';
//   citySelect.id = 'city-select';
//   // Fill city options for default state
//   Object.values(dataMapping.state_city_master_rev[defaultState]).forEach(city => {
//     if (typeof city !== 'object' || !city.name) return;
//     const opt = document.createElement('option');
//     opt.value = city.code;
//     opt.textContent = city.name;
//     if (city.code === defaultCity.code) opt.selected = true;
//     citySelect.appendChild(opt);
//   });
//   cityAuto.appendChild(citySelect);
//   cityCol.appendChild(cityAuto);
//   stateCityContainer.appendChild(cityCol);
//   container.appendChild(stateCityContainer);

//   // Price details
//   const priceInfo = document.createElement('div');
//   priceInfo.className = 'price-details--info w-100 my-lg-4 px-0';

//   // Table header
//   const headerRow = document.createElement('div');
//   headerRow.className = 'row';
//   const variantHeaderCol = document.createElement('div');
//   variantHeaderCol.className = 'col-6';
//   const variantHeader = document.createElement('div');
//   variantHeader.className = 'price-details-col pb-6 pb-sm-12';
//   const variantHeaderText = document.createElement('div');
//   variantHeaderText.className = 'price-details-col__text h4 weight-heavy';
//   variantHeaderText.textContent = 'Variant';
//   variantHeader.appendChild(variantHeaderText);
//   variantHeaderCol.appendChild(variantHeader);
//   headerRow.appendChild(variantHeaderCol);

//   const priceHeaderCol = document.createElement('div');
//   priceHeaderCol.className = 'col-6';
//   const priceHeader = document.createElement('div');
//   priceHeader.className = 'price-details-col pb-6 pb-sm-12 ps-6 pe-0';
//   const priceHeaderText = document.createElement('div');
//   priceHeaderText.className = 'price-details-col__text h4 weight-heavy';
//   priceHeaderText.textContent = 'Ex-Showroom Price';
//   priceHeader.appendChild(priceHeaderText);
//   priceHeaderCol.appendChild(priceHeader);
//   headerRow.appendChild(priceHeaderCol);
//   priceInfo.appendChild(headerRow);

//   // Helper to render price details for selected state/city
//   function renderPriceDetails(state, cityCode) {
//     // Remove old price info
//     while (priceInfo.children.length > 1) priceInfo.removeChild(priceInfo.lastChild);
//     const cityObj = dataMapping.state_city_master_rev[state][cityCode];
//     if (cityObj && cityObj.variants) {
//       cityObj.variants.forEach(variant => {
//         const row = document.createElement('div');
//         row.className = 'row';
//         const variantCol = document.createElement('div');
//         variantCol.className = 'col-6';
//         const variantDiv = document.createElement('div');
//         variantDiv.className = 'price-details-col pb-6 pb-sm-12';
//         const variantText = document.createElement('div');
//         variantText.className = 'price-details-col__text';
//         const variantP = document.createElement('p');
//         variantP.className = 'body2 weight-medium';
//         variantP.textContent = variant.name;
//         variantText.appendChild(variantP);
//         variantDiv.appendChild(variantText);
//         variantCol.appendChild(variantDiv);
//         row.appendChild(variantCol);

//         const priceCol = document.createElement('div');
//         priceCol.className = 'col-6';
//         const priceDiv = document.createElement('div');
//         priceDiv.className = 'price-details-col pb-6 pb-sm-12 ps-6 pe-6';
//         const priceText = document.createElement('div');
//         priceText.className = 'price-details-col__text';
//         const priceP = document.createElement('p');
//         priceP.className = 'body2 weight-medium';
//         priceP.textContent = variant.price ? `₹ ${variant.price}` : '-';
//         priceText.appendChild(priceP);
//         priceDiv.appendChild(priceText);
//         priceCol.appendChild(priceDiv);
//         row.appendChild(priceCol);

//         priceInfo.appendChild(row);
//       });
//     }
//   }

//   // Initial render
//   renderPriceDetails(defaultState, defaultCity.code);

//   // Enable/disable city dropdown based on state
//   stateSelect.addEventListener('change', () => {
//     // Remove all city options
//     while (citySelect.firstChild) citySelect.removeChild(citySelect.firstChild);
//     // Add new city options
//     Object.values(dataMapping.state_city_master_rev[stateSelect.value]).forEach(city => {
//       if (typeof city !== 'object' || !city.name) return;
//       const opt = document.createElement('option');
//       opt.value = city.code;
//       opt.textContent = city.name;
//       citySelect.appendChild(opt);
//     });
//     citySelect.disabled = false;
//     // Optionally, trigger price update here
//     renderPriceDetails(stateSelect.value, citySelect.value);
//   });

//   citySelect.addEventListener('change', () => {
//     renderPriceDetails(stateSelect.value, citySelect.value);
//   });

//   container.appendChild(priceInfo);

//   // Insert the container after the heading and before the note
//   if (heading && heading.parentNode) {
//     heading.parentNode.insertBefore(container, note || heading.nextSibling);
//   } else {
//     block.appendChild(container);
//   }
