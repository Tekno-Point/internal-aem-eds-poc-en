export default async function decorate(block) {
    // const formHref = new URL(block.querySelectorAll('a')?.href).pathname;
    const formHref = block.querySelectorAll('a');

    const configResp = await fetch('/config.json');
    const config = await configResp.json();

    block.innerHTML = "";

    for (const item of formHref) { 
        const formurl =  new URL(item.href).pathname
        const url = `${config.data[0].value}/graphql/execute.json/internal-aem-eds-poc/get-article;path=${formurl}`
        const response = await fetch((url), {
            method: "GET",
            // credentials: "include", // Include credentials such as cookies
        });
        const respData = await response.json();
        // block.innerHTML = JSON.stringify(respData.data.articleByPath.item);
        // respData.data.forEach(data => {
            
        // });
        console.log("response :: ", respData);

        createCard(respData, block)
    }
}


function createCard (data, block) {
    const path = data.data.articleByPath.item;
    const teaser = document.createElement('div');
    teaser.classList.add('teaser');

    teaser.innerHTML = `
        <a href=${path.ctaUrl._publishUrl}>
            <div class="teaser-image">
                <img loading="lazy" alt="" src=${path.image._publishUrl}/>
            </div>
            <div class="teaser-content">
              <h4 id="basic-health-insurance">${path.title}</h4>
              <p>${path.description}</p>
              <p class="button-container">${path.ctaText}</p>
            </div>
       </a>
    `
    block.appendChild(teaser);
    // console.log(teaser)
}