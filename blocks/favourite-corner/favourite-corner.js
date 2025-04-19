export default function decorate(block) {
    Array.from(block.children).forEach((row) => {
        row.classList.add("header-sec-container");

        Array.from(row.children).forEach((column, index) => {
            column.classList.add("header-sec-container-column");
            column.classList.add(`column-${index + 1}`);
        });
    });

    const blockdrop = block.querySelectorAll(".header-sec-container-column ul");
    Array.from(blockdrop).forEach((column, index) => {
        column.classList.add("header-sec-container-ul-" + (index + 1));
    });
}