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

function travelinsurancebasicdetailSubmit(
  leadId,
  dob,
  productId,
  crmId,
  email,
  mobile,
  Consent,
) {
  adobeDataLayer.push({
    event: "travelinsurancebasicdetailSubmit",
    user: {
      identity: {
        crmId: crmId,
        email: email,
        mobile: mobile,
        dob: dob,
      },
      consent: {
        marketing: Consent
      }
    },
    lead: {
      leadId: leadId
    },
    product: {
      productId: productId
    }
  });
}

function travelinsuranceoccupationdetailSubmit(
  leadId,
  employmentType,
  occupation,
  employerName,
  monthlyIncome,
  Consent,
  productId,
  crmId,
) {
  adobeDataLayer.push({
    event: "travelinsuranceoccupationdetailSubmit",
    user: {
      identity: {
        crmId: crmId,
      },
      consent: {
        marketing: Consent
      }
    },
    lead: {
      leadId: leadId
    },
    occupation: {
      employmentType: employmentType,
      occupation: occupation,
      employerName: employerName,
      monthlyIncome: monthlyIncome,
    },
    product: {
      productId: productId
    }
  });
}

function travelinsuranceloandetailSubmit(
  leadId,
  loanType,
  loanFrequency,
  loanAmount,
  Consent,
  productId,
  crmId,
) {
  adobeDataLayer.push({
    event: "travelinsuranceloandetailSubmit",
    user: {
      identity: {
        crmId: crmId,
      },
      consent: {
        marketing: Consent
      }
    },
    lead: {
      leadId: leadId
    },
    loan: {
      loanType: loanType,
      loanFrequency: loanFrequency,
      loanAmount: loanAmount,
    },
    product: {
      productId: productId
    }
  });
}

export { travelinsurancecontinueClick, travelinsurancebasicdetailSubmit, travelinsuranceoccupationdetailSubmit, travelinsuranceloandetailSubmit };
