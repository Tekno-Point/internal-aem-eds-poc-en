export default function decorate(block) {
    const itemObj = [];
    let itemsDom = [...block.children].map((row, ind) => {
        itemObj.push({ item: row.children });
        return `
            <div class="bgTab">
	            <div class="progresLine">
	            </div>
	            <div id="personalTb">
		            ${row?.children[1]?.textContent?.trim()}
	            </div>
	            <div class="d-none rightArrow mob-show">
		            <img src="${row?.children[0]?.querySelector("img")?.src}">
	            </div>
            </div>
        `
    })
    let div = document.createElement("div")

    div.innerHTML = itemsDom.join("")

    block.innerHTML = '';
    console.log(itemsDom.join(""))
    console.log(block);
    block.append(div)

}