import { renderDataFromAPI } from "../../scripts/scripts.js";
import { fetchAPI } from "../heromodelview/heromodelview.js";

export default async function decorate(block) {
  const props = Array.from(block.children).map((ele) => ele);
  // props

  const [
    eleHeading,
    eleCityUrl,
    eleModalText,
    elePriceLabel,
    eleIncluded,
    eleIncDescription,
    eleBtn,
  ] = props;
  const heading = eleHeading?.children[0]?.children[0];
  const cityUrl = eleCityUrl?.textContent.trim();
  const popupText = eleModalText?.textContent.trim();
  const priceLabel = elePriceLabel?.textContent.trim();
  const included = eleIncluded?.textContent.trim();
  const incDescription = eleIncDescription?.children[0];
  const btn = eleBtn?.children[0]?.children[0];
  // let props = Array.from(block.children).map((div) => div);
  const imagesURL = "/vida-v2-pro/model-images.json"; //props[1].textContent.trim();
  let imagesDetails = await renderDataFromAPIimg(imagesURL);
  const testData = imagesDetails.data;

  const cityPrices = await renderDataFromAPI(cityUrl);
  // const uniqueVariantSkus = [...new Set(cityPrices.data.map(item => item.variant_sku))];

  const filteredCity = cityPrices.data.filter(
    (city) => city.variant_sf_id == "a24OX000000WsenYAC"
  );
  const filteredCityTemp = cityPrices.data;

  filteredCity.sort((a, b) => {
    const cityA = a.city_state_id.split("~")[0].toUpperCase();
    const cityB = b.city_state_id.split("~")[0].toUpperCase();
    return cityA.localeCompare(cityB);
  });

  incDescription
    ? incDescription.classList.add("whats-included-container", "dp-none")
    : "";

  if (btn) {
    btn.classList.add("buy-btn");
  }

  //Number(city.effectivePrice).toLocaleString('en-IN')
  let dropdown = filteredCity
    .map(
      (city) =>
        `<div class="city-option" data-effectiveprice=${Number(
          city.effectivePrice
        ).toLocaleString("en-IN")} data-colour=${city.variant_sf_id} value=${
          city.city_state_id.split("~")[0]
        }>${city.city_state_id.split("~")[0]}</div>`
    )
    .join("");

  block.innerHTML = "";

  let boxContainer = document.createElement("div");
  boxContainer.classList.add("box-container");
  let city = "new delhi";
  const defaultCity = filteredCity.find((item) =>
    item.city_state_id.includes(city.toUpperCase())
  );

  let toolTipHTML = `<span class="global-tooltip">
                    <img src="/icons/chevron-down.svg" data-tip="true" data-for="modelVariant"
                    alt="modelVariant" currentitem="false">
                </span>
                <span class="popup">${popupText}</span>`;

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
            <p class="amount">₹${Number(
              defaultCity.effectivePrice
            ).toLocaleString("en-IN")}
                ${popupText ? toolTipHTML : ""}
            </p >
    <p class="price-text">${priceLabel}</p>
        </div >
    <div class="toolbar">${included}</div>
    </div >

    `;
  let tooltip = boxContainer.querySelector(".global-tooltip");
  let popup = boxContainer.querySelector(".popup");

  if (tooltip) {
    tooltip.addEventListener("mouseenter", (e) => showPopup(e, popup));
    tooltip.addEventListener(
      "mouseleave",
      (e) => (popup.style.visibility = "hidden")
    );
  }

  let toolbar = boxContainer.querySelector(".toolbar");
  [toolbar, incDescription].forEach((el) => {
    el.addEventListener("click", () =>
      hideShowIncluded(toolbar, incDescription, el)
    );
  });

  let cityContainer = boxContainer.querySelector(".input-city");

  // cityContainer.textContent =

  let cityOptions = boxContainer.querySelectorAll(".city-option");

  cityContainer.addEventListener("click", (e) => togglecityDrop(e));
  cityOptions.forEach((city) => {
    city.addEventListener("click", (e) =>
      selectCity(e, cityContainer, filteredCityTemp)
    );
  });
  boxContainer ? block.appendChild(boxContainer) : "";
  incDescription ? block.appendChild(incDescription) : "";
  btn ? block.appendChild(btn) : "";
  //ak
  document.querySelector(".colors").addEventListener("click", (e) => {
    const price = document.querySelector(".amount");
    price.firstChild.nodeValue = "₹" + Number(e.target.dataset.price).toLocaleString("en-IN")
    const indexid = e.target.dataset.id;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    e.target.classList.add("active");
    e.target.s;
    let selImage = document.querySelector(".image");
    testData.forEach((e, i) => {
      if (e.color_id === indexid) {
        selImage.src = isMobile
          ? testData[i].mob_img_urls.split(",")[0]
          : testData[i].desk_img_urls.split(",")[0];
      }
    });

    // selImage.src = isMobile
    //   ? testData[indexid].mob_img_urls.split(",")[0]
    //   : testData[indexid].desk_img_urls.split(",")[0];
  });
}

const hideShowIncluded = (toolbar, incDescription, el) => {
  let befparentContHeight = el.closest(
    ".citypricedropdown-wrapper"
  ).clientHeight;
  let heromodelviewWrapper = el
    .closest(".section")
    .querySelector(".heromodelview-wrapper");
  if (incDescription.classList.contains("dp-none")) {
    incDescription.classList.remove("dp-none");
    toolbar.classList.add("dp-none");
    let parentContHeight = el.closest(
      ".citypricedropdown-wrapper"
    ).clientHeight;
    // let wrapper =  el.closest(".section").querySelector(".heromodelview-wrapper").clientHeight;
    heromodelviewWrapper.style.height =
      heromodelviewWrapper.clientHeight +
      (parentContHeight - befparentContHeight) +
      "px";
  } else {
    incDescription.classList.add("dp-none");
    toolbar.classList.remove("dp-none");
    let parentContHeight = el.closest(
      ".citypricedropdown-wrapper"
    ).clientHeight;
    // let wrapper =  el.closest(".section").querySelector(".heromodelview-wrapper").clientHeight;
    heromodelviewWrapper.style.height =
      heromodelviewWrapper.clientHeight -
      (-parentContHeight + befparentContHeight) +
      "px";
  }
};

const togglecityDrop = (e) => {
  let cityOptionContainer = e.target.parentElement.querySelector(
    ".city-option-container"
  );
  if (cityOptionContainer.classList.contains("dp-none")) {
    cityOptionContainer.classList.remove("dp-none");
  } else {
    cityOptionContainer.classList.add("dp-none");
  }
};

const selectCity = (e, cityContainer, filteredCityTemp) => {
  const selectedCity = e.target.textContent.trim();
  const effectivePrice = e.target.dataset.effectiveprice;
  const colourselected = e.target.dataset.colour;
  // const colourselectedid = e.target.id;
  const filteredCitycol = filteredCityTemp.filter(
    (citypro) => citypro.city_state_id.split("~")[0] === selectedCity
  );
  const filteredColour = filteredCitycol.filter(
    (citycolor) => citycolor.item_name === "V2 PRO"
  );

  const filteredColourArr = [];
  const filteredPriceArr = [];
  filteredColour.forEach((item) => {
    filteredColourArr.push(item.variant_sf_id);
    filteredPriceArr.push(item.effectivePrice);
  });

  const filteredColourArrAuth = [];
  Array.from(document.querySelectorAll(".color")).forEach(function (item) {
    console.log(item);
    filteredColourArrAuth.push(item.id);
  });

  filteredColourArrAuth.forEach((sku , index) => {
            document.getElementById(sku).dataset.price = filteredPriceArr[index];
    if (!filteredColourArr.includes(sku)) {
      const colorDiv = document.getElementById(sku);
      if (colorDiv) {
        colorDiv.style.display = "none";
      } else {
        colorDiv.style.display = "block";
      }
    }
  });

  //ak2
  // document.querySelector(".colors").innerHTML = "";
 
//   filteredColour.forEach(function (e, index) {
//     const colorName = e.variant_name.split(" ").slice(-1).join();
//     // Create a div element
//     const colorDiv = document.createElement("div");
//     colorDiv.className = "color";
//     colorDiv.dataset.price = e.effectivePrice;
//     colorDiv.style.backgroundColor = colorName;
//     colorDiv.dataset.id = e.variant_sf_id;
//     // colorDiv.textContent = colorName;

//     // Append to the parent container
//     // document.querySelector(".colors").appendChild(colorDiv);
//   });

  cityContainer.textContent = selectedCity;
  const block = e.target.closest(".box-container");
  // const price = block.querySelector(".amount");

  e.target.closest(".city-option-container").classList.add("dp-none");
  const price = block.querySelector(".amount");
    price.firstChild.nodeValue = "₹" + effectivePrice

};
async function renderDataFromAPIimg(url) {
  const resp = await fetchAPI("GET", url);
  const data = await resp.json();
  return data;
}
// document.querySelector('.colors').addEventListener('click',(e)=>{
//     // debugger
//     const price = document.querySelector(".amount");
//     price.firstChild.nodeValue = "₹" + e.target.dataset.price;
//     const isMobile = window.matchMedia("(max-width: 760px)").matches;
//     e.target.classList.add('active')

//         let selImage = document.querySelector(".image");
//         selImage.src = isMobile
//             ? arrayImagesDet[ind].mob_img_urls.split(",")[0]
//             : arrayImagesDet[ind].desk_img_urls.split(",")[0];

//     //  let colorDiv = document.querySelectorAll(".color");
//     // let activeIndex = 0;

//     // colorDiv.forEach((div, ind) => {
//     //     div.addEventListener("click", () => {
//     //         changeActiveClr(colorDiv);
//     //         selectedScooterClr(div, ind);
//     //         activeIndex = ind;
//     //     });
//     // });
// })

const showPopup = (e, popup) => {
  popup.style.visibility = "visible";
};
