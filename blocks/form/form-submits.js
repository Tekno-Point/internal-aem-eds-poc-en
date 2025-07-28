import { travelinsurancecontinueClick } from "./analytics-script.js";


function onTravelDetailsSubmit(form) {
  const tripFormData = new FormData(document.getElementById("single-trip"))
  const travelFormData = new FormData(form);
  const tripCountry = document.querySelector("#single-trip .search-country-input")?.value;

  travelinsurancecontinueClick(
    'single-trip',
    'lead-id',
    tripFormData.get("geography-location"),
    tripCountry,
    tripFormData.get("start date"),
    tripFormData.get("return date"),
    form.dataset.travellersAgeGroup,
    getDuration(tripFormData.get("start date"), tripFormData.get("return date")),
    travelFormData.get("productId") || "travelinsurance",
    "crmId",
    travelFormData.get("email"),
    travelFormData.get("mobile-number"),
    "topup_amount",
    "selected_tenure",
    "Consent"
  )
}


const onMultiTripSubmit = (form) => {
  const multiTripFormData = new FormData(form);

  travelinsurancecontinueClick(
    'multi-trip',
    'lead-id',
    "NA",
    "NA",
    multiTripFormData.get("tripstartdate"),
    "Na",
    multiTripFormData.get("ageradio"),
    multiTripFormData.get("dayradio"),
    "travelinsurance",
    "crmId",
    "Na",
    "Na",
    "topup_amount",
    "selected_tenure",
    "Consent"
  )
}


function getDuration(startDate, returnDate) {
  const start = new Date(startDate);
  const end = new Date(returnDate);
  const diff = end - start;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export { onTravelDetailsSubmit, onMultiTripSubmit };

