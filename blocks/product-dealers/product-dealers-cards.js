import { fetchDealers, getDataMapping, fetchStateCityMaster } from '../../scripts/common.js';

  // --- Dropdown Elements ---
  const stateCityData = await fetchStateCityMaster();
  const states = stateCityData.data.stateCity.map(item => ({
    code: item.code,
    label: item.label,
    cities: item.cities,
  }));

  // Create state dropdown
  const stateSelect = document.createElement('select');
  stateSelect.className = 'react-select__input';
  states.forEach(state => {
    const opt = document.createElement('option');
    opt.value = state.label;
    opt.textContent = state.label;
    stateSelect.appendChild(opt);
  });

  // Create city dropdown
  const citySelect = document.createElement('select');
  citySelect.className = 'react-select__input';

  // Container for dropdowns
  const dropdownsContainer = document.createElement('div');
  dropdownsContainer.className = 'dealers__dropdowns d-flex mb-8';
  dropdownsContainer.appendChild(stateSelect);
  dropdownsContainer.appendChild(citySelect);

  // Insert dropdowns at top
  block.textContent = '';
  block.appendChild(dropdownsContainer);

  // Helper to update city dropdown
  function updateCityDropdown(stateLabel) {
    const state = states.find(s => s.label === stateLabel);
    citySelect.innerHTML = '';
    if (state?.cities) {
      state.cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.code;
        opt.textContent = city.label;
        citySelect.appendChild(opt);
      });
    }
  }

  // Initial selection: Maharashtra/Mumbai
  stateSelect.value = 'MAHARASHTRA';
  updateCityDropdown('MAHARASHTRA');
  citySelect.value = states.find(s => s.label === 'MAHARASHTRA')?.cities?.find(c => c.label === 'MUMBAI')?.code || citySelect.options[0]?.value;

  // Function to render dealer cards
  async function renderDealers(stateLabel, cityCode) {
    const mapping = await getDataMapping();
    const codeData = mapping.state_city_master[stateLabel][cityCode];
    const dealerData = await fetchDealers(codeData.stateCode, codeData.code);

    // Build swiper structure
    const swiper = document.createElement('div');
    swiper.className = 'swiper swiper-initialized swiper-horizontal swiper-backface-hidden';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';
    swiperWrapper.setAttribute('aria-live', 'polite');
    swiperWrapper.id = 'swiper-wrapper-' + Math.random().toString(16).slice(2);

    const dealers = dealerData.dealers || dealerData.data || dealerData.items || dealerData;
    if (Array.isArray(dealers)) {
      dealers.forEach((dealer, idx) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-label', `${idx + 1} / ${dealers.length}`);
        slide.style.width = '305px';
        slide.style.marginRight = '22px';

        // Card structure
        const card = document.createElement('div');
        card.className = 'dealers__slider-item border px-8 py-8';

        // Dealer name
        const nameDiv = document.createElement('div');
        nameDiv.className = 'dealers__dealer-name d-flex mb-8 align-items-start';
        nameDiv.innerHTML = `<span class="heroicon-logo hero-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span><h4 class="weight-heavy">${dealer.name || dealer.dealerName || ''}</h4>`;
        card.appendChild(nameDiv);

        // Dealer phone
        if (dealer.phone || dealer.mobile || dealer.contact) {
          const phoneDiv = document.createElement('div');
          phoneDiv.className = 'dealers__dealer-phone d-flex mb-8 align-items-start';
          phoneDiv.innerHTML = `<span class="hero-icon heroicon-call"></span><a href="tel:+91${(dealer.phone || dealer.mobile || dealer.contact).replace(/[^\d]/g, '')}">${dealer.phone || dealer.mobile || dealer.contact}</a>`;
          card.appendChild(phoneDiv);
        }

        // Dealer email
        if (dealer.email) {
          const emailDiv = document.createElement('div');
          emailDiv.className = 'dealers__dealer-email d-flex mb-8 align-items-start';
          emailDiv.innerHTML = `<span class="hero-icon heroicon-email"></span><a href="mailto:${dealer.email}">${dealer.email}</a>`;
          card.appendChild(emailDiv);
        }

        // Dealer address
        if (dealer.address) {
          const addressDiv = document.createElement('div');
          addressDiv.className = 'dealers__dealer-address d-flex align-items-start';
          addressDiv.innerHTML = `<span class="hero-icon heroicon-address"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span><p class="weight-medium body2">${dealer.address}</p>`;
          card.appendChild(addressDiv);
        }

        slide.appendChild(card);
        swiperWrapper.appendChild(slide);
      });
    }

    // Remove previous swiper if any
    const oldSwiper = block.querySelector('.swiper');
    if (oldSwiper) oldSwiper.remove();
    block.appendChild(swiper);
    swiper.appendChild(swiperWrapper);
  }

  // Initial render
  renderDealers(stateSelect.value, citySelect.value);

  // Listeners
  stateSelect.addEventListener('change', () => {
    updateCityDropdown(stateSelect.value);
    citySelect.value = citySelect.options[0]?.value;
    renderDealers(stateSelect.value, citySelect.value);
  });
  citySelect.addEventListener('change', () => {
    renderDealers(stateSelect.value, citySelect.value);
  });
