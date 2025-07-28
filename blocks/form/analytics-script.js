//when user click on continue after filling the form
window.adobeDataLayer = window.adobeDataLayer || []

function travelinsurancecontinueClick(tripType, leadId, selectedGeography, selectedCountry, travelDate, returnDate, ageGroup, tripDuration, productId) {
  window.adobeDataLayer.push({
    "event": "travelinsurancecontinueClick",
    "data": {
      "tripType": tripType,
      "leadId": leadId,
      "selectedGeography": selectedGeography,
      "selectedCountry": selectedCountry,
      "travelDate": travelDate,
      "returnDate": returnDate,
      "ageGroup": ageGroup,
      "tripDuration": tripDuration
    },
    "product": {
      "productId": productId
    }
  })
}

export { travelinsurancecontinueClick };

