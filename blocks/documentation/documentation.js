
export default function decorate(block) {

    let textRow = [...block.children].slice(1).map((row, ind) => {
        return row.firstElementChild;
    })

    let imgRow = [...block.children].slice(1).map((row, ind) => {
        return row.lastElementChild;
    })

    let btnDom = textRow.map((row, ind) => {
        return `
                <div class="button-container op-1 btc-${ind + 1}">
        <div class="button">${ind + 1}</div>
        <h2>
            ${row.querySelector("h2").textContent.trim()}
            <span>
                ${row.querySelector("p,a").textContent.trim()}
            </span>
        </h2>
    </div>
        `
    })

    let imgDom = imgRow.map((row, ind) => {
        let imgsrc = row.querySelector("img");
        imgsrc.classList.add("main-gl-img");
        return `
            ${imgsrc.outerHTML}     
        `
    })

    let applyBtn = block.children[0].children[0].querySelector(".button-container a");
    block.children[0].children[0].querySelector(".button-container").remove();
    const heading = block.children[0].children[0];
    block.innerHTML =
        `
        <div id="getFundwrap">
    <div class="getFundwrapper">
        <div class="mask-1" style="width: 0%;"></div>
        <div class="circle"></div>
        <div class="leftBox">
                ${heading.outerHTML}
            <div class="cntnr">
            ${btnDom.join("")}
            </div>
        </div>
        <div class="rightBox position-relative">
            <div class="animation-area">
                ${imgDom.join("")}
            </div>
            <div class="btnBox">
                ${applyBtn.outerHTML}
            </div>
        </div>
    </div>
</div>
    `
    let btns = block.querySelectorAll(".button-container");
    let mainImgs = block.querySelectorAll(".main-gl-img");

    function animateBtnAndImg() {

        btns.forEach((btn, ind) => {
            btn.style.opacity = 0;
            setTimeout(() => { btn.style.opacity = 1 }, ((ind) * 2500))
        });

        mainImgs.forEach((img, ind) => {
            img.style.opacity = 0;
            setTimeout(() => {
                mainImgs.forEach(img => img.style.opacity = 0)
                img.style.opacity = 1;
            }, ((ind) * 2500))
        });

        setTimeout(() => {
            btns.forEach(btn => {
                btn.style.opacity = 0;
            });
        }, 6000);

        setTimeout(() => {
            mainImgs.forEach(img => {
                img.style.opacity = 0;
            });
        }, 6000);
    }

    animateBtnAndImg()
    setInterval(animateBtnAndImg, 7000);
}