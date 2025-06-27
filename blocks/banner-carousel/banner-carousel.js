import SwiperBlock from '../swiper/swiper.js'
export default function decorate(block) {
  //   console.log(block);
  //   if (block.closest("[data-id='banner']")) {
  Array.from(block.children).forEach((element, index) => {
    element.classList.add("bannerCarousel")
    Array.from(element.children).forEach((elem, ind) => {
      if (ind !== 0) {
        elem.classList.add("subBanner" + (index + 1) + "part" + (ind + 1))
      } else {
        elem.classList.add("subBannerpart")
      }
    })
  })
  Array.from(block.querySelectorAll(".subBannerpart ul")).forEach((el, index) => {
    Array.from(el.children).forEach((elem) => {
      const divel = document.createElement("div");
      divel.classList.add("roundrestat")
      divel.append(elem)
      block.querySelectorAll(".subBannerpart ul")[index].append(divel)
    })
  })
  Array.from(block.querySelectorAll(".subBannerpart")).forEach((el, index) => {
    const divwrapper = document.createElement('div');
    divwrapper.classList.add("sub-title-text");
    divwrapper.append(Array.from(el.children).at(-2))
    divwrapper.append(Array.from(el.children).at(-1))
    block.querySelectorAll(".subBannerpart")[index].append(divwrapper)
  })
  //   }


  SwiperBlock(block)
  // let arry = ["[data-id='banner']", "[data-id='awardSection']"];
  // arry.forEach((el)=>{
  //   if (!block.closest(el)) {
  //     const swipperAction = document.createElement("div");
  //     swipperAction.classList.add("swipperActionBtn");
  //     swipperAction.append(block.querySelector(".swiper-button-next"));
  //     swipperAction.append(block.querySelector(".swiper-button-prev"));
  //     block.append(swipperAction);
  //   }
  // })
  
}