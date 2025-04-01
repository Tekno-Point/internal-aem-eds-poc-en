//  Use case of dom-helper.js

import { div, a, p, h2, img } from '../../scripts/dom-helpers.js';

const items = [
    {
        title: "Maharashtra",
        description: 'dhfrheferfhergfehe'
    },
    {
        title: "Goa",
        description: 'dhfrheferfhergfehe'
    }
]

export default function decorate(block) {
    block.firstElementChild.append(
        ...items.map((item) => {
            console.log(items)
            return div({class: 'blog-card'},
                div({class: 'blog-card_img'}, img({src: '', alt: 'blog-card-image'})),
                div({class: 'blog-card_content'},
                    h2({class: 'blog-content_title', id:'heading'}, item.title),
                    p({class: 'blog-content_description'}, item.description),
                    p({class: 'btn-container'},
                        a({class: 'blog-btn', href: ''}, 'Read More')
                    ),
                ),
            );
        })
    )
}