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
    const children = Array.from(block.children);

    children.forEach((child) => {
        if (child.classList.contains('default-content-wrapper')) {
            child.classList.add('accordion-default-content');
        } else if (child.classList.contains('accordion-wrapper')) {
            child.classList.add('accordion-content-wrapper');
        }
    });
}
