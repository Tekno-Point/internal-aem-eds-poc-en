import { autolinkForm } from "../../scripts/scripts.js";

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Add class to each direct child (row) of block
  [...block.children].forEach((row, rowIndex) => {
    row.classList.add(`column-row`);

    // Add class to each col inside the row
    [...row.children].forEach((col, colIndex) => {
      col.classList.add(`column-col-${colIndex + 1}`);

      // Optional: handle image columns like original logic
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
