//  Use case of dom-helper.js and ffetch call

import { div, a, p, h2, img } from '../../scripts/dom-helpers.js';
import ffetch from '../../scripts/ffetch.js';

async function fetchEntries() {
  const entries = ffetch('http://localhost:3000/api/test.json').all();
//   const entries = [];

//   for await (const entry of url) {
//     entries.push(entry);
//   }
  return entries;
}

export default async function decorate(block) {
  const entries = await fetchEntries();

  block.firstElementChild.append(
    ...entries.map((item) => {
      return div(
        { class: 'blog-card' },
        div({ class: 'blog-card_img' }, img({ src: '', alt: 'blog-card-image' })),
        div(
          { class: 'blog-card_content' },
          h2({ class: 'blog-content_title', id: 'heading' }, item.state),
          p({ class: 'blog-content_description' }, item.description),
          p(
            { class: 'btn-container' },
            a({ class: 'blog-btn', href: '' }, 'Read More')
          )
        )
      );
    })
  );
}