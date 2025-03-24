let pageData = [
  {
    name: "Lithuania | Lietuva",
    url: "page1.html",
    img: "1.jpg"
  },
  {
    name: "Spain | España",
    url: "page2.html",
    img: "2.jpg"
  },
  {
    name: "Middle East",
    url: "page3.html",
    img: "3.jpg"
  },
  {
    name: "Netherlands | Nederland",
    url: "page3.html",
    img: "3.jpg"
  },
  {
    name: "Bosnia and Herzegovina",
    url: "page3.html",
    img: "3.jpg"
  },
  {
    name: "Belgium | België",
    url: "page3.html",
    img: "3.jpg"
  },
  {
    name: "Finland | Suomi",
    url: "page3.html",
    img: "3.jpg"
  },
  {
    name: "India",
    url: "page3.html",
    img: "3.jpg"
  }
];

export default function decorate(block) {
  const a = block;
  console.log(block)
  let dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add("custom-dropdown");

  dropdownContainer.innerHTML = `
     <div class="dropdown-selected">
      <img alt="ab"></img>
      <span>India</span>
    </div>
    <ul class="dropdown-options"></ul>
  `;

  let optionsContainer = dropdownContainer.querySelector(".dropdown-options");

  pageData.forEach(function (page) {
    let optionDiv = document.createElement("li");
    optionDiv.classList.add("dropdown-option");

    optionDiv.innerHTML = `
      <a href=${page.url}>
      <img src="${page.img}" />
      <span>${page.name}</span>
      </a>
    `;
    optionsContainer.appendChild(optionDiv);

    optionDiv.addEventListener("click", function () {
      document.querySelector(".dropdown-selected").innerHTML = `
        <img src="${page.img}" />
        <span>${page.name}</span>
      `;
      optionsContainer.classList.remove("show");
    });
  });

  block.appendChild(dropdownContainer);

  let drpDown = block.querySelector(".dropdown-selected");
  console.log(drpDown);
  drpDown?.addEventListener("click", function () {
    optionsContainer.classList.toggle("show");
  });

}