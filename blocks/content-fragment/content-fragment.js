import { div } from "../../scripts/dom-helper.js";
import { initSwiperOnly } from '../carousel/carousel.js';

// Ensure Swiper CSS is loaded
(function ensureSwiperCss() {
    if (!document.querySelector('link[href*="swiper-bundle.min.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/blocks/carousel/swiper-bundle.min.css';
        document.head.appendChild(link);
    }
})();

const exclude = ['author-p48457-e1275402.adobeaemcloud.com'];
export default async function decorate(block) {
    if (!block.textContent.trim()) {
        return block;
    }
    const configResp = await fetch('/config.json');
    const config = await configResp.json();
    let origin = config.data[0].value
    if (exclude.includes(window.location.host)) {
        origin = 'https://author-p48457-e1275402.adobeaemcloud.com';
    }

    Array.from(block.children).forEach(async (row, i) => {
        const item = row.querySelector('a');
        const formurl = new URL(item.href)?.pathname.replace('.html', '');
        const url = `${origin}/graphql/execute.json/internal-aem-eds-poc/trending-destination-list;path=${formurl}`
        const response = await fetch((url), {
            method: "GET"
        });
        const respData = await response.json();
        // Render the carousel markup
        const carousel = renderUI(respData?.data?.cfListByPath?.item?.contentFragment);
        // Remove all children before appending carousel
        while (block.firstChild) block.removeChild(block.firstChild);
        block.appendChild(carousel);
        // Only initialize Swiper (do not re-wrap slides)
        initSwiperOnly(carousel);
    });
}

function renderUI(data = []) {
    // DOM structure: title row, filters row, cards row (carousel)
    // Structure: one parent, two children: filters and cards, for easy re-render
    // Add state for budget filter
    let budgetValue = '';
    let filteredData = data;
    // Helper to re-render cards based on budget
    function applyBudgetFilter(val) {
        budgetValue = val;
        if (val && !isNaN(Number(val)) && val !== '') {
            filteredData = data.filter(card => Number(card.price) <= Number(val));
        } else {
            filteredData = data;
        }
        // Replace cards row
        const cardsRow = document.querySelector('.fares-carousel-content .fr-row.fr-mt-3');
        if (cardsRow && cardsRow.parentNode) {
            const newCards = div({ class: 'fr-row fr-mt-3' },
                div({ class: 'fr-col fr-h-100' },
                    div({ class: 'carousel swiper' },
                        div({ class: 'swiper-wrapper' },
                            ...renderCard(filteredData)
                        ),
                        div({ class: 'swiper-button-prev' }),
                        div({ class: 'swiper-button-next' }),
                        div({ class: 'swiper-pagination' })
                    )
                )
            );
            cardsRow.parentNode.replaceChild(newCards, cardsRow);
            // Re-init Swiper
            initSwiperOnly(newCards.querySelector('.carousel.swiper'));
        }
    }

    // Popover for budget input
    function budgetPopover(target) {
        const inputId = `input-${Math.floor(Math.random()*1e10)}`;
        const labelId = `label-budget-${Math.floor(Math.random()*1e10)}`;
        const descId = `${Math.floor(Math.random()*1e10)}`;
        let popover;
        let inputValue = budgetValue;
        // Helper to create a real input element and attach events
        function createInput() {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = inputId;
            input.name = 'budget';
            input.setAttribute('data-testid', 'budget');
            input.placeholder = 'Any budget';
            input.setAttribute('aria-invalid', 'false');
            input.setAttribute('aria-describedby', descId);
            input.className = 'fr-form-control fr-text-truncate fr-pl-2 fr-pb-0 fr-text-text fr--413156497 fr-1905770537 fr-1020490854 fr--1744952970 fr--1367269990 fr--507061050 fr--702426256 fr--98359565';
            input.autocomplete = 'off';
            input.inputMode = 'numeric';
            input.value = inputValue;
            input.oninput = (e) => {
                inputValue = e.target.value;
            };
            // Allow Enter to trigger Done
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onDone();
                }
            });
            setTimeout(() => input.focus(), 0);
            return input;
        }
        function closePopover() {
            if (popover && popover.parentNode) popover.parentNode.removeChild(popover);
            document.removeEventListener('mousedown', handleClickOutside, true);
        }
        function onDone() {
            applyBudgetFilter(inputValue);
            closePopover();
        }
        function onClear() {
            inputValue = '';
            applyBudgetFilter('');
            closePopover();
        }
        function handleClickOutside(e) {
            if (popover && !popover.contains(e.target) && !target.contains(e.target)) {
                closePopover();
            }
        }
        // Use a placeholder div for the input, then replace it with a real input element
        popover = div({ class: 'popover-body', style: 'position:absolute;z-index:1000;top:0;left:0;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.15);padding:16px;border-radius:8px;' },
            div({ class: 'as-copa-ltr-11nnxtd' },
                div({ class: 'as-copa-ltr-p13x9t' },
                    div({
                        class: 'fr-label fr-ml-0 fr-mb-0 fr-pt-0 fr-text-text fr-text-left fr-w-auto fr-d-inline-block fr-166089588',
                        id: labelId,
                        for: inputId
                    }, 'Budget'),
                    div({ class: 'fr-budget fr-border fr-border-borders fr-1559554090 fr--1225033420 fr-1834208085' },
                        div({ class: 'fr-input fr-input-group fr-w-100' },
                            div({ class: 'fr-input-group-prepend' },
                                div({ class: 'fr-label fr-mr-0 fr-ml-2 fr-619365562 fr-pr-1 fr-pl-1 fr-bg-white fr-text-textSoft fr-d-flex fr-align-items-center fr-2077132146 fr--682946256 fr--1291546012' }, 'INR ')
                            ),
                            div({ id: 'budget-input-placeholder' })
                        )
                    ),
                    div({ as: 'p', id: descId, class: 'fr-sr-only', 'aria-hidden': 'true' }, 'Enter the best USD budget')
                ),
                div({ class: 'as-copa-ltr-p13x9t' },
                    div({ as: 'hr', class: 'as-copa-ltr-1v1k9dg' })
                )
            ),
            div({ class: 'as-copa-ltr-ikhtdx' },
                div({
                    as: 'button',
                    disabled: false,
                    class: 'as-copa-ltr-tyl0cm',
                    onclick: onClear
                }, 'Clear'),
                div({
                    as: 'button',
                    class: 'as-copa-ltr-tyl0cm',
                    onclick: onDone
                }, 'Done')
            )
        );
        // Actually insert the real input after rendering
        setTimeout(() => {
            const placeholder = popover.querySelector('#budget-input-placeholder');
            if (placeholder) {
                placeholder.replaceWith(createInput());
            }
        }, 0);
        // Position popover below the target
        setTimeout(() => {
            if (!target || !popover) return;
            const rect = target.getBoundingClientRect();
            popover.style.top = `${rect.bottom + window.scrollY + 4}px`;
            popover.style.left = `${rect.left + window.scrollX}px`;
            popover.style.minWidth = `${rect.width}px`;
        }, 0);
        // Listen for outside clicks
        document.addEventListener('mousedown', handleClickOutside, true);
        return popover;
    }

    // Handler for Price filter click
    function onPriceClick(e) {
        // Remove any existing popover
        const old = document.querySelector('.popover-body');
        if (old && old.parentNode) old.parentNode.removeChild(old);
        // Insert new popover as child of body, positioned below Price filter
        const target = e.currentTarget;
        const pop = budgetPopover(target);
        document.body.appendChild(pop);
    }

    return div({ class: 'fares-carousel-container' },
        div({ class: 'fares-carousel-content' },
            // Filters row
            div({ class: 'fr-secondary-filters fr-d-flex' },
                div({ class: 'fr-d-inline-block' },
                    div({ class: 'filter-group' },
                        div({ class: 'filter-item', onclick: onPriceClick, style: 'cursor:pointer;position:relative;' }, 'Price'),
                        div({ class: 'filter-item' }, 'Date')
                    )
                )
            ),
            // Cards row (carousel)
            div({ class: 'fr-row fr-mt-3' },
                div({ class: 'fr-col fr-h-100' },
                    div({ class: 'carousel swiper' },
                        div({ class: 'swiper-wrapper' },
                            ...renderCard(filteredData)
                        ),
                        div({ class: 'swiper-button-prev' }),
                        div({ class: 'swiper-button-next' }),
                        div({ class: 'swiper-pagination' })
                    )
                )
            )
        )
    );
}

function renderCard(data = []) {
    return data.map(function (eachData, idx) {
        // Data extraction
        const image = eachData.image?._publishUrl || '';
        const departure = eachData.departureCity || '';
        const departureCode = eachData.departureCode || '';
        const destination = eachData.destinationCity || '';
        const destinationCode = eachData.destinationCode || '';
        const departureDate = eachData.departureDate || '';
        const destinationDate = eachData.destinationDate || '';
        const price = eachData.price ? `${eachData.price}` : '';
        const tripType = Array.isArray(eachData.tripType) ? eachData.tripType.join(', ') : '';
        const travelClass = eachData.travelClass || 'Economy';
        const seen = eachData.seen || '';
        // Description is HTML, so we need to inject it safely
        const descHtml = eachData.description?.html || '';
        // IDs for ARIA
        const cardId = `card-${Date.now()}_${Math.floor(Math.random()*1e17)}`;
        const btnId = `cta-btn-${Math.floor(Math.random()*2e9)}`;
        const textId = `cta-text-${Date.now()}_${Math.floor(Math.random()*1e17)}`;
        const priceId = `price-${Math.random().toString(36).substring(2, 18)}`;
        // Card markup as swiper-slide
        return div({
            class: `swiper-slide carousel-item carousel-item-${idx} carousel-item-visible`,
        },
            div({ id: `${idx}`, class: 'item-wrapper', style: 'width: 190.13px; padding: 0px;' },
                div({ class: 'item-col' },
                    div({
                        role: 'button',
                        id: cardId,
                        'aria-hidden': 'false',
                        'data-testid': 'fareItemCard',
                        class: 'fare-card',
                        tabIndex: 0
                    },
                        // Screen reader label
                        div({ class: 'sr-only' }, 'Carousel. Best fares on flights'),
                        // Card count (e.g. 1/12)
                        div({ class: 'card-count', style: 'position: absolute; width: 100%; z-index: 1;' },
                            div({ class: 'card-count-text' }, `${idx + 1}/${data.length}`)
                        ),
                        // Image header
                        div({
                            id: `img-${Date.now()}_${Math.floor(Math.random()*1e17)}`,
                            'data-testid': 'imageHeader',
                            class: 'image-header'
                        },
                            div({
                                'data-src': image,
                                'data-default-image': 'https://assets.airtrfx.com/cdn-cgi/image/height=500,width=800,quality=80,fit=crop,format=auto,opt=true/https://res.cloudinary.com/dakp804eh/image/upload/v1561045947/airmodules/Utils/NoImageFound.png',
                                class: 'image',
                                style: `height: 170px; width: 100%; background-color: unset; animation: unset; background-image: url('${image}'); background-position: center center; background-size: cover; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;`
                            })
                        ),
                        // Card body
                        div({ class: 'card-body' },
                            div({
                                role: 'heading',
                                'aria-label': `${departure} (${departureCode}) to ${destination} (${destinationCode})`,
                                'aria-level': 3,
                                class: 'route-info'
                            },
                                div({ class: 'origin-city' },
                                    div({ class: 'city-name' }, departure),
                                    div({ class: 'city-code' }, `(${departureCode})`)
                                ),
                                div({ class: 'to-label' }, 'to'),
                                div({ class: 'destination-city' },
                                    div({ class: 'city-name' }, destination),
                                    div({ class: 'city-code' }, `(${destinationCode})`)
                                )
                            ),
                            div({ class: 'dates-row' },
                                div({ class: 'departure-info' },
                                    div({ class: 'departure-text' },
                                        div({ as: 'time', dateTime: departureDate },
                                            div({ class: 'date-short', 'aria-hidden': 'true' }, formatDateShort(departureDate)),
                                            div({ class: 'date-long' }, formatDateLong(departureDate))
                                        )
                                    )
                                ),
                                div({ class: 'date-separator' }, '-'),
                                div({ class: 'return-info' },
                                    div({ class: 'return-text' },
                                        div({ as: 'time', dateTime: destinationDate },
                                            div({ class: 'date-short', 'aria-hidden': 'true' }, formatDateShort(destinationDate)),
                                            div({ class: 'date-long' }, formatDateLong(destinationDate))
                                        )
                                    )
                                )
                            )
                        ),
                        // Card footer
                        div({ class: 'card-footer' },
                            div({ id: priceId, class: 'price-row', style: 'line-height: 1;' },
                                div({ class: 'price-label' }, 'From'),
                                div({ class: 'price-currency-row' },
                                    div({ class: 'currency' }, 'INR '),
                                    div({ class: 'price' }, price),
                                    div({ class: 'asterisk', 'aria-hidden': 'true' }, '*'),
                                    div({ class: 'price-note' }, 'Price subject to changes')
                                )
                            ),
                            div({ class: 'seen-row' },
                                div({ class: 'seen-label' }, 'Seen:'),
                                div({ class: 'seen-value' }, seen || 'Recently')
                            ),
                            div({ class: 'trip-row' },
                                div({ class: 'journey-type' },
                                    div({ class: 'journey-type-label' }, tripType || 'Round-trip')
                                ),
                                div({ class: 'trip-separator' }, ','),
                                div({ class: 'travel-class' },
                                    div({ class: 'travel-class-label' }, travelClass)
                                )
                            ),
                            div({ class: 'cta-row' },
                                div({
                                    as: 'button',
                                    class: 'cta-btn',
                                    'aria-labelledby': `${cardId} ${textId}`,
                                    type: 'button',
                                    id: btnId,
                                    'data-testid': 'fareItemCallToAction'
                                },
                                    div({ class: 'cta-btn-text', id: textId }, 'Book now')
                                )
                            )
                        )
                    )
                )
            )
        );
    });
}

// Helper: format date as MM/DD/YYYY
function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}/${d.getFullYear()}`;
}
// Helper: format date as "Month DD, YYYY"
function formatDateLong(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}