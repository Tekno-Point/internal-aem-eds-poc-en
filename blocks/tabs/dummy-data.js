export const dData = {
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
                    "terminal": "3",
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
                    "terminal": "3",
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
                    "terminal": "3",
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
                    "terminal": "3",
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