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
               <div class='marque-description'>${respData.properties.elements.description.value}</div>
            `;
            row.firstElementChild.firstElementChild.remove();
            row.firstElementChild.append(marqueewrapper);
            return;
        }
    });
}
