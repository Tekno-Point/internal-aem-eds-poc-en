// export default function decorate(block) {
//     Array.from(block.children).forEach((row) => {
//         row.classList.add("accordion-sec-container");

//         Array.from(row.children).forEach((column, index) => {
//             column.classList.add("accordion-sec-container-column");
//             column.classList.add(`column-${index + 1}`);
//         });
//     });
// }
export default function decorate(block) {
    const defaultContent = block.querySelector('.accordion-container .default-content-wrapper');
    const accordion = block.querySelector('.accordion-container .accordion-wrapper');
  
    if (defaultContent) {
      defaultContent.classList.add('accordion-default-content');
    }
  
    if (accordion) {
      accordion.classList.add('accordion-content-wrapper');
    }
  }
  