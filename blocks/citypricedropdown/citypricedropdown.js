import { renderDataFromAPI } from "../../scripts/scripts.js";

export default async function decorate(block) {

    const props = Array.from(block.children).map((ele) => ele)
    // props

    const [eleHeading, eleCityUrl, eleModalText, elePriceLabel, eleIncluded, eleIncDescription, eleBtn] = props;
    const heading = eleHeading?.children[0]?.children[0];
    const cityUrl = eleCityUrl?.textContent.trim();
    const popupText = eleModalText?.textContent.trim();
    const priceLabel = elePriceLabel?.textContent.trim();
    const included = eleIncluded?.textContent.trim();
    const incDescription = eleIncDescription?.children[0];
    const btn = eleBtn?.children[0]?.children[0];

    const cityPrices = await renderDataFromAPI(cityUrl);

    const filteredCity = cityPrices.data.filter((city) => city.variant_sf_id == 'a24OX000000WsenYAC');

    filteredCity.sort((a, b) => {
        const cityA = a.city_state_id.split("~")[0].toUpperCase();
        const cityB = b.city_state_id.split("~")[0].toUpperCase();
        return cityA.localeCompare(cityB);
    });


    incDescription ? incDescription.classList.add("whats-included-container", "dp-none") : "";

    if (btn) {
        btn.classList.add("buy-btn");
    }



    let dropdown = filteredCity
        .map((city) => `<div class="city-option" data-effectiveprice=${Number(city.effectivePrice).toLocaleString('en-IN')} value=${city.city_state_id.split("~")[0]}>${city.city_state_id.split("~")[0]}</div>`).join("")

    block.innerHTML = '';

    let boxContainer = document.createElement("div")
    boxContainer.classList.add("box-container")
    let city = 'new delhi';
    const defaultCity = filteredCity.find(item =>
        item.city_state_id.includes(city.toUpperCase())
    );

    let toolTipHTML = `<span class="global-tooltip">
                    <img src="/icons/tooltip.svg" data-tip="true" data-for="modelVariant"
                    alt="modelVariant" currentitem="false">
                </span>
                <span class="popup">${popupText}</span>`

    boxContainer.innerHTML = `
    
     <div class="left">
        ${heading.outerHTML}
       <div class="input-search">
    <div class="arrow"><img class="arr-image rotated-image"
            src="/icons/chevron-down.svg" alt="arrow">
    </div>
    <p class="input-city">${defaultCity.city_state_id.split("~")[0]}</p>
     <div class="city-option-container dp-none">
           ${dropdown}
        </div>
</div>
    </div>
    <div class="right">
        <div class="price">
            <p class="amount">₹${Number(defaultCity.effectivePrice).toLocaleString('en-IN')}
                ${popupText ? toolTipHTML : ''}
            </p >
    <p class="price-text">${priceLabel}</p>
        </div >
    <div class="toolbar">${included}</div>
    </div >

    `
    let tooltip = boxContainer.querySelector(".global-tooltip");
    let popup = boxContainer.querySelector(".popup");

    if (tooltip) {
        tooltip.addEventListener("mouseenter", (e) => showPopup(e, popup))
        tooltip.addEventListener("mouseleave", (e) => popup.style.visibility = "hidden")
    }

    let toolbar = boxContainer.querySelector(".toolbar");
    [toolbar, incDescription].forEach(el => {
        el.addEventListener("click", () => hideShowIncluded(toolbar, incDescription,el));
    });

    let cityContainer = boxContainer.querySelector(".input-city");

    // cityContainer.textContent = 

    let cityOptions = boxContainer.querySelectorAll(".city-option");

    cityContainer.addEventListener("click", (e) => togglecityDrop(e))
    cityOptions.forEach((city) => {
        city.addEventListener("click", (e) => selectCity(e, cityContainer))
    })
    boxContainer ? block.appendChild(boxContainer) : '';
    incDescription ? block.appendChild(incDescription) : '';
    btn ? block.appendChild(btn) : '';

}
 
const hideShowIncluded = (toolbar, incDescription, el) => {
        let befparentContHeight = el.closest(".citypricedropdown-wrapper").clientHeight;
        let heromodelviewWrapper =  el.closest(".section").querySelector(".heromodelview-wrapper")
    if (incDescription.classList.contains("dp-none")) {
        incDescription.classList.remove("dp-none");
        toolbar.classList.add("dp-none");
        let parentContHeight = el.closest(".citypricedropdown-wrapper").clientHeight;
        // let wrapper =  el.closest(".section").querySelector(".heromodelview-wrapper").clientHeight;
        heromodelviewWrapper.style.height = heromodelviewWrapper.clientHeight + (parentContHeight - befparentContHeight) + "px";
    }
    else {
        incDescription.classList.add("dp-none");
        toolbar.classList.remove("dp-none");
        let parentContHeight = el.closest(".citypricedropdown-wrapper").clientHeight;
        // let wrapper =  el.closest(".section").querySelector(".heromodelview-wrapper").clientHeight;
        heromodelviewWrapper.style.height = heromodelviewWrapper.clientHeight - ( -parentContHeight + befparentContHeight) + "px";

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
    const block = e.target.closest(".box-container");
    const price = block.querySelector(".amount");

    e.target.closest(".city-option-container").classList.add("dp-none");
    price.firstChild.nodeValue = "₹" + effectivePrice;
}

const showPopup = (e, popup) => {
    popup.style.visibility = "visible";
}

// const toolbar1 = document.querySelector(".toolbar");

// if (isMobile && toolbar1) {

//   const whatsIncludedFun = (e) => {
// //   let includedContainer = document.querySelector(".whats-included-container");
// //   let parentContHeight = e.currentTarget.closest(".citypricedropdown-wrapper")
// }

//   toolbar.addEventListener("click", (e) => { whatsIncludedFun(e); });
// }