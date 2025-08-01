async function fetchGraphQL(url, req) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    //   myHeaders.append('Cookie', 'affinity="c83f9eaf4f54c838"');

    const graphql = JSON.stringify({
        query: '',
        variables: req,
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow',
    };

    const resp = await fetch(url, requestOptions);
    const json = await resp.json();
    return json;
}
function getAssetsAPI(url) {
    return url.replace('/content/dam', '/api/assets');
}
const exclude = ['author-p48457-e1275402.adobeaemcloud.com', 'localhost:3000'];
export default async function decorate(block) {
    if (!block.textContent.trim()) {
        return block;
    }
    const configResp = await fetch('/config.json');
    const config = await configResp.json();
    let origin = config.data[0].value;
    if (exclude.includes(window.location.host)) {
        origin = 'https://publish-p48457-e1275402.adobeaemcloud.com';
    }

    Array.from(block.children).forEach(async (row, i) => {
        const item = row.querySelector('a');
        const formurl = new URL(item.href)?.pathname.replace('.html', '');
        const searchpara = new URL(item.href).search;
        // const searchpara = '?id='+ (Math.random()*10);
        let url = `${origin}/graphql/execute.json/internal-aem-eds-poc/trending-destination-list`;
        // let url = `${origin}/graphql/execute.json/internal-aem-eds-poc/trending-destination-list;path=${formurl}${searchpara}`
        // if(block.classList.contains('asset-api')){
        console.log(url);
        if (block.classList.contains('marque')) {
            url = `${origin + getAssetsAPI(formurl)}.json`;
            const response = await fetch((url), {
                method: 'GET',
            });
            const respData = await response.json();
            // console.log(respData);

            const marqueewrapper = document.createElement('div');
            marqueewrapper.classList.add('marque-wrapper');
            marqueewrapper.innerHTML = `
               <h3 class='marque-heading'>${respData.properties.elements.head.value}</h3>
               <div class='marque-description'>${respData.properties.elements.description.value}</div>
            `;
            row.firstElementChild.firstElementChild.remove();
            row.firstElementChild.append(marqueewrapper);
            return;
        }

        // }
        //    let url = "https://publish-p48457-e1275402.adobeaemcloud.com/api/assets/internal-aem-eds-poc/cf/srilankan-airlines/marque.json";
        // if (block.classList.contains('marque')) {
        //     url = `${origin}/graphql/execute.json/internal-aem-eds-poc/marque;path=${formurl}${searchpara}`;
        //     // url = "https://publish-p48457-e1275402.adobeaemcloud.com/api/assets/internal-aem-eds-poc/cf/srilankan-airlines/marque.json";
        //     const response = await fetch((url), {
        //         method: "GET"
        //     });
        //     const respData = await response.json();
        //     console.log(respData.properties.elements.head.value)
        //     console.log(respData.properties.elements.description.value)

        //     //   const marqueData = respData?.data?.srilankaMarqueByPath?.item;

        //     const marqueewrapper = document.createElement('div');
        //     marqueewrapper.classList.add("marque-wrapper")
        //     marqueewrapper.innerHTML = `
        //        <h3 class='marque-heading'>${respData.properties.elements.head.value}</h3>
        //        <div class='marque-description'>${respData.properties.elements.description.value}</div>
        //     `
        //     row.firstElementChild.firstElementChild.remove()
        //     row.firstElementChild.append(marqueewrapper);
        //     return
        // }
        url = `${origin + getAssetsAPI(formurl)}.json`;
        const response = await fetch((url), {
            method: 'GET',
        });
        const respData = await response.json();
        const data = respData.properties.elements.contentFragment.value.filter(el => el).map(async function (eachPath) {
            const eachurl = `${origin + getAssetsAPI(eachPath)}.json`;
            const response = await fetch((eachurl), {
                method: 'GET',
            });
            const respData = await response.json();
            // console.log(respData.properties.elements);

            const data = {
                "departureCity": respData.properties.elements.departureCity.value,
                "departureDate": respData.properties.elements.departureDate.value,
                "destinationCity": respData.properties.elements.destinationCity.value,
                "destinationDate": respData.properties.elements.destinationDate.value,
                "price": respData.properties.elements.price.value,
                "type": respData.properties.elements.type.value,
                "image": {
                    "_publishUrl": origin + respData.properties.elements.image.value
                },
                "tripType": respData.properties.elements.tripType.value,
                "description": {
                    "html": respData.properties.elements.description.value
                }
            }
            // console.log(data);

            return data

        })
        // console.log("data :: ", data);
        const allData = await Promise.all(data)
        console.log(allData);

        // const respData = await fetchGraphQL((url), { path: formurl });
        // const respData = await response.json();
        // console.log(respData)
        // Render the carousel markup
        // let carousel = renderUI(respData?.data?.cfListByPath?.item?.contentFragment);
        let carousel = renderUI(allData);

        // If renderUI returns an array, wrap it in a div
        if (Array.isArray(carousel)) {
            const wrapper = document.createElement('div');
            carousel.forEach((el) => wrapper.appendChild(el));
            carousel = wrapper;
        }
        // Remove all children before appending carousel
        // while (block.firstChild) block.removeChild(block.firstChild);
        row.firstElementChild.firstElementChild.remove();
        if (carousel instanceof HTMLElement) {
            // block.appendChild(carousel);
            row.firstElementChild.append(carousel);
        }
        // Only initialize Swiper (do not re-wrap slides)
        if (carousel instanceof HTMLElement) {
            initSwiperOnly(carousel);
        }

        showCards(allData);
        window.addEventListener('userDataSave', (e) => {
            showCards(allData);
        });
    });
}
