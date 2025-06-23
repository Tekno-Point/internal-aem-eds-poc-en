export default async function decorate(block) {
    const formHref = new URL(block.querySelector('a')?.href).pathname;
    const configResp = await fetch('/config.json');
    const config = await configResp.json();
    const url = `${config.data[0].value}/graphql/execute.json/internal-aem-eds-poc/get-article;path=${formHref}`
    const response = await fetch((url), {
        method: "GET",
        // credentials: "include", // Include credentials such as cookies
    });
    const respData = await response.json();
    block.innerHTML = JSON.stringify(respData.data.articleByPath.item);
    // respData.data.forEach(data => {
        
    // });
    console.log("response :: ", respData);
}