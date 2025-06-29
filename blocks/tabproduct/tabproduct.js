export default function decorate(block) {

    // if (window.location.href.includes("author-p48457-e1275402.adobeaemcloud.com")) return block;
    // const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const bgImg = [];
    const props = [...block.children];

    let itemsDom = props.map((row, ind) => {
        let imgSrc = row?.children[0]?.querySelector("img")?.src;
        bgImg.push({ imgSrc })
        return `
            <div class="bgTab" id="${ind + 1}" ${isMobile ? `style="background-image: url('${row?.children[0]?.querySelector("img")?.src || ''}')"` : ''}>
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
    let bgTabwrapper = document.createElement("div");

    bgTabwrapper.classList.add("bgTabwrapper");
    // !isMobile ? bgTabwrapper.style.backgroundImage = `url('${bgImg[0]?.imgSrc}')` : '';

    bgTabwrapper.innerHTML = `
            <div class="bgTab-container">
                ${itemsDom?.join("") || ''}
            </div>
    `;

    // let dom = `
    //     <div class="bgTabwrapper" ${isMobile ? '' : `style="background-image: url('${bgImg[0]?.imgSrc}')"`}>
    //         <div class="bgTab-container">
    //             ${itemsDom?.join("") || ''}
    //         </div>
    //     </div>
    // `;

    // block.textContent = '';
    block.append(bgTabwrapper);

    // let bgTabwrapper = block.querySelector(".bgTabwrapper");
    const bgTabs = block.querySelectorAll(".bgTab");
    if (!isMobile) {
        bgTabs.forEach(tab => {
            tab.addEventListener("mouseover", (e) => {
                let cureentId = e.currentTarget.id;
                bgTabwrapper.style.backgroundImage = `url('${bgImg[cureentId - 1]?.imgSrc || ''}')`
            })
        });
    }


}