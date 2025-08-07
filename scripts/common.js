const endpoint = "https://www.heromotocorp.com";

const geoLocationAPI = `https://apis.mappls.com/advancedmaps/v1/5b8424bdaf84cda4fccf61d669d85f5a/rev_geocode?lat={lat}&lng={long}`;
const stateCityAPI = `${endpoint}/content/hero-commerce/in/en/products/product-page/practical/jcr:content.state-and-city.json`;
const prodcutAPI = `${endpoint}/content/hero-commerce/in/en/products/product-page/practical/jcr:content.product.practical.splendor-plus.{stateCode}.{cityCode}.json`;
const sendOTPAPI = `${endpoint}/content/hero-commerce/in/en/products/product-page/executive/jcr:content.send-msg.json`;
const dealerAPI = 'https://www.heromotocorp.com/content/hero-commerce/in/en/products/product-page/practical/jcr:content.dealers.{sku}.{stateCode}.{cityCode}.json';
function PubSub() {
  this.events = {};
}

PubSub.prototype.subscribe = function (eventName, callback) {
  if (!this.events[eventName]) {
    this.events[eventName] = [];
  }
  this.events[eventName].push(callback);
};

PubSub.prototype.publish = function (eventName, data) {
  if (!this.events[eventName]) return;

  this.events[eventName].forEach(function (callback) {
    callback(data);
  });
};

// Create a global pubsub instance
export var pubsub = new PubSub();


export let dataMapping = {
  state_city_master: {},
};
import { getMetadata } from "./aem.js";
const apiProxy = {};
export async function fetchAPI(
  method,
  url,
  payload = { headerJSON: {}, requestJSON: {} }
) {
  return new Promise(async function (resolve, reject) {
    const key = url + method;
    if (apiProxy[key]) {
      resolve(apiProxy[key]);
      return apiProxy[key]
    }
    const { headerJSON, requestJSON } = payload;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (headerJSON) {
      Object.keys(headerJSON).forEach(function (key) {
        headers.append(key, headerJSON[key]);
      });
    }

    const body = JSON.stringify(requestJSON);

    const request = {
      method,
      headers,
      body,
    };

    let resp;
    if (method === "GET") {
      resp = await fetch(url);
    } else if (method === "POST") {
      resp = await fetch(url, request);
    }
    if (resp.ok) {
      const data = await resp.json();
      resolve(data);
      apiProxy[key] = data;
    } else {
      resolve({ error: resp.text() });
    }
  });
}

export async function getUserLatLong() {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          resolve({ lat, long });
        },
        (error) => {
          // set delhi lat log
        }
      );
    } else {
      // set delhi lat log
    }
  });
}

export async function fetchStateCityMaster() {
  const data = await fetchAPI("GET", stateCityAPI);
  return data;
}

export async function fetchStateCity() {
  const geolocation = await getUserLatLong();
  const data = await fetchAPI(
    "GET",
    geoLocationAPI
      .replace("{lat}", geolocation.lat)
      .replace("{long}", geolocation.long)
  );
  const { state, city } = data.results[0];
  return { state, city };
}

export async function fetchStateCityCode() {
  const { state, city } = await fetchStateCity();
  const dataMapping = await getDataMapping();
  const codeData =
    dataMapping.state_city_master[state.toUpperCase()][city.toUpperCase()];
  console.log(codeData);
  return { stateCode: codeData.stateCode, cityCode: codeData.code }
}

export async function fetchProduct() {
  const { stateCode, cityCode } = await fetchStateCityCode();
  const data = await fetchAPI(
    "GET",
    prodcutAPI
      .replace("{stateCode}", stateCode)
      .replace("{cityCode}", cityCode)
  );
  console.log(data);
  return data;
}

export async function fetchDealers(sku, stateCode, cityCode) {
  const url = dealerAPI
    .replace('{sku}', sku)
    .replace('{stateCode}', stateCode)
    .replace('{cityCode}', cityCode);

  const data = await fetchAPI("GET", url);
  return data;
}


function processDataMapping(data) {
  dataMapping.state_city_master = {};
  dataMapping.state_city_master.state = [];
  data.data.stateCity.filter((item) => {
    if (!dataMapping.state_city_master[item.label]) {
      dataMapping.state_city_master.state.push(item.label);
      dataMapping.state_city_master[item.label] = {};
    }
    item.cities.forEach((city) => {
      dataMapping.state_city_master[item.label][city.code] = {
        ...city,
        stateCode: item.code,
      };
    });
  });
  sessionStorage.setItem("dataMapping", JSON.stringify(dataMapping));
}

export async function useDataMapping() {
  const data = await getDataMapping();
  function setDataMapping(newData) {
    sessionStorage.setItem("dataMapping", JSON.stringify(newData));
  }
  return [data, setDataMapping]

}

async function setSkuAndStateCity() {
  let getProducts = await fetchProduct();
  let selectedCityState = await fetchStateCity()
  dataMapping.sku = getProducts.data.products.items[0].variant_to_colors[0].colors[0].sku;
  dataMapping.products = {}
  dataMapping.products.variant = {};

  dataMapping.products.variant = getProducts.data.products.items[0].variant_to_colors;
  dataMapping.currentlocation = {};
  dataMapping.currentlocation.state = selectedCityState.state.toUpperCase();
  dataMapping.currentlocation.city = selectedCityState.city.toUpperCase();
  dataMapping.currentlocation.stateCode = dataMapping.state_city_master[dataMapping.currentlocation.state][dataMapping.currentlocation.city].stateCode;

  updateDataMapping(dataMapping);
}

// processDataMapping()

async function getDataMapping() {
  // debugger
  let data = sessionStorage.getItem("dataMapping");
  if (!data) {
    let cityMaster = await fetchStateCityMaster();
    processDataMapping(cityMaster);
    let { city, state } = await fetchStateCity();
    const code =
      dataMapping.state_city_master[state.toUpperCase()][city.toUpperCase()];
    console.log(code);
    dataMapping.current_location = {
      stateCode: code.stateCode, cityCode: code.code, city, state
    }
    sessionStorage.setItem("dataMapping", JSON.stringify(dataMapping));
    data = sessionStorage.getItem("dataMapping");
    // setSkuAndStateCity();
  }
  data = JSON.parse(data);
  return data;
}



function getRandomId() {
  return sessionStorage.getItem("booktestridekey");
}

function generateRandomId() {
  const array = new Uint8Array(20); // 20 bytes = 160 bits = 40 hex chars
  crypto.getRandomValues(array);
  const id = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
  sessionStorage.setItem("booktestridekey", id);
  return getRandomId();
}

export async function fetchOTP(phoneNum) {
  const reqID = generateRandomId();
  const vehicleName = getMetadata("vehicle-name");
  const pageType = getMetadata("page-type");
  const data = await fetchAPI("POST", sendOTPAPI, {
    requestJSON: {
      phoneNum,
      pageType,
      vehicleName,
      reqID,
    },
  });
  console.log(data);
}

//OTP value should be dynamic and should be passed.
//fetchOTP("8169850484");
export function verifyOtp(phoneNum, otp) {
  return (
    otp ===
    (Math.abs(hashCode(phoneNum + getRandomId())) % 1000000)
      .toString()
      .padStart(6, "0")
  );
}

//Verify OTP at frontend
function hashCode(s) {
  var h = 0,
    l = s.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
}


