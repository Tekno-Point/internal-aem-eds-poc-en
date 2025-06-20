export default async function decorate(block) {
    const formHref = new URL(block.querySelector('a')?.href).pathname;
    const url = `/graphql/execute.json/internal-aem-eds-poc/get-article;path=${formHref}`
    const response = await fetch((url), {
        method: "GET",
        credentials: "include", // Include credentials such as cookies
    });
    const respData = await response.json();
    console.log("response :: ", respData);
}