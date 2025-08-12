
// export default function decorate(block) {
//   // Create the main container
//   const container = document.createElement('div');
//   container.className = 'multicardspecs-container';

//   // Extract header content
//   const headerDiv = block.children[0];
//   if (headerDiv) {
//     const header = document.createElement('div');
//     header.className = 'multicardspecs-header';
//     header.innerHTML = headerDiv.innerHTML;
//     container.appendChild(header);
//     headerDiv.remove();
//   }

//   // Create the grid for cards
//   const grid = document.createElement('div');
//   grid.className = 'multicardspecs-grid';

//   // Process each card item
//   const cardItems = Array.from(block.children);
//   cardItems.forEach((item) => {
//     const card = document.createElement('div');
//     card.className = 'multicardspecs-card';

//     // Extract image
//     const imageDiv = item.children[0];
//     if (imageDiv) {
//       const picture = imageDiv.querySelector('picture');
//       if (picture) {
//         card.appendChild(picture.cloneNode(true));
//       }
//       imageDiv.remove();
//     }

//     // Create card body
//     const body = document.createElement('div');
//     body.className = 'multicardspecs-card-body';

//     // Extract and process rich text content
//     const richTextDiv = item.children[0];
//     if (richTextDiv) {
//       const richTextContent = richTextDiv.innerHTML;

//       // Parse rich text content
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(richTextContent, 'text/html');
//       const elements = doc.body.childNodes;

//       // Process elements
//       let currentSection = null;
//       elements.forEach((element) => {
//         if (element.nodeType === Node.TEXT_NODE && element.textContent.trim()) {
//           // Create a paragraph for text nodes
//           const p = document.createElement('p');
//           p.textContent = element.textContent.trim();
//           body.appendChild(p);
//         } else if (element.nodeType === Node.ELEMENT_NODE) {
//           if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
//             // Create a heading
//             const heading = document.createElement('h3');
//             heading.textContent = element.textContent.trim();
//             body.appendChild(heading);
//           } else if (element.tagName === 'A') {
//             // Create a link
//             const link = document.createElement('a');
//             link.href = element.getAttribute('href') || '#';
//             link.textContent = element.textContent.trim();
//             link.target = element.getAttribute('target') || '_self';

//             // Add arrow icon
//             const arrowIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//             arrowIcon.setAttribute('viewBox', '0 0 24 24');
//             arrowIcon.setAttribute('fill', 'none');
//             arrowIcon.setAttribute('stroke', 'currentColor');
//             arrowIcon.setAttribute('stroke-width', '2');
//             arrowIcon.setAttribute('stroke-linecap', 'round');
//             arrowIcon.setAttribute('stroke-linejoin', 'round');
//             arrowIcon.innerHTML = '<path d="M5 12h14M12 5l7 7-7 7"/>';
//             link.appendChild(arrowIcon);

//             body.appendChild(link);
//           } else if (element.tagName === 'P') {
//             // Create a paragraph
//             const p = document.createElement('p');
//             p.innerHTML = element.innerHTML;
//             body.appendChild(p);
//           } else if (element.tagName === 'UL' || element.tagName === 'OL') {
//             // Create a list
//             const list = document.createElement(element.tagName.toLowerCase());
//             list.innerHTML = element.innerHTML;
//             body.appendChild(list);
//           } else {
//             // Fallback: clone other elements
//             body.appendChild(element.cloneNode(true));
//           }
//         }
//       });

//       richTextDiv.remove();
//     }

//     // Append body to card
//     card.appendChild(body);

//     // Append card to grid
//     grid.appendChild(card);
//   });

//   // Append grid to container
//   container.appendChild(grid);

//   // Replace block content
//   block.innerHTML = '';
//   block.appendChild(container);

//   // Add loaded class for CSS transitions
//   setTimeout(() => {
//     block.classList.add('loaded');
//   }, 100);
// }
  