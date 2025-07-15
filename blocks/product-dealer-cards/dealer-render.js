const dealerAPI = 'https://www.heromotocorp.com/content/hero-commerce/in/en/dealer-locator/jcr:content.dealers.{stateCode}.{cityCode}.json';

export async function fetchDealers(stateCode, cityCode) {
  const url = dealerAPI
    .replace('{stateCode}', stateCode)
    .replace('{cityCode}', cityCode);
  const data = await fetchAPI("GET", url);
  return data;
}
