let pageData = [
  {
    name: "Lithuania | Lietuva",
    url: "#",
    img: "/content/dam/bridgestone/lithuania.svg"
  },
  {
    name: "Spain | España",
    url: "#",
    img: "/content/dam/bridgestone/spain.svg"
  },
  {
    name: "Middle East",
    url: "#",
    img: "/content/dam/bridgestone/middleeast.png"
  },
  {
    name: "Netherlands | Nederland",
    url: "#",
    img: "/content/dam/bridgestone/netherlands.svg"
  },
  {
    name: "Bosnia and Herzegovina",
    url: "#",
    img: "/content/dam/bridgestone/bosnia.svg"
  },
  {
    name: "Belgium | België",
    url: "#",
    img: "/content/dam/bridgestone/spain.svg"
  },
  {
    name: "Finland | Suomi",
    url: "#",
    img: "/content/dam/bridgestone/netherlands.svg"
  },
  {
    name: "India",
    url: "#",
    img: "/content/dam/bridgestone/bosnia.svg"
  }
];

export default function decorate(block) {
  const a = block;
  console.log(block)
  let dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add("custom-dropdown");

  dropdownContainer.innerHTML = `
     <div class="dropdown-selected">
      <img src="/content/dam/bridgestone/indian-flag.png" alt="ab"></img>
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