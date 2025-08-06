
// import { createOptimizedPicture } from '../../scripts/aem.js';

// export default function decorate(block) {
//   // Create the main container
//   const container = document.createElement('div');
//   container.className = 'wrapper-creation-container';

//   // Process each loan product item
//   const itemDivs = Array.from(block.children);
//   itemDivs.forEach(itemDiv => {
//     // Extract fields from the item div
//     const iconElement = itemDiv.children[0]?.querySelector('picture img');
//     const titleElement = itemDiv.children[1]?.querySelector('div');
//     const linkElement = itemDiv.children[2]?.querySelector('a');

//     // Create the loan product wrapper
//     const wrapper = document.createElement('div');
//     wrapper.className = 'teaserv2-wrapper';

//     // Create the loan product block
//     const productBlock = document.createElement('div');
//     productBlock.className = 'teaserv2 block';
//     productBlock.setAttribute('data-block-name', 'teaserv2');
//     productBlock.setAttribute('data-block-status', 'loaded');

//     // Create the anchor tag
//     const anchor = document.createElement('a');
//     anchor.href = linkElement ? linkElement.href : '#';

//     // Create the background image container
//     const bgImage = document.createElement('div');
//     bgImage.className = 'bg-image';

//     // Create the front image container
//     const frontImage = document.createElement('div');
//     frontImage.className = 'front-image';

//     // Create the title container
//     const titleContainer = document.createElement('div');
//     titleContainer.className = 'title';
//     titleContainer.textContent = titleElement ? titleElement.textContent : '';

//     // Create the description container
//     const descriptionContainer = document.createElement('div');
//     descriptionContainer.className = 'description';

//     // Create the button container
//     const buttonContainer = document.createElement('div');
//     buttonContainer.className = 'button-container-text';

//     // Create the RTE text description container
//     const rteTextDescription = document.createElement('div');
//     rteTextDescription.className = 'rte-text-description';

//     // Append elements to the anchor
//     if (iconElement) {
//       const optimizedPicture = createOptimizedPicture(iconElement.src, iconElement.alt, false, [{ width: '2000' }]);
//       frontImage.appendChild(optimizedPicture);
//     }
//     bgImage.appendChild(frontImage);
//     bgImage.appendChild(titleContainer);
//     bgImage.appendChild(descriptionContainer);
//     bgImage.appendChild(buttonContainer);
//     bgImage.appendChild(rteTextDescription);
//     anchor.appendChild(bgImage);

//     // Append anchor to the product block
//     productBlock.appendChild(anchor);

//     // Append product block to the wrapper
//     wrapper.appendChild(productBlock);

//     // Append wrapper to the container
//     container.appendChild(wrapper);
//   });

//   // Replace the block's content
//   block.innerHTML = '';
//   block.appendChild(container);
// }
  