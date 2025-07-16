import { fetchProduct, useDataMapping } from "../../scripts/common.js";
import {
    div, input, label, h4, span, img, i
} from "../../scripts/dom-helpers.js"; // adjust import path if needed

export default async function decorate(block) {
    const product = await fetchProduct();
    const [dataMapping, setDataMapping] = await useDataMapping();
    const props = Array.from(block.children).map((ele) => ele.children);

    const variants = product.data.products.items[0].variant_to_colors;
    const selectedSku = variants[0].colors[0].sku;

    const variantsDetails = product.data.products.items[0].variants.filter((ele) => ele[selectedSku]);
    const activeVariantColor = variants[0].colors;

    dataMapping.sku = selectedSku;
    sessionStorage.setItem("dataMapping", JSON.stringify(dataMapping));

    const mediaGalleries = product.data.products.items[0].variants.find((media) => media[dataMapping.sku]);


    const variantsDOM = div({ class: "product-overview__variantWrapper d-flex justify-content-lg-center order-2 order-lg-0" },
        div({ class: "variants-wrap" },
            h4({ class: "text" }, "Variants"),
            div({ class: "radio-wrap" }, ...variants.map((variant) => {
                return div({ class: "form-control p-1" },
                    div({ class: "mb-12 body text-uppercase weight-heavy" },
                        input({
                            class: "position-absolute",
                            type: "radio",
                            id: variant.value_index,
                            name: "variants",
                            value: variant.value_index,
                        }),
                        label({ for: variant.value_index, class: "d-flex pe-lg-10" },
                            span(variant.label),
                        ),
                        div({ class: "ps-11 mt-2" },
                            span(variant.variant_price),
                        )
                    )
                );
            }))
        )
    );

    /**
     * 360 View Image DOM
     */
    const imageDom = div({ class: "product-overview__360View m-0 mw-100", style: "height: auto;" },
        div({ class: "hero-360 w-100" },
            div({ class: "hero-360__" },
                i({ class: "hero-icon" }),
                i({ class: "hero-icon right" }),
            ),
            div({ class: "hero-360" },
                div({ class: "spritespin-stage" },
                    img({
                        class: "rotate",
                        src: mediaGalleries[dataMapping.sku].product.media_gallery[0].url
                    })
                )
            ),
            div({ class: "hero-360__" }),
        )
    );

    /**
     * Swatch Colors DOM
     */

    const colors = div({ class: "colors-container" },
        h4({ class: "mb-8 weight" }, "Colours"),
        div({ class: "color-wrapp" },
            ...activeVariantColor.map((color) => {
                return div({ class: "color-option" },
                    span(color.label),
                    img({
                        class: "ms-7",
                        loading: "lazy",
                        src: `https://www.heromotocorp.com${color.color_swatch_url}`,
                        alt: color.label,
                    })
                );
            }))
    );

    /**
     * Final DOM Assembly
     */
    const finalWrapper = div(
        variantsDOM,
        imageDom,
        colors
    );

    block.append(finalWrapper);
}
