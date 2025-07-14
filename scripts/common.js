const geoLocationAPI = `https://apis.mappls.com/advancedmaps/v1/5b8424bdaf84cda4fccf61d669d85f5a/rev_geocode?lat={lat}&lng={long}`;
const stateCityAPI = `https://www.heromotocorp.com/content/hero-commerce/in/en/products/product-page/practical/jcr:content.state-and-city.json`;
const prodcutAPI = `https://www.heromotocorp.com/content/hero-commerce/in/en/products/product-page/practical/jcr:content.product.practical.splendor-plus.{stateCode}.{cityCode}.json`;
const dealerAPI = 'https://www.heromotocorp.com/content/hero-commerce/in/en/dealer-locator/jcr:content.dealers.{stateCode}.{cityCode}.json';
const dataMapping = {
    state_city_master: {}
};

export async function fetchAPI(method, url, payload = { headerJSON: {}, requestJSON: {} }) {
    return new Promise(async function (resolve, reject) {
        const { headerJSON, requestJSON } = payload;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        Object.keys(headerJSON).forEach(function (key) {
            headers.append(key, headerJSON[key]);
        })

        const body = JSON.stringify(requestJSON);

        const request = {
            method, headers, body,
        };

        const resp = await fetch(url);
        if (resp.ok) {
            const data = await resp.json();
            resolve(data);
        } else {
            resolve({ error: resp.text() })
        }
    })
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
                    // resolve({ state_city_master.default.state, state_city_master.default.city });
                }
            );
        } else {
            // resolve({ "Delhi", "Delhi"});
        }
    })
}
export async function fetchStateCityMaster() {
    const data = await fetchAPI('GET', stateCityAPI);
    return data;
}
export async function fetchStateCity() {
    const geolocation = await getUserLatLong();
    const data = await fetchAPI('GET', geoLocationAPI.replace('{lat}', geolocation.lat).replace('{long}', geolocation.long))
    const { state, city } = (data.results[0]);
    return { state, city }
}
export async function fetchProdcut(stateLabel, cityCode) {
  const dataMapping = await getDataMapping();
  const stateData = dataMapping.state_city_master[stateLabel];
  if (!stateData || !stateData[cityCode]) return {};

  const { stateCode } = stateData[cityCode];
  const url = prodcutAPI
    .replace('{stateCode}', stateCode)
    .replace('{cityCode}', cityCode);
    
  const data = await fetchAPI('GET', url);
  return data;
}

function processDataMapping(data) {
    dataMapping.state_city_master = {};
    dataMapping.state_city_master.state = [];
    data.data.stateCity.filter(item => {
        if (!dataMapping.state_city_master[item.label]) {
            dataMapping.state_city_master.state.push(item.label);
            dataMapping.state_city_master[item.label] = {};
        }
        item.cities.forEach(city => {
            dataMapping.state_city_master[item.label][city.code] = {
                ...city,
                stateCode: item.code
            };
        });
    });
    sessionStorage.setItem('dataMapping', JSON.stringify(dataMapping));
}

export async function getDataMapping() {
    let data = sessionStorage.getItem('dataMapping');
    if (!data) {
        const data = await fetchStateCityMaster();
        processDataMapping(data);
        sessionStorage.setItem('dataMapping', JSON.stringify(dataMapping));
        data = sessionStorage.getItem('dataMapping');
    }
    data = JSON.parse(data);
    return data
}
// const dm = await getDataMapping();
// console.log(dm);
// await fetchStateCity();
    // const { state, city } = await fetchStateCity();
// await fetchProdcut()

export async function fetchDealers(stateCode, cityCode) {
  const url = dealerAPI
    .replace('{stateCode}', stateCode)
    .replace('{cityCode}', cityCode);
  const data = await fetchAPI("GET", url);
  return data;
}
