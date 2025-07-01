export default function decorate(block) {
  console.log("Content: custom-richtext-item", block);

  function setupSection(section) {
    const lilist = section.querySelector("ul");
    if (lilist) {
      const listItems = lilist.querySelectorAll("li");
      listItems.forEach((item, index) => {
        if (index < 15) {
          item.classList.add("content3-div-show");
        } else {
          item.classList.add("content3-div-hide");
        }
      });
    }

    if (!section.querySelector(".view-more-btn")) {
      const button = document.createElement("button");
      button.textContent = "View More";
      button.className = "view-more-btn";
      section.appendChild(button);

      button.addEventListener("click", function () {
        const items = Array.from(section.querySelector("ul").children);

        const isExpanded = button.textContent === "View Less";

        if (isExpanded) {
          items.forEach((item, index) => {
            if (index < 15) {
              item.classList.add("content3-div-show");
              item.classList.remove("content3-div-hide");
            } else {
              item.classList.add("content3-div-hide");
              item.classList.remove("content3-div-show");
            }
          });
          button.textContent = "View More";
        } else {
          // Expand all items
          items.forEach((item) => {
            item.classList.add("content3-div-show");
            item.classList.remove("content3-div-hide");
          });
          button.textContent = "View Less";
        }
      });
    }
  }

  const allSections = document.querySelectorAll(
    ".explormore-flights-container, #section-one, #section-two"
  );

  allSections.forEach((section) => {
    setupSection(section);
  });
}
