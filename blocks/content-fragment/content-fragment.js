export default async function decorate(block) {
    const formHref = block.querySelector('a')?.href;
    const response = await fetch((formHref), {
        method: "GET",
        credentials: "include", // Include credentials such as cookies
    });
    const respData = await response.json();
    console.log("response :: ", respData);
}