// import { renderDataFromAPI } from "../../scripts/scripts";

let isDragging = false;
let startX = 0;
let currentFrame = 0;
let accumulated = 0;
const pixelsPerDegree = 1.5;

export default async function decorate(block) {
    let props = Array.from(block.children).map((div) => div);
    const imagesURL = props[1].textContent.trim();
    let heading = props[2].children[0].children[0];
    let boldHeading = props[3].children[0].children[0];
    let imagesDetails = await renderDataFromAPI(imagesURL);
    const arrayImagesDet = imagesDetails.data;
    let imgRotateUrls = arrayImagesDet.map((data) => data.img_rotate_urls);
    let modelWrapper = document.createElement("div");
    modelWrapper.classList.add("model-wrapper");

    let colors = document.createElement("div");
    colors.classList.add("colors");

    const selectedScooterClr = (div, ind) => {
        div.classList.add("active");
        let selImage = modelWrapper.querySelector(".image");
        const isMobile = window.matchMedia("(max-width: 760px)").matches;
        selImage.src = isMobile
            ? arrayImagesDet[ind].mob_img_urls.split(",")[0]
            : arrayImagesDet[ind].desk_img_urls.split(",")[0];
    };

    arrayImagesDet.map((modelObj, ind) => {
        let div = document.createElement("div");
        div.style.backgroundColor = modelObj.color;
        ind == 0
            ? div.classList.add("active", "color")
            : div.classList.add("color");
        colors.appendChild(div);
    });

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const initialImgURL = isMobile
        ? arrayImagesDet[0].mob_img_urls.split(",")[0]
        : arrayImagesDet[0].desk_img_urls.split(",")[0];

    modelWrapper.innerHTML += `
    <div class="images">
        <img class="image" alt=''
            title="Nexusblue VIDA V2 PRO Electric Scooter" draggable="false" loading="lazy"
            src="${initialImgURL}">
        <div class="platform"></div>    
        <div class="colors">
            ${colors.innerHTML}
        </div>
        <div class="visualizer-color-text-wrapper">
            <div class="color-text">${imgRotateUrls.length} colours to choose from</div>
        </div>
    </div>
    `;

    block.innerHTML = '';
    modelWrapper.prepend(heading, boldHeading);
    let bgimgURL = props[0].querySelector("picture img").src;
    modelWrapper.style.backgroundImage = `url(${bgimgURL})`;
    let colorDiv = modelWrapper.querySelectorAll(".color");
    let activeIndex = 0;

    colorDiv.forEach((div, ind) => {
        div.addEventListener("click", () => {
            changeActiveClr(colorDiv);
            selectedScooterClr(div, ind);
            activeIndex = ind;
        });
    });

    const mainImage = modelWrapper.querySelector(".image");
    mainImage.addEventListener("mousedown", (e) => {
        rotateImg(e, activeIndex, arrayImagesDet, mainImage);
    });

    block.appendChild(modelWrapper);
}

const rotateImg = (event, activeIndex, arrayImagesDet, imgEl) => {
    isDragging = true;
    startX = event.clientX;

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const rotateUrlString = isMobile
        ? arrayImagesDet[activeIndex].mob_img_urls
        : arrayImagesDet[activeIndex].desk_img_urls;

    const imgRotateUrls = rotateUrlString.split(",");
    const totalFrames = imgRotateUrls.length;
    const degreesPerFrame = 360 / totalFrames;
    const pixelsPerFrame = degreesPerFrame * pixelsPerDegree;

    const onMouseMove = (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        accumulated += deltaX;
        startX = e.clientX;

        const frameShift = Math.floor(accumulated / pixelsPerFrame);

        if (frameShift !== 0) {
            accumulated -= frameShift * pixelsPerFrame;
            currentFrame = (currentFrame + frameShift + totalFrames) % totalFrames;
            imgEl.src = imgRotateUrls[currentFrame];
        }
    };

    const onMouseUp = () => {
        isDragging = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
};

const changeActiveClr = (colorDiv) => {
    colorDiv.forEach((eachDiv) => {
        if (eachDiv.classList.contains("active")) {
            eachDiv.classList.remove("active");
        }
    });
};
async function renderDataFromAPI(url) {
    const resp = await fetchAPI('GET', url);
    const data = await resp.json();
    return data;
}

export function fetchAPI(method, url, data) {
    return new Promise(async (resolve, reject) => {
        try {
            if (method === 'GET') {
                const resp = await fetch(url);
                resolve(resp);
            } else if (method === 'POST') {
                data.headerJson = data.headerJson || {
                    'Content-Type': 'application/json',
                };

                if (data.headerJson['Content-Type'] == 'remove') {
                    data.headerJson['Content-Type'] = '';
                } else {
                    data.headerJson['Content-Type'] = data.headerJson['Content-Type'] ? data.headerJson['Content-Type'] : 'application/json';
                }

                const request = new Request(url, {
                    method: 'POST',
                    body: JSON.stringify(data.requestJson),
                    headers: data.headerJson,
                });
                const response = await fetch(request);
                const json = await response.json();
                resolve({ responseJson: json });
            }
        } catch (error) {
            console.warn(error);
            reject(error);
        }
    });
}
