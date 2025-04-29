export default function decorate(block) {
    Array.from(block.children).forEach((row) => {
        row.classList.add("breadcrums-container");
        Array.from(row.children).forEach((column) => {
            column.classList.add("breadcrums-container-column");
        });
    });

    // Assign dynamic classes to all <ul>
    const allUls = block.querySelectorAll("ul");
    allUls.forEach((ul, index) => {
        ul.classList.add("breadlist" + (index + 1));
    });

    const dropdownTrigger = block.querySelector(".breadlist3 > li > p");
    dropdownTrigger.classList.add("dropdw-heading");
    block.querySelector(".breadlist3").style.display = "none";

    const dropdownMenu = block.querySelector(".breadlist4");

    if (dropdownTrigger && dropdownMenu) {
        dropdownMenu.style.display = "none";

        // Create search input
        const searchInput = document.createElement("input");
        searchInput.classList.add("search-bar");
        searchInput.type = "text";
        searchInput.placeholder = "Search city...";

        // Create wrapper div
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("search-wrapper"); // you can name the class

        // Move dropdownTrigger and searchInput inside wrapper
        const liElement = block.querySelector(".breadlist3 > li");
        liElement.insertBefore(wrapperDiv, dropdownMenu);

        wrapperDiv.appendChild(dropdownTrigger);
        wrapperDiv.appendChild(searchInput);

        const dropdownTriggersec = block.querySelector(".breadlist2 > li > p");
        dropdownTriggersec.classList.add("dw-heading");

        dropdownTriggersec.addEventListener("click", () => {
            const isVisible = dropdownMenu.style.display === "flex";
            block.querySelector(".breadlist3").style.display = isVisible ? "none" : "flex";
            dropdownMenu.style.display = isVisible ? "none" : "flex";
            wrapperDiv.style.display = isVisible ? "none" : "flex";
        });

        searchInput.addEventListener("input", () => {
            const filter = searchInput.value.toLowerCase();
            const cities = dropdownMenu.querySelectorAll("li");
            cities.forEach((city) => {
                const text = city.textContent.toLowerCase();
                city.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }
    
    document.addEventListener("click", (event) => {
        const isClickInside = block.contains(event.target);

        if (!isClickInside) {
            const dropdownMenu = block.querySelector(".breadlist4");
            const breadlist3 = block.querySelector(".breadlist3");
            const wrapperDiv = block.querySelector(".search-wrapper");

            dropdownMenu.style.display = "none";
            breadlist3.style.display = "none";
            if (wrapperDiv) wrapperDiv.style.display = "none";
        }
    });
}
