export default function decorate(block) {
    Array.from(block.children).forEach((row, rowIndex) => {
      row.classList.add("favourite-corner-container");
      row.classList.add(`corner-${rowIndex + 1}`);

      Array.from(row.children).forEach((column, colIndex) => {
        column.classList.add("favourite-corner-container-column");
        column.classList.add(`column-${colIndex + 1}`);
      });
    });
  
    const listBlocks = block.querySelectorAll(".favourite-corner-container-column ul");
    listBlocks.forEach((ul, index) => {
      ul.classList.add(`favourite-corner-container-ul-${index + 1}`);
    });
  }
  