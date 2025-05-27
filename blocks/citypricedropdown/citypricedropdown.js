import { renderDataFromAPI } from "../../scripts/scripts.js";

export default async function decorate(block) {

    const props = Array.from(block.children).map((ele) => ele)
    // props

    const [eleHeading, eleCityUrl, eleModalUrl, elePriceLabel, eleIncluded, eleIncDescription, eleBtn] = props;
    const heading = eleHeading?.children[0]?.children[0];
    const cityUrl = eleCityUrl?.textContent.trim();
    const modalUrl = eleModalUrl?.textContent.trim();
    const priceLabel = elePriceLabel?.textContent.trim();
    const included = eleIncluded?.textContent.trim();
    const incDescription = eleIncDescription?.children[0];
    const btn = eleBtn?.children[0]?.children[0];

    const cityPrices = await renderDataFromAPI(cityUrl);

    const filteredCity = cityPrices.filter((city) => city.variant_sf_id == 'a24OX000000WsenYAC');

    filteredCity.sort((a, b) => {
        const cityA = a.city_state_id.split("~")[0].toUpperCase();
        const cityB = b.city_state_id.split("~")[0].toUpperCase();
        return cityA.localeCompare(cityB);
    });



    incDescription.classList.add("whats-included-container", "dp-none");
    btn.classList.add("buy-btn");


    let dropdown = filteredCity
        .map((city) => `<div class="city-option" data-effectiveprice=${city.effectivePrice} value=${city.city_state_id.split("~")[0]}>${city.city_state_id.split("~")[0]}</div>`).join("")

    block.innerHTML = '';

    let boxContainer = document.createElement("div")
    boxContainer.classList.add("box-container")

    boxContainer.innerHTML = `
    
     <div class="left">
        ${heading.outerHTML}
       <div class="input-search">
    <div class="arrow"><img class="arr-image rotated-image"
            src="/content/dam/vida2-0/charging-page/community-charging/drop_down_icon.svg" alt="arrow">
    </div>
    <p class="input-city">New Delhi</p>
     <div class="city-option-container dp-none">
           ${dropdown}
        </div>
</div>
    </div>
    <div class="right">
        <div class="price">
            <p class="amount">₹1,35,000
                <span class="global-tooltip">
                    <img src="/content/dam/vida2-0/tooltip/tootip-icon.svg" data-tip="true" data-for="modelVariant"
                    alt="modelVariant" currentitem="false">
                </span>
            </p>
            <p class="price-text">${priceLabel}</p>
        </div>
        <div class="toolbar">${included}</div>
    </div>

    `

    let toolbar = boxContainer.querySelector(".toolbar");
    [toolbar, incDescription].forEach(el => {
        el.addEventListener("click", () => hideShowIncluded(toolbar, incDescription));
    });

    let cityContainer = boxContainer.querySelector(".input-city");

    // cityContainer.textContent = 

    let cityOptions = boxContainer.querySelectorAll(".city-option");

    cityContainer.addEventListener("click", (e) => togglecityDrop(e))
    cityOptions.forEach((city) => {
        city.addEventListener("click", (e) => selectCity(e, cityContainer))
    })
    block.appendChild(boxContainer);
    block.appendChild(incDescription);
    block.appendChild(btn);

}

const hideShowIncluded = (toolbar, incDescription) => {
    if (incDescription.classList.contains("dp-none")) {
        incDescription.classList.remove("dp-none");
        toolbar.classList.add("dp-none");
    }
    else {
        incDescription.classList.add("dp-none");
        toolbar.classList.remove("dp-none");
    }
}

const togglecityDrop = (e) => {
    let cityOptionContainer = e.target.parentElement.querySelector(".city-option-container");
    if (cityOptionContainer.classList.contains("dp-none")) {
        cityOptionContainer.classList.remove("dp-none");
    }
    else {
        cityOptionContainer.classList.add("dp-none");
    }
}

const selectCity = (e, cityContainer) => {
    const selectedCity = e.target.textContent.trim();
    const effectivePrice = e.target.dataset.effectiveprice;
    cityContainer.textContent = selectedCity;
    let price = document.querySelector(".amount");
    e.target.closest(".city-option-container").classList.add("dp-none");
    price.firstChild.nodeValue = "₹"+effectivePrice;
}