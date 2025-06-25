export default function decorate(block){
    console.log(block);
    Array.from(block.children).forEach((element,index)=>{
        element.classList.add("bannerCarousel")
        Array.from(element.children).forEach((elem,ind)=>{
            if (ind !== 0) {
                elem.classList.add("subBanner"+(index+1)+"part"+(ind+1))   
            }else{
                elem.classList.add("subBannerpart")
            }
        })
    })
    Array.from(block.querySelectorAll(".subBannerpart ul")).forEach((el,index)=>{
        Array.from(el.children).forEach((elem)=>{
            const divel = document.createElement("div");
            divel.classList.add("roundrestat")
            divel.append(elem)
            block.querySelectorAll(".subBannerpart ul")[index].append(divel)
        })
    })
}