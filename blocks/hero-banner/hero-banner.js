export default function decorate(block) {
    Array.from(block.children).forEach((elem) => {
        elem.classList.add("inner")
        Array.from(elem.children).forEach((elemSub, index) => {
            elemSub.classList.add("innerSub" + (index + 1))
        })
    })
    document.querySelector('.hero-banner-container').previousElementSibling.classList.add('banner-image')  
}
