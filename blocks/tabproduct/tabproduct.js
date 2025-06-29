import {isMobile} from '../../scripts/scripts.js'

export default function decorate(block) {

    // if (window.location.href.includes("author-p48457-e1275402.adobeaemcloud.com")) return block;

    const bgImg = [];
    const props = Array.from(block.children);

    // block.innerHTML = '';

    let itemsDom = props.map((row, ind) => {
        let imgSrc = row?.children[0]?.querySelector("img")?.src;
        bgImg.push({ imgSrc })
        return `
            <div class="bgTab" id="${ind + 1}" ${isMobile.matches ? `style="background-image: url('${row?.children[0]?.querySelector("img")?.src || ''}')"` : ''}>
	            <div class="progresLine">
	            </div>
	            <div class="tab">
		            ${row?.children[1]?.textContent?.trim() || ''}
	            </div>
                 <div class="d-none righ    tArrow mob-show">
		            <img src="${row?.children[2]?.querySelector("img")?.src || ''}">
	            </div>
            </div>
        `
    })

    block.innerHTML = `
        <div class="bgTabwrapper" ${isMobile.matches ? '' : `style="background-image: url('${bgImg[0]?.imgSrc}')"`}>
            <div class="bgTab-container">
                ${itemsDom?.join("") || ''}
            </div>
        </div>
    `;

    let bgTabwrapper = block.querySelector(".bgTabwrapper");
    const bgTabs = block.querySelectorAll(".bgTab");
    if (!isMobile.matches) {
        bgTabs.forEach(tab => {
            tab.addEventListener("mouseover", (e) => {
                let cureentId = e.currentTarget.id;
                bgTabwrapper.style.backgroundImage = `url('${bgImg[cureentId - 1]?.imgSrc || ''}')`
            })
        });
    }

}