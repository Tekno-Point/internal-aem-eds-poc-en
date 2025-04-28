export default function decorate(block) {
    Array.from(block.children).forEach((row, rowIndex) => {
        row.classList.add("find-us-container");
        row.classList.add(`sec-${rowIndex + 1}`);
        Array.from(row.children).forEach((column, colIndex) => {
            column.classList.add("find-us-container-column");
            column.classList.add(`sebtxt-${colIndex + 1}`);
        });
    });

    const listBlocks = block.querySelectorAll(".find-us-container-column ul");
    listBlocks.forEach((ul, index) => {
        ul.classList.add(`find-us-container-ul-${index + 1}`);
    });
}
