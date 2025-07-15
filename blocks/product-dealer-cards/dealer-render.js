import { fetchAPI } from "../../scripts/common.js";

const dealerAPI = 'https://www.heromotocorp.com/content/hero-commerce/in/en/dealer-locator/jcr:content.dealers.{sku}.{stateCode}.{cityCode}.json';

export async function fetchDealers(sku, stateCode, cityCode) {
  const url = dealerAPI
    .replace('{sku}', sku)
    .replace('{stateCode}', stateCode)
    .replace('{cityCode}', cityCode);

  const data = await fetchAPI("GET", url);
  return data;
}

