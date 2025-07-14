import { fetchProdcut, fetchStateCity, getDataMapping } from "../../scripts/common.js";

export default async function decorate(block) {
    let datamapingobj = await getDataMapping();
    let selectedCityState = await fetchStateCity();
    let getProducts = await fetchProdcut()
    let props = Array.from(block.children).map((ele) => ele.children)
    // let Variants = data.products.items[0].configurable_options[1].values;
    let Variants = getProducts.data.products.items[0].variant_to_colors;
    let selectedSku = Variants[0].colors[0].sku;

    let variantsDetails = getProducts.data.products.items[0].variants.filter((ele) => ele[selectedSku])
    // let variantsDetails = data.products.items[0].variants["HSPUNIRSCFIMAG"];

    let activeVarientColor = Variants[0].colors;

    let dataMapping = JSON.parse(sessionStorage.getItem("dataMapping"));
    dataMapping.sku = selectedSku;
    dataMapping.currentlocation = {};
    dataMapping.currentlocation.state = selectedCityState.state;
    dataMapping.currentlocation.city = selectedCityState.city;
    sessionStorage.setItem("dataMapping", JSON.stringify(dataMapping));

    function setVariants() {

    }

    let radioDOM = Variants.map((varient, ind) => {
        return `
             <div class="form-control p-1">
                 <div class="mb-12 body text-uppercase weight-heavy">
                <input class="position-absolute" type="radio" id="1201" name="variants" value="${varient.value_index}">
                <label for="1201" class="d-flex pe-lg-10">
                    <span>${varient.label}</span>
                </label>
        <div class="ps-11 mt-2"><span>${varient.variant_price}</span></div>
    </div>
</div>
        `
    }).join("")

    let variantsDOM = `<div class="variants-wrap">
                            <h4 class="text">Variants</h4>
                       <div class="radio-wrap">
              ${radioDOM}
    </div>
</div>`


    let imageDom = `<div class="hero-360 w-100">
    <div class="hero-360__">
        <i class="hero-icon"></i>
        <i class="hero-icon right"></i>
    </div>
    <div class="hero-360">
        <div class="spritespin-stage">
            <img class="rotate" src="" />
        </div>
    </div>
    <div class="hero-360__"></div>
</div>`


    let swatchColorsDom = activeVarientColor.map((color) => {
        return `
            <div class="product-">
             <h4 class="mb-8 weight">Colours</h4>
            <div class="product-">
                <div class="color-option">
                    <span>${color.label}</span>
                <img class="ms-7 " loading="lazy" src="${color.color_swatch_url}" alt="MATT GREY">
        </div>
    </div>
</div>  
    `
    }).join("")

}
