// import { loadScript } from "../../scripts/aem.js";
// import '../../styles/charging-map.css'; // Assuming CSS is in styles folder

import { renderDataFromAPI } from "../../scripts/scripts.js";

export default async function decorate(block) {

    let data = await renderDataFromAPI("/vida/api/map.json");

    const styles = document.createElement("link");
    styles.href = 'https://apis.mapmyindia.com/advancedmaps/api/885a6ed1-0258-460b-af0e-32aee53f2127/map_load?v=1.5';
    styles.rel = "stylesheet";
    document.head.append(styles);

    const props = Array.from(block.children);
    const [headingDiv, chargingImgDiv, chargingTextDiv, citiesImgDiv, citiesTextDiv, accordionDiv, urlDiv] = props;

    const heading = headingDiv.textContent.trim();
    const chargingImg = chargingImgDiv.children[0].querySelector("img");
    const citiesImg = citiesImgDiv.children[0].querySelector("img");
    const chargingText = chargingTextDiv.children[0].querySelector("p:first-child").textContent.trim();
    const chargingNumber = chargingTextDiv.children[0].querySelector("p:last-child").textContent.trim();
    const citiesText = citiesTextDiv.children[0].querySelector("p:first-child").textContent.trim();
    const citiesNumber = citiesTextDiv.children[0].querySelector("p:last-child").textContent.trim();
    const accordionImg = accordionDiv.children[0].querySelector("p:first-child img");
    const accordionText = accordionDiv.children[0].querySelector("p:last-child").textContent.trim();
    const url = urlDiv.textContent.trim();

    const obj = [
        { img: chargingImg, text: chargingText, number: chargingNumber },
        { img: citiesImg, text: citiesText, number: citiesNumber }
    ];

    block.innerHTML = '';

    const stationWrapperHTML = obj.map(ele => `
        <div class="charging-station-info-item">
            <div class="charging-station-info-icon">${ele.img.outerHTML}</div>
            <div class="charging-station-info-flex-container">
                <div class="charging-station-info-title">
                    <p class="charging-station-info-title-text">${ele.text}</p>
                </div>
                <div class="charging-station-info-number">
                    <p class="charging-station-info-number-text">${ele.number}</p>
                </div>
            </div>
        </div>
    `).join('');

    const html = `
    <div class="find-charging-station-content-container">
        <div class="find-charging-station-title-container">
            <h2 class="find-charging-station-title">${heading}</h2>
        </div>
        <div class="charging-station-info-container">
            <div class="charging-station-info-list">
                ${stationWrapperHTML}
            </div>
        </div>
    </div>

    <div class="charging-accordian-container">
        <div class="charging-accordian-title-container">
            <div class="charging-accordian-title-icon">${accordionImg.outerHTML}</div>
            <div class="charging-accordian-title">
                <p class="charging-accordian-title-text">${accordionText}</p>
            </div>
        </div>
        
        
        <div class="map-container">
    <div class="charging-accordian-header">
        <div class="search-input-container">
            <div class="search-icon"></div>
            <input type="text" class="search" placeholder="Search city...">
            <button id="current-location-button" class="current-location-icon"></button>
            <button class="accordion-toggle-button">-</button>
        </div>
        <div class="charger-counts">
            <div class="count-item">
                <span class="charger-icon"></span>
                <span id="charging-stations-city-count">89</span>
                <span class="label">charging stations in your city</span>
            </div>
            <div class="count-item">
                <span class="charger-icon"></span>
                <span id="charging-stations-near-you-count">89</span>
                <span class="label">charging stations near you</span>
            </div>
        </div>
    </div>

    <div class="charging-accordian-content">

        <div id="map" class="leaflet-container leaflet-fade-anim leaflet-gesture-handling" tabindex="0" data-gesture-handling-touch-content="Use two fingers to move the map" data-gesture-handling-scroll-content="Use ctrl + scroll to zoom" style="position: relative;">
            </div>
    </div>
</div>

    </div>`;

    block.innerHTML = html;

    const mapScript = document.createElement("script");
    mapScript.src = 'https://apis.mapmyindia.com/advancedmaps/api/j35ow2h8ltbgcmbzcv8o2q9r9lwukkef/map_load?v=1.5';
    mapScript.onload = () => {
        const block = document.body;
        const mapDiv = block.querySelector("#map");
        const searchInput = block.querySelector(".search");
        const currentLocationButton = block.querySelector("#current-location-button");
        const cityChargerCount = block.querySelector("#charging-stations-city-count");
        const nearYouChargerCount = block.querySelector("#charging-stations-near-you-count");

        if (!mapDiv || !searchInput) {
            console.error("Map or search input element not found.");
            return;
        }

        const map = new MapmyIndia.Map(mapDiv, {
            center: [19.0760, 72.8777],
            zoom: 6,
            traffic: true,
            scrollWheelZoom: true,
        });

        let currentMarkersLayer = L.layerGroup().addTo(map);

        const allCityData = data;

        function haversineDistance(lat1, lon1, lat2, lon2) {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance;
        }

        /**
         * Adds markers for the given city's charging stations to the map.
         * Markers are added to `currentMarkersLayer` and previous markers are NOT removed.
         *The city data object containing charging stations.
         */
        const displayCityMarkers = (cityObject) => {
            const allStations = [
                ...(cityObject.chargingStations || []),
                ...(cityObject.atherChargingStations || [])
            ];

            const validLatLngs = []; // To collect valid LatLngs for bounds calculation

            allStations.forEach(station => {
                const lat = parseFloat(station.latitude);
                const lng = parseFloat(station.longitude);

                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new L.Marker([lat, lng], {
                        icon: L.icon({
                            iconUrl: "https://maps.mapmyindia.com/images/2.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                        }),
                    }).addTo(currentMarkersLayer);

                    let popupContent = `<b>${station.stationName || station.experienceCenterName || 'Unknown Station'}</b><br>`;
                    popupContent += station.chargingStationAddress || station.address || 'Address not available';
                    marker.bindPopup(popupContent);

                    validLatLngs.push(L.latLng(lat, lng));
                } else {
                    console.warn(`Invalid coordinates for station: ${station.stationName || station.experienceCenterName || 'Unknown Station'} (${station.latitude}, ${station.longitude})`);
                }
            });

            if (validLatLngs.length > 0) {
                const combinedBounds = L.latLngBounds(validLatLngs);
                if (combinedBounds.isValid()) {
                    map.fitBounds(combinedBounds, { padding: [50, 50] });
                } else {
                    const cityLat = parseFloat(cityObject.latitde);
                    const cityLng = parseFloat(cityObject.longitude);
                    if (!isNaN(cityLat) && !isNaN(cityLng)) {
                        map.setView([cityLat, cityLng], 12);
                    }
                }
            } else {
                const cityLat = parseFloat(cityObject.latitde);
                const cityLng = parseFloat(cityObject.longitude);
                if (!isNaN(cityLat) && !isNaN(cityLng)) {
                    map.setView([cityLat, cityLng], 12);
                }
            }
        };

        const updateChargerCounts = (cityName) => {
            const cityData = allCityData.find(loc => loc.cityName.toLowerCase() === cityName.toLowerCase());

            if (cityData) {
                const totalChargers = (cityData.chargingStations ? cityData.chargingStations.length : 0) +
                    (cityData.atherChargingStations ? cityData.atherChargingStations.length : 0);
                cityChargerCount.textContent = totalChargers;
                nearYouChargerCount.textContent = totalChargers;
            } else {
                cityChargerCount.textContent = 'N/A';
                nearYouChargerCount.textContent = 'N/A';
            }
        };

        let suggestionList = document.createElement('ul');
        suggestionList.className = 'custom-autosuggest-list';
        searchInput.parentNode.appendChild(suggestionList);

        searchInput.addEventListener('input', function () {
            const query = searchInput.value.toLowerCase();
            suggestionList.innerHTML = '';

            if (query.length === 0) {
                suggestionList.style.display = 'none';
                return;
            }

            const filteredCities = allCityData.filter(city =>
                city.cityName.toLowerCase().startsWith(query)
            );

            if (filteredCities.length > 0) {
                filteredCities.forEach(city => {
                    let listItem = document.createElement('li');
                    listItem.textContent = city.cityName;
                    listItem.addEventListener('click', () => {
                        searchInput.value = city.cityName;
                        displayCityMarkers(city);
                        updateChargerCounts(city.cityName);
                        suggestionList.style.display = 'none';
                    });
                    suggestionList.appendChild(listItem);
                });
                suggestionList.style.display = 'block';
            } else {
                suggestionList.style.display = 'none';
            }
        });

        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                const matchedCity = allCityData.find(city =>
                    city.cityName.toLowerCase() === query
                );

                if (matchedCity) {
                    displayCityMarkers(matchedCity);
                    updateChargerCounts(matchedCity.cityName);
                    suggestionList.style.display = 'none';
                } else {
                    alert("City not found in your data. Please select from suggestions.");
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (!searchInput.contains(event.target) && !suggestionList.contains(event.target)) {
                suggestionList.style.display = 'none';
            }
        });

        currentLocationButton.addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const { latitude, longitude } = pos.coords;

                    currentMarkersLayer.clearLayers();

                    const userLocationMarker = new L.Marker([latitude, longitude], {
                        icon: L.icon({
                            iconUrl: "https://maps.mapmyindia.com/images/blue_marker.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                        }),
                    }).addTo(map).bindPopup("You are here").openPopup();

                    let closestCity = null;
                    let minDistance = Infinity;

                    allCityData.forEach(city => {
                        const cityLat = parseFloat(city.latitde);
                        const cityLng = parseFloat(city.longitude);

                        if (!isNaN(cityLat) && !isNaN(cityLng)) {
                            const distance = haversineDistance(latitude, longitude, cityLat, cityLng);
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestCity = city;
                            }
                        }
                    });

                    if (closestCity) {
                        displayCityMarkers(closestCity);
                        updateChargerCounts(closestCity.cityName);
                        searchInput.value = closestCity.cityName;

                        const combinedBounds = L.latLngBounds([]);
                        combinedBounds.extend(userLocationMarker.getLatLng());

                        const closestCityStations = [
                            ...(closestCity.chargingStations || []),
                            ...(closestCity.atherChargingStations || [])
                        ];
                        closestCityStations.forEach(station => {
                            const lat = parseFloat(station.latitude);
                            const lng = parseFloat(station.longitude);
                            if (!isNaN(lat) && !isNaN(lng)) {
                                combinedBounds.extend([lat, lng]);
                            }
                        });

                        if (combinedBounds.isValid()) {
                            map.fitBounds(combinedBounds, { padding: [50, 50] });
                        } else {
                            map.setView([latitude, longitude], 12);
                        }

                    } else {
                        cityChargerCount.textContent = '??';
                        nearYouChargerCount.textContent = '??';
                        map.setView([latitude, longitude], 12);
                        alert("Could not find a matching city in your data for your current location. Displaying general info.");
                    }

                }, (error) => {
                    console.error("Geolocation error:", error);
                    alert("Could not retrieve your location. Please ensure location services are enabled.");
                });
            } else {
                alert("Geolocation is not supported by your browser.");
            }
        });

        const ahmedabadData = allCityData.find(city => city.cityName === "Ahmedabad");
        if (ahmedabadData) {
            displayCityMarkers(ahmedabadData);
            updateChargerCounts(ahmedabadData.cityName);
            const lat = parseFloat(ahmedabadData.latitde);
            const lng = parseFloat(ahmedabadData.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
                map.setView([lat, lng], 12);
            }
        }

        const accordionHeader = block.querySelector(".charging-accordian-header");
        const accordionContent = block.querySelector(".charging-accordian-content");
        const toggleButton = block.querySelector(".accordion-toggle-button");

        accordionHeader.addEventListener('click', (event) => {
            if (event.target.closest('.search-input-container') || event.target.closest('.accordion-toggle-button')) {
                return;
            }
            accordionContent.classList.toggle('collapsed');
            toggleButton.textContent = accordionContent.classList.contains('collapsed') ? '+' : '-';
            if (!accordionContent.classList.contains('collapsed')) {
                setTimeout(() => {
                    map.invalidateSize();
                }, 300);
            }
        });

        toggleButton.addEventListener('click', (event) => {
            event.stopPropagation();
            accordionContent.classList.toggle('collapsed');
            toggleButton.textContent = accordionContent.classList.contains('collapsed') ? '+' : '-';
            if (!accordionContent.classList.contains('collapsed')) {
                setTimeout(() => {
                    map.invalidateSize();
                }, 300);
            }
        });
    };
    document.body.appendChild(mapScript);


}
