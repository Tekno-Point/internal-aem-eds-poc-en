//when user click on continue after filling the form
window.adobeDataLayer = window.adobeDataLayer || []

function travelinsurancecontinueClick(
  tripType,
  leadId,
  selectedGeography,
  selectedCountry,
  travelDate,
  returnDate,
  ageGroup,
  tripDuration,
  productId,
  crmId,
  email,
  mobile,
  topup_amount,
  selected_tenure,
  Consent
) {
  adobeDataLayer.push({
    event: "travelinsurancecontinueClick",
    user: {
      identity: {
        crmId: crmId,
        email: email,
        mobile: mobile,
      },
      consent: {
        marketing: Consent
      }
    },
    lead: {
      leadId: leadId
    },
    travel: {
      tripType: tripType,
      geography: selectedGeography,
      destinationCountry: selectedCountry,
      departureDate: travelDate,
      returnDate: returnDate,
      ageGroup: ageGroup,
      tripDuration: tripDuration
    },
    topUp: {
      amount: topup_amount,
      tenure: selected_tenure
    },
    product: {
      productId: productId
    }
  });
}

export { travelinsurancecontinueClick };

