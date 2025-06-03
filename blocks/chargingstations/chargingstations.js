export default function decorate(block) {

    const props = Array.from(block.children);

    const [headingDiv, chargingImgDiv, chargingTextDiv, citiesImgDiv, citiesTextDiv, accordionDiv, urlDiv] = props;

    const heading = headingDiv.textContent.trim();
    const chargingImg = chargingImgDiv.children[0].querySelector("img");
    const citiesImg = citiesImgDiv.children[0].querySelector("img");
    const chargingText = chargingTextDiv.children[0].querySelector("p:first-child").textContent.trim();
    const chargingNumber = chargingTextDiv.children[0].querySelector("p:last-child").textContent.trim();
    const citiesText = citiesTextDiv.children[0].querySelector("p:first-child").textContent.trim();
    const accordionImg = citiesTextDiv.children[0].querySelector("p:first-child");
    const accordionText = accordionDiv.children[0].querySelector("p:first-child").textContent.trim();
    const citiesNumber = accordionDiv.children[0].querySelector("p:first-child").textContent.trim();
    const url = urlDiv.textContent.trim();


    const obj = [
        {
            img: chargingImg,
            text: chargingText,
            number: chargingNumber
        },
        {
            img: citiesImg,
            text: citiesText,
            number: citiesNumber
        }
    ]

    block.innerHTML = '';

    const stationWrapperHTML = obj.map((ele) => {
        return `<div class="charging-station-info-list">
    <div class="charging-station-info-item">
        <div class="charging-station-info-icon">
        ${ele.img}
        </div>
        <div class="charging-station-info-flex-container">
            <div class="charging-station-info-title">
                <p class="charging-station-info-title-text">${ele.text}</p>
            </div>
            <div class="charging-station-info-number">
                <p class="charging-station-info-number-text">${ele.number}</p>
            </div>
        </div>
    </div>
</div>`
    })

        `
    <div class="find-charging-station-content-container">
        <div class="find-charging-station-title-container">
             <h2 class="find-charging-station-title">${heading}</h2>
        </div>
        <div class="charging-station-info-container">
            <div class="charging-station-info-list">
                ${stationWrapperHTML.join(",").trim().outerHTML}
            </div>
        </div>
    </div>
    
    <div class="charging-accordian-container">
        <div class="charging-accordian-title-container">
            <div class="charging-accordian-title-icon">
                ${accordionImg}
            </div>
            <div class="charging-accordian-title">
                <p class="charging-accordian-title-text">${accordionText}</p>
            </div>
        </div>
    </div>
    `
    

}