import { div, h3, p } from '../../scripts/dom-helper.js';
import { initSwiperOnly } from '../carousel/carousel.js';
import { showCards } from '../modal/modal.js';

// Ensure Swiper CSS is loaded
(function ensureSwiperCss() {
  if (!document.querySelector('link[href*="swiper-bundle.min.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/blocks/carousel/swiper-bundle.min.css';
    document.head.appendChild(link);
  }
}());
async function fetchGraphQL(url, req) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
//   myHeaders.append('Cookie', 'affinity="c83f9eaf4f54c838"');

  const graphql = JSON.stringify({
    query: '',
    variables: req,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow',
  };

  const resp = await fetch(url, requestOptions);
  const json = await resp.json();
  return json;
}
function getAssetsAPI(url) {
  return url.replace('/content/dam', '/api/assets');
}
const exclude = ['author-p48457-e1275402.adobeaemcloud.com', 'localhost:3000'];
export default async function decorate(block) {
  if (!block.textContent.trim()) {
    return block;
  }
  const configResp = await fetch('/config.json');
  const config = await configResp.json();
  let origin = config.data[0].value;
  if (exclude.includes(window.location.host)) {
    origin = 'https://publish-p48457-e1275402.adobeaemcloud.com';
  }

  Array.from(block.children).forEach(async (row, i) => {
    const item = row.querySelector('a');
    const formurl = new URL(item.href)?.pathname.replace('.html', '');
    const searchpara = new URL(item.href).search;
    // const searchpara = '?id='+ (Math.random()*10);
    let url = `${origin}/graphql/execute.json/internal-aem-eds-poc/trending-destination-list`;
    // let url = `${origin}/graphql/execute.json/internal-aem-eds-poc/trending-destination-list;path=${formurl}${searchpara}`
    // if(block.classList.contains('asset-api')){
    console.log(url);
    if (block.classList.contains('marque')) {
      url = `${origin + getAssetsAPI(formurl)}.json`;
      const response = await fetch((url), {
        method: 'GET',
      });
      const respData = await response.json();
      console.log(respData);

      const marqueewrapper = document.createElement('div');
      marqueewrapper.classList.add('marque-wrapper');
      marqueewrapper.innerHTML = `
               <h3 class='marque-heading'>${respData.properties.elements.head.value}</h3>
               <div class='marque-description'>${respData.properties.elements.description.value}</div>
            `;
      row.firstElementChild.firstElementChild.remove();
      row.firstElementChild.append(marqueewrapper);
      return;
    }

    // }
    //    let url = "https://publish-p48457-e1275402.adobeaemcloud.com/api/assets/internal-aem-eds-poc/cf/srilankan-airlines/marque.json";
    // if (block.classList.contains('marque')) {
    //     url = `${origin}/graphql/execute.json/internal-aem-eds-poc/marque;path=${formurl}${searchpara}`;
    //     // url = "https://publish-p48457-e1275402.adobeaemcloud.com/api/assets/internal-aem-eds-poc/cf/srilankan-airlines/marque.json";
    //     const response = await fetch((url), {
    //         method: "GET"
    //     });
    //     const respData = await response.json();
    //     console.log(respData.properties.elements.head.value)
    //     console.log(respData.properties.elements.description.value)

    //     //   const marqueData = respData?.data?.srilankaMarqueByPath?.item;

    //     const marqueewrapper = document.createElement('div');
    //     marqueewrapper.classList.add("marque-wrapper")
    //     marqueewrapper.innerHTML = `
    //        <h3 class='marque-heading'>${respData.properties.elements.head.value}</h3>
    //        <div class='marque-description'>${respData.properties.elements.description.value}</div>
    //     `
    //     row.firstElementChild.firstElementChild.remove()
    //     row.firstElementChild.append(marqueewrapper);
    //     return
    // }
    const respData = await fetchGraphQL((url), { path: formurl });
    // const respData = await response.json();
    // console.log(respData)
    // Render the carousel markup
    let carousel = renderUI(respData?.data?.cfListByPath?.item?.contentFragment);

    // If renderUI returns an array, wrap it in a div
    if (Array.isArray(carousel)) {
      const wrapper = document.createElement('div');
      carousel.forEach((el) => wrapper.appendChild(el));
      carousel = wrapper;
    }
    // Remove all children before appending carousel
    // while (block.firstChild) block.removeChild(block.firstChild);
    row.firstElementChild.firstElementChild.remove();
    if (carousel instanceof HTMLElement) {
      // block.appendChild(carousel);
      row.firstElementChild.append(carousel);
    }
    // Only initialize Swiper (do not re-wrap slides)
    if (carousel instanceof HTMLElement) {
      initSwiperOnly(carousel);
    }

    showCards(respData?.data?.cfListByPath?.item?.contentFragment);
    window.addEventListener('userDataSave', (e) => {
      showCards(respData?.data?.cfListByPath?.item?.contentFragment);
    });
  });
}

function renderUI(data = []) {
  // Helper to clear all filters
  function clearAllFilters() {
    fromValue = '';
    toValue = '';
    departureError = '';
    budgetValue = '';
    filteredData = data;
    // Replace cards row
    const cardsRow = document.querySelector('.fares-carousel-content .fr-row.fr-mt-3');
    if (cardsRow && cardsRow.parentNode) {
      const newCards = div(
        { class: 'fr-row fr-mt-3' },
        div(
          { class: 'fr-col fr-h-100' },
          div(
            { class: 'carousel swiper' },
            div(
              { class: 'swiper-wrapper' },
              ...renderCard(filteredData),
            ),
            div({ class: 'swiper-button-prev' }),
            div({ class: 'swiper-button-next' }),
            div({ class: 'swiper-pagination' }),
          ),
        ),
      );
      cardsRow.parentNode.replaceChild(newCards, cardsRow);
      // Re-init Swiper
      initSwiperOnly(newCards.querySelector('.carousel.swiper'));
    }
    // Remove any open popover
    const old = document.querySelector('.popover-body');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    // Remove any open sort popover
    const sortOld = document.querySelector('.sort-popover');
    if (sortOld && sortOld.parentNode) sortOld.parentNode.removeChild(sortOld);
  }
  // Helper to apply sort
  function applySort(sortType) {
    if (sortType === 'price-asc') {
      filteredData = [...filteredData].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === 'price-desc') {
      filteredData = [...filteredData].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortType === 'popular') {
      // Only show cards with type 'popular'
      filteredData = [...data].filter((card) => card.type === 'popular');
    } else if (sortType === 'duration') {
      // Only show cards with type 'duration'
      filteredData = [...data].filter((card) => card.type === 'duration');
    } else if (sortType === 'duration') {
      // Only show cards with type 'duration'
      filteredData = [...data].filter((card) => card.type === 'duration');
    }
    // Replace cards row
    const cardsRow = document.querySelector('.fares-carousel-content .fr-row.fr-mt-3');
    if (cardsRow && cardsRow.parentNode) {
      const newCards = div(
        { class: 'fr-row fr-mt-3' },
        div(
          { class: 'fr-col fr-h-100' },
          div(
            { class: 'carousel swiper' },
            div(
              { class: 'swiper-wrapper' },
              ...renderCard(filteredData),
            ),
            div({ class: 'swiper-button-prev' }),
            div({ class: 'swiper-button-next' }),
            div({ class: 'swiper-pagination' }),
          ),
        ),
      );
      cardsRow.parentNode.replaceChild(newCards, cardsRow);
      // Re-init Swiper
      initSwiperOnly(newCards.querySelector('.carousel.swiper'));
    }
  }

  // Popover for sort by
  function sortPopover(target) {
    let popover;
    function closePopover() {
      if (popover && popover.parentNode) popover.parentNode.removeChild(popover);
      document.removeEventListener('mousedown', handleClickOutside, true);
    }
    function handleClickOutside(e) {
      if (popover && !popover.contains(e.target) && !target.contains(e.target)) {
        closePopover();
      }
    }
    popover = div(
      { class: 'sort-popover', style: 'position:absolute;z-index:1000;top:0;left:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.15);padding:8px 0;border-radius:8px;min-width:160px;' },
      div({ class: 'sort-option', style: 'padding:8px 16px;cursor:pointer;', onclick: () => { applySort('price-asc'); closePopover(); } }, 'Price: Low to High'),
      div({ class: 'sort-option', style: 'padding:8px 16px;cursor:pointer;', onclick: () => { applySort('price-desc'); closePopover(); } }, 'Price: High to Low'),
      div({ class: 'sort-option', style: 'padding:8px 16px;cursor:pointer;', onclick: () => { applySort('popular'); closePopover(); } }, 'Popular'),
      div({ class: 'sort-option', style: 'padding:8px 16px;cursor:pointer;', onclick: () => { applySort('duration'); closePopover(); } }, 'Duration'),
    );
    // Position popover below the target
    setTimeout(() => {
      if (!target || !popover) return;
      const rect = target.getBoundingClientRect();
      popover.style.top = `${rect.bottom + window.scrollY + 4}px`;
      popover.style.left = `${rect.left + window.scrollX}px`;
      popover.style.minWidth = `${rect.width}px`;
    }, 0);
    document.addEventListener('mousedown', handleClickOutside, true);
    return popover;
  }

  // Handler for Sort By click
  function onSortByClick(e) {
    // Remove any existing sort popover
    const old = document.querySelector('.sort-popover');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    // Insert new popover as child of body, positioned below Sort By button
    const target = e.currentTarget;
    const pop = sortPopover(target);
    document.body.appendChild(pop);
  }
  // Build city/codes list for suggestions
  const cityOptions = (() => {
    const set = new Set();
    data.forEach((card) => {
      if (card.departureCity) set.add(card.departureCity);
      if (card.departureCode) set.add(card.departureCode);
      if (card.destinationCity) set.add(card.destinationCity);
      if (card.destinationCode) set.add(card.destinationCode);
    });
    return Array.from(set).filter(Boolean);
  })();
    // console.log(cityOptions)
    // State for departure filter
  let fromValue = '';
  let toValue = '';
  let departureError = '';

  // Helper to re-render cards based on departure filter
  function applyDepartureFilter(from, to) {
    fromValue = from;
    toValue = to;
    departureError = '';
    if (from && to && from.trim().toLowerCase() === to.trim().toLowerCase()) {
      departureError = 'From and To cannot be the same city.';
      return;
    }
    if (from && to) {
      filteredData = data.filter((card) => card.departureCity && card.destinationCity
                && card.departureCity.toLowerCase().includes(from.trim().toLowerCase())
                && card.destinationCity.toLowerCase().includes(to.trim().toLowerCase()));
    } else if (from) {
      filteredData = data.filter((card) => card.departureCity && card.departureCity.toLowerCase().includes(from.trim().toLowerCase()));
    } else if (to) {
      filteredData = data.filter((card) => card.destinationCity && card.destinationCity.toLowerCase().includes(to.trim().toLowerCase()));
    } else {
      filteredData = data;
    }
    // Replace cards row
    const cardsRow = document.querySelector('.fares-carousel-content .fr-row.fr-mt-3');
    if (cardsRow && cardsRow.parentNode) {
      const newCards = div(
        { class: 'fr-row fr-mt-3' },
        div(
          { class: 'fr-col fr-h-100' },
          div(
            { class: 'carousel swiper' },
            div(
              { class: 'swiper-wrapper' },
              ...renderCard(filteredData),
            ),
            div({ class: 'swiper-button-prev' }),
            div({ class: 'swiper-button-next' }),
            div({ class: 'swiper-pagination' }),
          ),
        ),
      );
      cardsRow.parentNode.replaceChild(newCards, cardsRow);
      // Re-init Swiper
      initSwiperOnly(newCards.querySelector('.carousel.swiper'));
    }
  }

  // Popover for departure filter
  function departurePopover(target) {
    const fromInputId = `input-from-${Math.floor(Math.random() * 1e10)}`;
    const toInputId = `input-to-${Math.floor(Math.random() * 1e10)}`;
    const fromLabelId = `label-from-${Math.floor(Math.random() * 1e10)}`;
    const toLabelId = `label-to-${Math.floor(Math.random() * 1e10)}`;
    const fromDescId = `desc-from-${Math.floor(Math.random() * 1e10)}`;
    const toDescId = `desc-to-${Math.floor(Math.random() * 1e10)}`;
    let popover;
    let from = fromValue;
    let to = toValue;
    let error = '';
    function createInput(id, value, placeholder, descId, onInput, suggestionsId) {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = id;
      input.value = value;
      input.placeholder = placeholder;
      input.setAttribute('aria-describedby', descId);
      input.className = 'fr-form-control fr-text-truncate fr-pb-0 fr-bg-white fr-text-text fr--1744952970 fr--1367210408 fr-1020490854 fr--413156497 fr-1905770537';
      input.autocomplete = 'off';
      input.setAttribute('aria-autocomplete', 'list');
      input.setAttribute('aria-controls', suggestionsId);
      let dropdown;
      function showSuggestions(val) {
        const filtered = cityOptions.filter((opt) => opt.toLowerCase().includes(val.trim().toLowerCase()));
        if (!filtered.length || !val.trim()) {
          if (dropdown) dropdown.style.display = 'none';
          return;
        }
        if (!dropdown) {
          dropdown = document.createElement('div');
          dropdown.className = 'city-suggestions fr-bg-white fr-border fr-border-borders';
          dropdown.style.position = 'absolute';
          dropdown.style.zIndex = 1100;
          dropdown.style.left = 0;
          dropdown.style.right = 0;
          dropdown.id = suggestionsId;
          input.parentNode.appendChild(dropdown);
        }
        dropdown.innerHTML = '';
        // console.log(filtered);
        filtered.slice(0, 8).forEach((opt) => {
          const optDiv = document.createElement('div');
          optDiv.className = 'city-suggestion-item';
          optDiv.textContent = opt;
          optDiv.style.padding = '6px 12px';
          optDiv.style.cursor = 'pointer';
          optDiv.onmousedown = (e) => { e.preventDefault(); onInput(opt); input.value = opt; hideSuggestions(); };
          dropdown.appendChild(optDiv);
        });
        // Position dropdown
        dropdown.style.display = 'block';
        const rect = input.getBoundingClientRect();
        dropdown.style.top = `${input.offsetTop + input.offsetHeight}px`;
        dropdown.style.left = `${input.offsetLeft}px`;
        dropdown.style.width = `${input.offsetWidth}px`;
      }
      function hideSuggestions() {
        if (dropdown) dropdown.style.display = 'none';
      }
      input.oninput = (e) => {
        onInput(e.target.value);
        showSuggestions(e.target.value);
      };
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          hideSuggestions();
          onDone();
        }
        if (e.key === 'ArrowDown' && dropdown && dropdown.firstChild) {
          dropdown.firstChild.focus();
        }
      });
      input.addEventListener('blur', () => setTimeout(hideSuggestions, 150));
      return input;
    }
    function closePopover() {
      if (popover && popover.parentNode) popover.parentNode.removeChild(popover);
      document.removeEventListener('mousedown', handleClickOutside, true);
    }
    function onDone() {
      if (from.trim().toLowerCase() === to.trim().toLowerCase() && from && to) {
        error = 'From and To cannot be the same city.';
        updateError();
        return;
      }
      applyDepartureFilter(from, to);
      closePopover();
    }
    function onClear() {
      from = '';
      to = '';
      error = '';
      applyDepartureFilter('', '');
      closePopover();
    }
    function handleClickOutside(e) {
      if (popover && !popover.contains(e.target) && !target.contains(e.target)) {
        closePopover();
      }
    }
    function updateError() {
      const errDiv = popover.querySelector('.departure-error');
      if (errDiv) errDiv.textContent = error;
    }
    popover = div(
      { class: 'popover-body', style: 'position:absolute;z-index:1000;top:0;left:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.15);padding:16px;border-radius:8px;min-width:320px;' },
      div(
        { class: 'route-popover' },
        div(
          { class: 'popover-header' },
          div(
            {
              as: 'button',
              class: 'popover-back-btn',
              onclick: closePopover,
            },
            // SVG for back arrow
            div(
              {
                as: 'svg', width: '1em', height: '1em', fill: 'currentColor', viewBox: '0 0 1024 1024', class: 'fr-icon fr-rotate',
              },
              div({ as: 'path', d: 'M793.869 53.224l-53.404-53.224-510.334 512 510.334 512 53.404-53.224-457.278-458.776z' }),
            ),
          ),
          div({ as: 'h2', class: 'popover-title' }, 'Select route'),
        ),
        div(
          { class: 'popover-body-content' },
          div(
            { class: 'popover-fields-wrapper' },
            div(
              { class: 'popover-fields-row' },
              div(
                { class: 'location-selector-container fr-position-relative from-field' },
                div({
                  class: 'fr-label fr-ml-0 fr-pt-0 fr-text-text fr-text-left fr-w-100 fr-d-inline-block',
                  id: fromLabelId,
                  for: fromInputId,
                }, 'From'),
                div(
                  { class: 'fr-bg-white fr-border fr-border-borders' },
                  div(
                    { class: 'fr-input fr-input-group fr-w-100' },
                    div(
                      { 'aria-hidden': 'true', class: 'fr-input-group-prepend' },
                      div({ 'data-testid': 'buttonLefticons', class: 'fr-my-auto fr-pr-0 fr-d-inline-flex fr-align-self-center' },
                        // SVG marker icon (optional)
                      ),
                    ),
                    div({ id: 'from-input-placeholder' }),
                  ),
                ),
                div({
                  as: 'p', id: fromDescId, class: 'fr-sr-only', 'aria-hidden': 'true',
                }, 'Enter the origin city of the trip.'),
              ),
              div(
                { class: 'location-selector-container fr-position-relative to-field' },
                div({
                  class: 'fr-label fr-ml-0 fr-pt-0 fr-text-text fr-text-left fr-w-100 fr-d-inline-block',
                  id: toLabelId,
                  for: toInputId,
                }, 'To'),
                div(
                  { class: 'fr-bg-white fr-border fr-border-borders' },
                  div(
                    { class: 'fr-input fr-input-group fr-w-100' },
                    div(
                      { 'aria-hidden': 'true', class: 'fr-input-group-prepend' },
                      div({ 'data-testid': 'buttonLefticons', class: 'fr-my-auto fr-pr-0 fr-d-inline-flex fr-align-self-center' },
                        // SVG marker icon (optional)
                      ),
                    ),
                    div({ id: 'to-input-placeholder' }),
                  ),
                ),
                div({
                  as: 'p', id: toDescId, class: 'fr-sr-only', 'aria-hidden': 'true',
                }, 'Enter the destination city of the trip.'),
              ),
            ),
          ),
        ),
        div({ class: 'departure-error', style: 'color:#d32f2f;font-size:13px;margin:8px 0 0 0;min-height:18px;' }, error),
        div(
          { class: 'popover-footer' },
          div({
            as: 'button', disabled: false, class: 'popover-btn', onclick: onClear,
          }, 'Clear'),
          div({
            as: 'button', class: 'popover-btn', onclick: onDone, disabled: (from && to && from.trim().toLowerCase() === to.trim().toLowerCase()),
          }, 'Done'),
        ),
      ),
    );
    // Actually insert the real input after rendering
    setTimeout(() => {
      const fromPlaceholder = popover.querySelector('#from-input-placeholder');
      if (fromPlaceholder) {
        fromPlaceholder.replaceWith(createInput(fromInputId, from, 'Departure City', fromDescId, (v) => { from = v; error = ''; updateError(); }, 'from-suggestions-list'));
      }
      const toPlaceholder = popover.querySelector('#to-input-placeholder');
      if (toPlaceholder) {
        toPlaceholder.replaceWith(createInput(toInputId, to, 'Destination City', toDescId, (v) => { to = v; error = ''; updateError(); }, 'to-suggestions-list'));
      }
    }, 0);
    // Position popover below the target
    setTimeout(() => {
      if (!target || !popover) return;
      const rect = target.getBoundingClientRect();
      popover.style.top = `${rect.bottom + window.scrollY + 4}px`;
      popover.style.left = `${rect.left + window.scrollX}px`;
      popover.style.minWidth = `${rect.width}px`;
    }, 0);
    document.addEventListener('mousedown', handleClickOutside, true);
    return popover;
  }

  // Handler for Departure filter click
  function onDepartureClick(e) {
    // Remove any existing popover
    const old = document.querySelector('.popover-body');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    // Insert new popover as child of body, positioned below Departure filter
    const target = e.currentTarget;
    const pop = departurePopover(target);
    document.body.appendChild(pop);
  }
  // DOM structure: title row, filters row, cards row (carousel)
  // Structure: one parent, two children: filters and cards, for easy re-render
  // Add state for budget filter
  let budgetValue = '';
  let filteredData = data;
  // Helper to re-render cards based on budget
  function applyBudgetFilter(val) {
    budgetValue = val;
    if (val && !isNaN(Number(val)) && val !== '') {
      filteredData = data.filter((card) => Number(card.price) <= Number(val));
    } else {
      filteredData = data;
    }
    // Replace cards row
    const cardsRow = document.querySelector('.fares-carousel-content .fr-row.fr-mt-3');
    if (cardsRow && cardsRow.parentNode) {
      const newCards = div(
        { class: 'fr-row fr-mt-3' },
        div(
          { class: 'fr-col fr-h-100' },
          div(
            { class: 'carousel swiper' },
            div(
              { class: 'swiper-wrapper' },
              ...renderCard(filteredData),
            ),
            div({ class: 'swiper-button-prev' }),
            div({ class: 'swiper-button-next' }),
            div({ class: 'swiper-pagination' }),
          ),
        ),
      );
      cardsRow.parentNode.replaceChild(newCards, cardsRow);
      // Re-init Swiper
      initSwiperOnly(newCards.querySelector('.carousel.swiper'));
    }
  }

  // Popover for budget input
  function budgetPopover(target) {
    const inputId = `input-${Math.floor(Math.random() * 1e10)}`;
    const labelId = `label-budget-${Math.floor(Math.random() * 1e10)}`;
    const descId = `${Math.floor(Math.random() * 1e10)}`;
    let popover;
    let inputValue = budgetValue;
    // Helper to create a real input element and attach events
    function createInput() {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = inputId;
      input.name = 'budget';
      input.setAttribute('data-testid', 'budget');
      input.placeholder = 'Any budget';
      input.setAttribute('aria-invalid', 'false');
      input.setAttribute('aria-describedby', descId);
      input.className = 'fr-form-control fr-text-truncate fr-pl-2 fr-pb-0 fr-text-text fr--413156497 fr-1905770537 fr-1020490854 fr--1744952970 fr--1367269990 fr--507061050 fr--702426256 fr--98359565';
      input.autocomplete = 'off';
      input.inputMode = 'numeric';
      input.value = inputValue;
      input.oninput = (e) => {
        inputValue = e.target.value;
      };
      // Allow Enter to trigger Done
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onDone();
        }
      });
      setTimeout(() => input.focus(), 0);
      return input;
    }
    function closePopover() {
      if (popover && popover.parentNode) popover.parentNode.removeChild(popover);
      document.removeEventListener('mousedown', handleClickOutside, true);
    }
    function onDone() {
      applyBudgetFilter(inputValue);
      closePopover();
    }
    function onClear() {
      inputValue = '';
      applyBudgetFilter('');
      closePopover();
    }
    function handleClickOutside(e) {
      if (popover && !popover.contains(e.target) && !target.contains(e.target)) {
        closePopover();
      }
    }
    // Use a placeholder div for the input, then replace it with a real input element
    popover = div(
      { class: 'popover-body', style: 'position:absolute;z-index:1000;top:0;left:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.15);padding:16px;border-radius:8px;' },
      div(
        { class: 'as-copa-ltr-11nnxtd' },
        div(
          { class: 'as-copa-ltr-p13x9t' },
          div({
            class: 'fr-label fr-ml-0 fr-mb-0 fr-pt-0 fr-text-text fr-text-left fr-w-auto fr-d-inline-block fr-166089588',
            id: labelId,
            for: inputId,
          }, 'Budget'),
          div(
            { class: 'fr-budget fr-border fr-border-borders fr-1559554090 fr--1225033420 fr-1834208085' },
            div(
              { class: 'fr-input fr-input-group fr-w-100' },
              div(
                { class: 'fr-input-group-prepend' },
                div({ class: 'fr-label fr-mr-0 fr-ml-2 fr-619365562 fr-pr-1 fr-pl-1 fr-bg-white fr-text-textSoft fr-d-flex fr-align-items-center fr-2077132146 fr--682946256 fr--1291546012' }, 'INR '),
              ),
              div({ id: 'budget-input-placeholder' }),
            ),
          ),
          div({
            as: 'p', id: descId, class: 'fr-sr-only', 'aria-hidden': 'true',
          }, 'Enter the best USD budget'),
        ),
        div(
          { class: 'as-copa-ltr-p13x9t' },
          div({ as: 'hr', class: 'as-copa-ltr-1v1k9dg' }),
        ),
      ),
      div(
        { class: 'as-copa-ltr-ikhtdx' },
        div({
          as: 'button',
          disabled: false,
          class: 'as-copa-ltr-tyl0cm',
          onclick: onClear,
        }, 'Clear'),
        div({
          as: 'button',
          class: 'as-copa-ltr-tyl0cm',
          onclick: onDone,
        }, 'Done'),
      ),
    );
    // Actually insert the real input after rendering
    setTimeout(() => {
      const placeholder = popover.querySelector('#budget-input-placeholder');
      if (placeholder) {
        placeholder.replaceWith(createInput());
      }
    }, 0);
    // Position popover below the target
    setTimeout(() => {
      if (!target || !popover) return;
      const rect = target.getBoundingClientRect();
      popover.style.top = `${rect.bottom + window.scrollY + 4}px`;
      popover.style.left = `${rect.left + window.scrollX}px`;
      popover.style.minWidth = `${rect.width}px`;
    }, 0);
    // Listen for outside clicks
    document.addEventListener('mousedown', handleClickOutside, true);
    return popover;
  }

  // Handler for Price filter click
  function onPriceClick(e) {
    // Remove any existing popover
    const old = document.querySelector('.popover-body');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    // Insert new popover as child of body, positioned below Price filter
    const target = e.currentTarget;
    const pop = budgetPopover(target);
    document.body.appendChild(pop);
  }

  // Only return a single root element, not an array or a DOM node directly
  // This prevents accidental stringification of DOM nodes (which causes [object HTMLDivElement] to appear)
  return div(
    { class: 'fares-carousel-container' },
    div(
      { class: 'fares-carousel-content' },
      // Filters row
      div(
        { class: 'fr-secondary-filters fr-d-flex' },
        div(
          { class: 'fr-d-inline-block' },
          div(
            { class: 'fr-filters-left' },
            div(
              { class: 'filter-group' },
              div({ class: 'filter-item', onclick: onPriceClick, style: 'cursor:pointer;position:relative;' }, 'Budget'),
              div({ class: 'filter-item', onclick: onDepartureClick, style: 'cursor:pointer;position:relative;' }, 'Departure'),
            ),
            div(
              { class: 'fr-btn-clear-wrapper' },
              div({
                as: 'button',
                class: 'fr-btn fr-btn-clear',
                onclick: clearAllFilters,
                type: 'button',
                'aria-label': 'Clear all filters',
              }, 'Clear'),
            ),
          ),
        ),
        div(
          { class: 'fr-sorting-filter-column fr-ml-auto' },
          div(
            { class: 'fr-sortby-wrapper' },
            div(
              {
                as: 'button',
                class: 'fr-btn fr-btn-sortby',
                type: 'button',
                'aria-label': 'Sort by',
                onclick: onSortByClick,
              },
              div({ as: 'span', class: 'fr-icon fr-icon-sort', style: 'margin-right:6px;' }),
              'Sort by',
            ),
          ),
        ),
      ),
      // Cards row (carousel)
      div(
        { class: 'fr-row fr-mt-3' },
        div(
          { class: 'fr-col fr-h-100' },
          div(
            { class: 'carousel swiper' },
            div(
              { class: 'swiper-wrapper' },
              ...renderCard(filteredData),
            ),
            div({ class: 'swiper-button-prev' }),
            div({ class: 'swiper-button-next' }),
            div({ class: 'swiper-pagination' }),
          ),
        ),
      ),
    ),
  );
}

export function renderCard(data = []) {
  return data.map((eachData, idx) => {
    // Data extraction
    const image = eachData.image?._publishUrl || '';
    const departure = eachData.departureCity || '';
    const departureCode = eachData.departureCode || '';
    const destination = eachData.destinationCity || '';
    const destinationCode = eachData.destinationCode || '';
    const departureDate = eachData.departureDate || '';
    const destinationDate = eachData.destinationDate || '';
    const price = eachData.price ? `${eachData.price}` : '';
    const tripType = Array.isArray(eachData.tripType) ? eachData.tripType.join(', ') : '';
    const travelClass = eachData.travelClass || 'Economy';
    const seen = eachData.seen || '';
    // Description is HTML, so we need to inject it safely
    const descHtml = eachData.description?.html || '';
    // IDs for ARIA
    const cardId = `card-${Date.now()}_${Math.floor(Math.random() * 1e17)}`;
    const btnId = `cta-btn-${Math.floor(Math.random() * 2e9)}`;
    const textId = `cta-text-${Date.now()}_${Math.floor(Math.random() * 1e17)}`;
    const priceId = `price-${Math.random().toString(36).substring(2, 18)}`;
    // Card markup as swiper-slide
    // Helper to build city code only if present
    function cityCodeDiv(code) {
      return code ? div({ class: 'city-code' }, `(${code})`) : '';
    }
    return div(
      {
        class: `swiper-slide carousel-item carousel-item-${idx} carousel-item-visible`,
      },
      div(
        { id: `${idx}`, class: 'item-wrapper', style: 'width: 190.13px; padding: 0px;' },
        div(
          { class: 'item-col' },
          div(
            {
              role: 'button',
              id: cardId,
              'aria-hidden': 'false',
              'data-testid': 'fareItemCard',
              class: 'fare-card',
              tabIndex: 0,
            },
            // ...removed sr-only label...
            // Card count (e.g. 1/12)
            div(
              { class: 'card-count', style: 'position: absolute; width: 100%; z-index: 1;' },
              div({ class: 'card-count-text' }, `${idx + 1}/${data.length}`),
            ),
            // Image header
            div(
              {
                id: `img-${Date.now()}_${Math.floor(Math.random() * 1e17)}`,
                'data-testid': 'imageHeader',
                class: 'image-header',
              },
              div({
                'data-src': image,
                'data-default-image': 'https://assets.airtrfx.com/cdn-cgi/image/height=500,width=800,quality=80,fit=crop,format=auto,opt=true/https://res.cloudinary.com/dakp804eh/image/upload/v1561045947/airmodules/Utils/NoImageFound.png',
                class: 'image',
                style: `height: 170px; width: 100%; background-color: unset; animation: unset; background-image: url('${image}'); background-position: center center; background-size: cover; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;`,
              }),
            ),
            // Card body
            div(
              { class: 'card-body' },
              div(
                {
                  role: 'heading',
                  'aria-label': `${departure}${departureCode ? ` (${departureCode})` : ''} to ${destination}${destinationCode ? ` (${destinationCode})` : ''}`,
                  'aria-level': 3,
                  class: 'route-info',
                },
                div(
                  { class: 'origin-city' },
                  div({ class: 'city-name' }, departure),
                  cityCodeDiv(departureCode),
                ),
                div({ class: 'to-label' }, 'to'),
                div(
                  { class: 'destination-city' },
                  div({ class: 'city-name' }, destination),
                  cityCodeDiv(destinationCode),
                ),
              ),
              div(
                { class: 'dates-row' },
                div(
                  { class: 'departure-info' },
                  div(
                    { class: 'departure-text' },
                    div(
                      { as: 'time', dateTime: departureDate },
                      div({ class: 'date-short', 'aria-hidden': 'true' }, formatDateShort(departureDate)),
                      div({ class: 'date-long' }, formatDateLong(departureDate)),
                    ),
                  ),
                ),
                div({ class: 'date-separator' }, '-'),
                div(
                  { class: 'return-info' },
                  div(
                    { class: 'return-text' },
                    div(
                      { as: 'time', dateTime: destinationDate },
                      div({ class: 'date-short', 'aria-hidden': 'true' }, formatDateShort(destinationDate)),
                      div({ class: 'date-long' }, formatDateLong(destinationDate)),
                    ),
                  ),
                ),
              ),
            ),
            // Card footer
            div(
              { class: 'card-footer' },
              div(
                { id: priceId, class: 'price-row', style: 'line-height: 1;' },
                div({ class: 'price-label' }, 'From'),
                div(
                  { class: 'price-currency-row' },
                  div({ class: 'currency' }, 'INR '),
                  div({ class: 'price' }, price),
                  div({ class: 'asterisk', 'aria-hidden': 'true' }, '*'),
                  div({ class: 'price-note' }, 'Price subject to changes'),
                ),
              ),
              div(
                { class: 'seen-row' },
                div({ class: 'seen-label' }, 'Seen:'),
                div({ class: 'seen-value' }, seen || 'Recently'),
              ),
              div(
                { class: 'trip-row' },
                div(
                  { class: 'journey-type' },
                  div({ class: 'journey-type-label' }, tripType || 'Round-trip'),
                ),
                div({ class: 'trip-separator' }, ','),
                div(
                  { class: 'travel-class' },
                  div({ class: 'travel-class-label' }, travelClass),
                ),
              ),
              div(
                { class: 'cta-row' },
                div(
                  {
                    as: 'button',
                    class: 'cta-btn',
                    'aria-labelledby': `${cardId} ${textId}`,
                    type: 'button',
                    id: btnId,
                    'data-testid': 'fareItemCallToAction',
                  },
                  div({ class: 'cta-btn-text', id: textId }, 'Book now'),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  });
}

// Helper: format date as MM/DD/YYYY
function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}
// Helper: format date as "Month DD, YYYY"
function formatDateLong(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
