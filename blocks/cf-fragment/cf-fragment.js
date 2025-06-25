const exclude = ['author-p48457-e1275402.adobeaemcloud.com'];
export default async function decorate(block) {
    if(!block.textContent.trim()){
        return block;
    }
    const configResp = await fetch('/config.json');
    const config = await configResp.json();
    let origin = config.data[0].value
    if(exclude.includes(window.location.host)){
        origin = 'https://author-p48457-e1275402.adobeaemcloud.com';
    }
    // const formHref = new URL(block.querySelectorAll('a')?.href).pathname;
    const formHrefs = block.querySelectorAll('a');

    if(!window.location.href.includes('author')){
        block.innerHTML = "";
    }
    else{
        formHrefs.forEach(item => {
            item.innerHTML = "";
        })
    }

    formHrefs.forEach(async (item,i ) => {
        // const item = formHref[i];
        const formurl = new URL(item.href)?.pathname.replace('.html','');
        const url = `${origin}/graphql/execute.json/internal-aem-eds-poc/get-article;path=${formurl}`
        const response = await fetch((url), {
            method: "GET"
            // credentials: "include", // Include credentials such as cookies
        });
        const respData = await response.json();
        // block.innerHTML = JSON.stringify(respData.data.articleByPath.item);
        // respData.data.forEach(data => {
    
        // });
        // console.log("response :: ", respData);
    
        block.appendChild(createCard(respData, item,i));
    });
    // for (let i = 0; i < formHref.length; i++) {
    // }
}

const imagedata = ["/images/cross-teaser4.webp", "/images/cross-teaser5.webp"]

function createCard(data, block,i) {
    const path = data.data.articleByPath.item;
    const teaser = document.createElement('div');
    teaser.classList.add('teaser');

    teaser.innerHTML = `
        <a href=${path.ctaUrl._publishUrl}>
            <div class="teaser-image">
                <img loading="lazy" alt="" src=${path.image._publishUrl?path.image._publishUrl: imagedata[i]} />
            </div>
            <div class="teaser-content">
              <h4 id="basic-health-insurance">${path.title}</h4>
              <p>${path.description}</p>
              <p class="button-container"><span>${path.ctaText}</span></p>
            </div>
       </a>
    `;

    block.appendChild(teaser);
    return block;
}