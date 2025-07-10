// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';
import { clickDropdown, dateDisable, inputFilter, showData } from '../form/booking-form.js';
import Swiper from '../carousel/swiper-bundle.min.js';
import { dData } from './dummy-data.js';

const dummyData = dData;

async function getAccessToken() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    header: {
      authToken: '',
    },
    body: {
      clientId: 'ZJRz6bDFxfRPaABeZOShvesqoatIx0AS',
      clientSecret: 'UNXbe2JgHEJ5BFsp',
      grantType: 'client_credentials',
    },
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  let value = '';
  try {
    const response = await fetch('https://shaft.eastus2.cloudapp.azure.com/shaft/api/eds-channel/grant-access/v1', requestOptions);
    if (response.ok) {
      const json = await response.json();
      value = json.body.access_token;
      console.log("json data ", json)
    }
  } catch (error) {
    console.warn(error);
  } finally {
    return value;
  }
}

async function getData(auth, data = {
  originLocationCode: "BOM",
  destinationLocationCode: "CMB",
  departureDate: '2025-07-16',
  returnDate: '2025-07-30',
  adults: '1',
  includedAirlineCodes: 'TG',
  max: '10',
}) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', `Bearer ${auth}`);

  const raw = JSON.stringify({
    header: {},
    body: { ...data },
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  let value = dummyData;
  try {
    const response = await fetch('https://shaft.eastus2.cloudapp.azure.com/shaft/api/eds-channel/flight-offers-search/v1', requestOptions);
    if (response.ok) {
      value = await response.json();
    }
  } catch (error) {
    console.warn(error); // 
  } finally {
    return value;
  }
}
function convertEurToInr(eurAmount, rate = 90) {
  const inr = eurAmount * rate;
  return `₹${Math.round(inr).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export default async function decorate(block) {
  // build tablist
  // console.log(block)
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });


  block.prepend(tablist);
  showData(block, '.from-input', 'from-wrapper', 'source');
  showData(block, '.to-input', 'to-wrapper', 'destination');
  clickDropdown(block);
  dateDisable(block);

  window.addEventListener("datafetched", () => {
    inputFilter(block, '.from-input','source', '.to-input');
    inputFilter(block, '.to-input','destination', '.from-input');
  })

  const form = block.querySelector('form');
  const submit = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    submit.classList.add('disabled');

    const auth = await getAccessToken();
    const data = await getData(auth, {
      originLocationCode: this.source.dataset.iataCode,
      destinationLocationCode: this.destination.dataset.iataCode,
      departureDate: this.departure.value,
      returnDate: this.return.value,
      adults: '1',
      includedAirlineCodes: 'TG',
      max: '10',
    });

    // Remove previous cards (for clean UI)
    block.querySelectorAll('.flight-card').forEach(card => card.remove());

    const countries = new Intl.DisplayNames(['en'], { type: 'region' });
    const locations = data.body.dictionaries.locations;
    console.log("data body", data.body);
    

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add("card-wrapper");
    data.body.data.forEach((flight, index) => {
      const segment = flight.itineraries[0].segments[0];

      const cityNames = {
        BOM: 'Mumbai',
        DEL: 'Delhi',
        CMB: 'Colombo',
        BKK: 'Bangkok',
        MAA: 'Chennai',
        BLR: 'Bangalore',
        DXB: 'Dubai',
        SIN: 'Singapore'
      };

      const from = segment.departure.iataCode;
      const fromTerminal = segment.departure.terminal ? segment.departure.terminal : '1';
      const to = segment.arrival.iataCode;
      const toTerminal = segment.arrival.terminal ? segment.arrival.terminal : '1';

      const fromCity = cityNames[from] || from;
      const fromCountryCode = locations[from]?.countryCode || 'IN';
      const fromCountry = countries.of(fromCountryCode);

      const toCity = cityNames[to] || to;
      const toCountryCode = locations[to]?.countryCode || 'IN';
      const toCountry = countries.of(toCountryCode);

      const departure = new Date(segment.departure.at);
      const departureTime = departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const departureDate = departure.toLocaleDateString('en-GB');

      const duration = flight.itineraries[0].duration.replace('PT', '').toLowerCase();
      const fare = flight.travelerPricings[0].fareDetailsBySegment[1].cabin;
      const price = convertEurToInr(flight.price.grandTotal);

      const card = document.createElement('div');
      card.classList.add("flight-card", "swiper-slide");

      const flightInfo = document.createElement('div');
      flightInfo.className = 'flight-info';

      const fromDiv = document.createElement('div');
      fromDiv.className = 'from-info';
      fromDiv.innerHTML = `
        <strong>${from}</strong> ${fromCity}, ${fromCountry}<br>
        Terminal ${fromTerminal}<br>
        ${departureDate}
      `;

      const arrowDiv = document.createElement('div');
      arrowDiv.className = 'arrow';
      const arrowImg = document.createElement('img');
      arrowImg.src = '/image/arrow.png'; // or your desired image path
      arrowImg.alt = 'to';
      arrowImg.className = 'arrow-img'; // optional, for styling
      arrowDiv.appendChild(arrowImg);

      const toDiv = document.createElement('div');
      toDiv.className = 'to-info';
      toDiv.innerHTML = `
        <strong>${to}</strong> ${toCity}, ${toCountry}<br>
        Terminal ${toTerminal}<br>
        ${departureDate}
      `;

      flightInfo.append(fromDiv, arrowDiv, toDiv);

      // Airline Details
      const airlineDetails = document.createElement('div');
      airlineDetails.className = 'airline-details';

      const heading = document.createElement('h4');
      heading.textContent = 'SriLankan Airlines';

      const detailDiv = document.createElement('div');
      detailDiv.className = 'detail';
      detailDiv.textContent = `${fare} Class`;

      const durationDiv = document.createElement('div');
      durationDiv.className = 'duration';
      durationDiv.textContent = `Duration: ${duration}`;
      const departureDiv = document.createElement('div');
      departureDiv.className = 'departure';
      departureDiv.textContent = `Departure: ${departureTime}`;

      const button = document.createElement('button');
      button.className = 'book-now-button';
      button.textContent = 'Book Now';

      airlineDetails.append(heading, detailDiv, durationDiv, departureDiv, button);
      card.append(flightInfo, airlineDetails);
      cardWrapper.appendChild(card);
    });
    if (block.classList.contains("form-absolute")) {
      const tabsContainer = document.querySelector('.section.tabs-container');
        tabsContainer.querySelector('.card-wrapper')?.remove();
        tabsContainer.appendChild(cardWrapper);
        swiperInit();     
    }
    else {
      block.appendChild(cardWrapper);
    }
    submit.classList.remove('disabled');
  });
}

function swiperInit() {
  const cardWrapper = document.querySelector('.card-wrapper');
  const SwiperWrapper = document.createElement('div');
  SwiperWrapper.classList.add('swiper-wrapper');
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');

  const slides = cardWrapper.querySelectorAll('.swiper-slide');
  slides.forEach(slide => {
    SwiperWrapper.append(slide)
  })
  cardWrapper.append(SwiperWrapper);
  cardWrapper.append(swiperPagination);

  const swiper = new Swiper('.card-wrapper', {

    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 15 },
      600: { slidesPerView: 2, spaceBetween: 15 },
      900: { slidesPerView: 1, spaceBetween: 16 },
      1200: { slidesPerView: 1, spaceBetween: 16 }
    },
    loop: false,
    pagination: {
      el: '.swiper-pagination',
    },
  })
}
