export default async function decorate(block) {
    let selectedColor = 'white';
    let clickedColor = 'white';
    let props = Array.from(block.children).map((div) => div)
    let imagesDetails = await renderDataFromAPI("/vida-v2-pro/model-images.json");
    const arrayImagesDet = imagesDetails.data;
    selectedColor = arrayImagesDet[0].color;
    let modelWrapper = document.createElement("div");
    modelWrapper.classList.add("model-wrapper")

    let colors = document.createElement("div")
    colors.classList.add("colors")

    const selectedScooterClr = (div, ind) => {
        // alert(ind)
        div.classList.add("active")
        modelWrapper.querySelector(".image").src = arrayImagesDet[ind].img_url;
    }

    arrayImagesDet.map((modelObj, ind) => {
        let div = document.createElement("div")
        div.style.backgroundColor = modelObj.color;
        ind == 0 ? (div.classList.add("active", "color")) : (div.classList.add("color"));
        colors.appendChild(div);
    })

    modelWrapper.innerHTML += `
    <div class="images"><img class="image" alt= ''
        title="Nexusblue VIDA V2 PRO Electric Scooter" draggable="false" loading="lazy"
        src='${arrayImagesDet[0].img_url}'>
    <div class="platform"></div>    
       <div class="colors">
        ${colors.innerHTML.trim()}
        </div>
    <div class="visualizer-color-text-wrapper">
        <div class="color-text">6 colours to choose from</div>
    </div>
</div>
    `
    console.log(modelWrapper);
    // arrayImagesDet.forEach(element => {
    //     if (clickedColor == selectedColor) {
    //         scooterImg.src = element.img_url;
    //     }

    // });
    // div.append(img)
    block.innerHTML = '';
    let bgimgURL = props[0].querySelector("picture img").src;
    modelWrapper.style.backgroundImage = `url(${bgimgURL})`;
    let colorDiv = modelWrapper.querySelectorAll(".color");
    colorDiv.forEach((div, ind) => {

        div.addEventListener("click", () => {
            colorDiv.forEach((eachDiv) => {
                if (eachDiv.classList.contains("active")) {
                    eachDiv.classList.remove("active")
                }
            })
            selectedScooterClr(div, ind)
        });

    })
    block.appendChild(modelWrapper)
}

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

                /* Optimzie Code */
                /* data.headerJson = data.headerJson || {};
                data.headerJson["Content-Type"] = data.headerJson["Content-Type"] === 'remove' ? '' : data.headerJson["Content-Type"] || "application/json"; */

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