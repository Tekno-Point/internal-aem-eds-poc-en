// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';
import { clickDropdown, showData } from '../form/booking-form.js';



/* eslint-disable */
const dummyData = {
  "header": {
    "status": "SUCCESS",
    "requestId": "REQ-1751544521783"
  },
  "body": {
    "meta": {
      "count": 1,
      "links": {
        "self": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=BOM&destinationLocationCode=CMB&departureDate=2025-07-16&returnDate=2025-07-30&adults=1&includedAirlineCodes=TG&max=5"
      }
    },
    "data": [
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "isUpsellOffer": false,
        "lastTicketingDate": "2025-07-16",
        "lastTicketingDateTime": "2025-07-16",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "duration": "PT24H20M",
            "segments": [
              {
                "departure": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-07-16T23:35:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T05:35:00"
                },
                "carrierCode": "TG",
                "number": "318",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "1",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T21:40:00"
                },
                "arrival": {
                  "iataCode": "CMB",
                  "at": "2025-07-17T23:55:00"
                },
                "carrierCode": "TG",
                "number": "307",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "2",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          },
          {
            "duration": "PT21H",
            "segments": [
              {
                "departure": {
                  "iataCode": "CMB",
                  "at": "2025-07-30T00:55:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T06:10:00"
                },
                "carrierCode": "TG",
                "number": "308",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "3",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T18:55:00"
                },
                "arrival": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-07-30T21:55:00"
                },
                "carrierCode": "TG",
                "number": "317",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "4",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "EUR",
          "total": "980.89",
          "base": "546.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "980.89"
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": [
          "TG"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "EUR",
              "total": "980.89",
              "base": "546.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "PREMIUM_ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "2",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "3",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "4",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "flight-offer",
        "id": "2",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "isUpsellOffer": false,
        "lastTicketingDate": "2025-08-02",
        "lastTicketingDateTime": "2025-08-16",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "duration": "PT24H20M",
            "segments": [
              {
                "departure": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-07-16T23:35:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T05:35:00"
                },
                "carrierCode": "TG",
                "number": "318",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "1",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T21:40:00"
                },
                "arrival": {
                  "iataCode": "CMB",
                  "at": "2025-07-17T23:55:00"
                },
                "carrierCode": "TG",
                "number": "307",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "2",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          },
          {
            "duration": "PT21H",
            "segments": [
              {
                "departure": {
                  "iataCode": "CMB",
                  "at": "2025-07-30T00:55:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T06:10:00"
                },
                "carrierCode": "TG",
                "number": "308",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "3",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T18:55:00"
                },
                "arrival": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-07-30T21:55:00"
                },
                "carrierCode": "TG",
                "number": "317",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "4",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "EUR",
          "total": "980.89",
          "base": "546.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "520.89"
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": [
          "TG"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "EUR",
              "total": "980.89",
              "base": "546.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "PREMIUM_ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "2",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "3",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "4",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "isUpsellOffer": false,
        "lastTicketingDate": "2025-07-16",
        "lastTicketingDateTime": "2025-07-16",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "duration": "PT24H20M",
            "segments": [
              {
                "departure": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-07-16T23:35:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T05:35:00"
                },
                "carrierCode": "TG",
                "number": "318",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "1",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T21:40:00"
                },
                "arrival": {
                  "iataCode": "CMB",
                  "at": "2025-07-17T23:55:00"
                },
                "carrierCode": "TG",
                "number": "307",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "2",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          },
          {
            "duration": "PT21H",
            "segments": [
              {
                "departure": {
                  "iataCode": "CMB",
                  "at": "2025-07-30T00:55:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T06:10:00"
                },
                "carrierCode": "TG",
                "number": "308",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "3",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T18:55:00"
                },
                "arrival": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-07-30T21:55:00"
                },
                "carrierCode": "TG",
                "number": "317",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "4",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "EUR",
          "total": "980.89",
          "base": "546.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "980.89"
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": [
          "TG"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "EUR",
              "total": "980.89",
              "base": "546.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "PREMIUM_ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "2",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "3",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "4",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "isUpsellOffer": false,
        "lastTicketingDate": "2025-07-20",
        "lastTicketingDateTime": "2025-07-26",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "duration": "PT24H20M",
            "segments": [
              {
                "departure": {
                  "iataCode": "CMB",
                  "terminal": "2",
                  "at": "2025-07-16T23:35:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T05:35:00"
                },
                "carrierCode": "TG",
                "number": "318",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "1",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-17T21:40:00"
                },
                "arrival": {
                  "iataCode": "BOM",
                  "at": "2025-07-17T23:55:00"
                },
                "carrierCode": "TG",
                "number": "307",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "2",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          },
          {
            "duration": "PT21H",
            "segments": [
              {
                "departure": {
                  "iataCode": "CMB",
                  "at": "2025-07-30T00:55:00"
                },
                "arrival": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T06:10:00"
                },
                "carrierCode": "TG",
                "number": "308",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT3H45M",
                "id": "3",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "BKK",
                  "at": "2025-07-30T18:55:00"
                },
                "arrival": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-07-30T21:55:00"
                },
                "carrierCode": "TG",
                "number": "317",
                "aircraft": {
                  "code": "333"
                },
                "operating": {
                  "carrierCode": "TG"
                },
                "duration": "PT4H30M",
                "id": "4",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "EUR",
          "total": "980.89",
          "base": "546.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "751.89"
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBagsOnly": true
        },
        "validatingAirlineCodes": [
          "TG"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "EUR",
              "total": "980.89",
              "base": "546.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "PREMIUM_ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "2",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "3",
                "cabin": "ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "V",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              },
              {
                "segmentId": "4",
                "cabin": "PREMIUM_ECONOMY",
                "fareBasis": "VLRSTU1",
                "brandedFare": "ECOST",
                "brandedFareLabel": "ECOSTANDARD",
                "class": "U",
                "includedCheckedBags": {
                  "weight": 35,
                  "weightUnit": "KG"
                },
                "includedCabinBags": {
                  "weight": 7,
                  "weightUnit": "KG"
                },
                "amenities": [
                  {
                    "description": "EXTRA BAGGAGE PER ONE KILOGRAM",
                    "isChargeable": true,
                    "amenityType": "BAGGAGE",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": true,
                    "amenityType": "PRE_RESERVED_SEAT",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "HOT MEAL",
                    "isChargeable": false,
                    "amenityType": "MEAL",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "NAME CORRECTION",
                    "isChargeable": true,
                    "amenityType": "TRAVEL_SERVICES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "BASIC SEAT",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "REFUND",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES",
                    "amenityProvider": {
                      "name": "BrandedFare"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "dictionaries": {
      "locations": {
        "BOM": {
          "cityCode": "BOM",
          "countryCode": "IN"
        },
        "BKK": {
          "cityCode": "BKK",
          "countryCode": "TH"
        },
        "CMB": {
          "cityCode": "CMB",
          "countryCode": "LK"
        }
      },
      "aircraft": {
        "320": "AIRBUS A320",
        "333": "AIRBUS A330-300"
      },
      "currencies": {
        "EUR": "EURO"
      },
      "carriers": {
        "TG": "THAI AIRWAYS INTERNATIONAL"
      }
    }
  },
  "errorBody": {}
};
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
   
   const form = block.querySelector('form');
   form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const auth = await getAccessToken();
    const data = await getData(auth , {
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
      card.className = 'flight-card';

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
    block.appendChild(cardWrapper);
  });
}