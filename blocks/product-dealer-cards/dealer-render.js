import { getDataMapping } from "../../scripts/common.js";

import { fetchAPI } from "../../scripts/common.js";

const dealerAPI = 'https://www.heromotocorp.com/content/hero-commerce/in/en/dealer-locator/jcr:content.dealers.{sku}.{stateCode}.{cityCode}.json';
// https://www.heromotocorp.com/content/hero-commerce/in/en/products/product-page/practical/jcr:content.dealers.HSPUNIRSCFIMAG.MAH.MUMBAI.json

export default async function fetchDealers(sku,stateCode, cityCode) {

    let dataMapping = JSON.parse(sessionStorage.getItem("dataMapping"))

  const url = dealerAPI
    .replace('{sku}', dataMapping.sku)
    .replace('{stateCode}', stateCode)
    .replace('{cityCode}', cityCode);
  const data = await fetchAPI("GET", url);
  return data;
}
