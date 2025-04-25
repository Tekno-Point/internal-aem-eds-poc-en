export default function decorate(block) {
    Array.from(block.children).forEach((row, rowIndex) => {
        row.classList.add("breadcrums-container");

        Array.from(row.children).forEach((column, colIndex) => {
            column.classList.add("breadcrums-container-column");
        });
    });

    // Assign dynamic classes to all <ul>
    const allUls = block.querySelectorAll("ul");
    allUls.forEach((ul, index) => {
        ul.classList.add("breadlist" + (index + 1));
    });

    // Targeting the search bar trigger
    const dropdownTrigger = block.querySelector(".breadlist3 > li > p");
    dropdownTrigger.classList.add("dropdw-heading");
    block.querySelector(".breadlist3").style.display = "none";
    block.querySelector(".breadlist3 > li > p").style.display = "none";
    const dropdownMenu = block.querySelector(".breadlist4");

    if (dropdownTrigger && dropdownMenu) {
        // Initially hide the dropdown
        dropdownMenu.style.display = "none";

        // Add search input field
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search city...";
        // searchInput.style.margin = "8px 0";
        // searchInput.style.padding = "4px";
        // searchInput.style.width = "100%";
        // searchInput.style.boxSizing = "border-box";

        // Insert search input before the city list
        dropdownMenu.parentNode.insertBefore(searchInput, dropdownMenu);

        // Toggle dropdown visibility
        const dropdownTriggersec = block.querySelector(".breadlist2 > li > p");
        dropdownTriggersec.classList.add("dw-heading");
        dropdownTriggersec.addEventListener("click", () => {
            const isVisible = dropdownMenu.style.display === "flex";
            block.querySelector(".breadlist3").style.display = isVisible ? "none" : "flex";
            dropdownMenu.style.display = isVisible ? "none" : "flex";
            searchInput.style.display = isVisible ? "none" : "flex";
        });

        // Filter logic for city list
        searchInput.addEventListener("input", () => {
            const filter = searchInput.value.toLowerCase();
            const cities = dropdownMenu.querySelectorAll("li");
            cities.forEach((city) => {
                const text = city.textContent.toLowerCase();
                city.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }
}
  